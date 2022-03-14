terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.11.0"
    }
  }
}

provider "google" {
  credentials = file(var.credentials_file)

  project = var.project
  region  = var.region
  zone    = var.zone
}

locals {
  db_tier              = "db-f1-micro"
  db_disk_size         = "10"
  deploy_target_branch = "^qa$"
}

module "artifact-registry" {
  source               = "../modules/artifact-registry"
  project              = var.project
  location             = var.region
  artifact_registry_id = var.artifact_registry_id
}

# resource "google_artifact_registry_repository" "bizpark-stg-backend-app" {
#   provider = google-beta

#   project       = var.project
#   location      = var.region
#   repository_id = var.artifact_registry_id
#   description   = "バックエンド"
#   format        = "DOCKER"
# }

module "cloud-sql" {
  source    = "../modules/cloud-sql"
  region    = var.region
  tier      = local.db_tier
  disk_size = local.db_disk_size
}

# 後で消す
resource "google_sql_database_instance" "bizpark-stg-db-sample3" {
  name             = "bizpark-stg-db-sample3"
  database_version = "POSTGRES_14"
  region           = var.region

  # 後で消せるように
  deletion_protection = false


  settings {
    tier              = "db-f1-micro"
    availability_type = "ZONAL"
    disk_size         = "10"
    disk_type         = "PD_SSD"

    ip_configuration {
      ipv4_enabled = "true"
    }
  }
}

# 後で消す
resource "google_sql_database" "bizpark-stg-db-sample3" {
  name     = "bizpark-stg-db-sample3"
  instance = google_sql_database_instance.bizpark-stg-db-sample3.name
}

# 後で消す
output "bizpark_stg_db_connection_name" {
  value = google_sql_database_instance.bizpark-stg-db-sample3.connection_name
}

module "cloud-storage" {
  source = "../modules/cloud-storage"
}

output "user_upload_storage_bucket_name" {
  value = module.cloud-storage.bucket_name
}

# 後で消す
resource "google_storage_bucket" "bizpark-stg-user-upload" {
  name          = "bizpzrk-stg-user-upload"
  location      = "ASIA-NORTHEAST1"
  force_destroy = true # 本番はfalseの方がいいかも
}

# 後で消す
// オブジェクトをインターネットに公開する。https://zenn.dev/catnose99/articles/18720e3af36d22
resource "google_storage_bucket_iam_binding" "bizpark-stg-user-upload_iam_binding" {
  bucket = google_storage_bucket.bizpark-stg-user-upload.name
  role   = "roles/storage.legacyObjectReader"
  members = [
    "allUsers",
  ]
}

module "cloud-build" {
  source                      = "../modules/cloud-build"
  region                      = var.region
  cloudsql_instance_full_name = module.cloud-sql.bizpark-db-connection-name
  registory_name              = var.registory_name # localにできそう(?)
  bucket_name                 = module.cloud-storage.bucket_name
  target_branch               = local.deploy_target_branch
}

# 後で消す
resource "google_cloudbuild_trigger" "deploy-bizpark-stg" {
  name        = "deploy-bizpark-stg"
  description = "バックエンドアプリケーションをCloud Runへdeployする"

  github {
    owner = "riku99"
    name  = "bizpark-server-run"
    push {
      branch = "^qa$"
    }
  }

  filename = "./cloudbuild.yml"
  substitutions = {
    _REGION                         = var.region
    _CLOUDSQL_INSTANCE_FULL_NAME    = var.cloudsql_instance_full_name
    _ARTIFACT_REPOSITORY_IMAGE_NAME = var.registory_name
    _STORAGE_BUCKET_NAME            = google_storage_bucket.bizpark-stg-user-upload.name
  }
}

module "service-account" {
  source = "../modules/service-account"
}

# スクレイピング用スケジューラ
resource "google_cloud_scheduler_job" "scraping_jiji_scheduler" {
  name             = "scraping-jiji-scheduler"
  description      = "時事通信社のスクレイピング"
  schedule         = "*/10 * * * *"
  time_zone        = "Asia/Tokyo"
  attempt_deadline = "360s"
  project          = var.project
  region           = var.region

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = "GET"
    uri         = "${var.scraping_news_base_endpoint}/jiji"

    oidc_token {
      service_account_email = module.service-account.scraping-scheduler-invoker-email
    }
  }
}

resource "google_cloud_scheduler_job" "scraping_mainichi_scheduler" {
  name             = "scraping-mainichi-scheduler"
  description      = "毎日新聞のスクレイピング"
  schedule         = "*/10 * * * *"
  time_zone        = "Asia/Tokyo"
  attempt_deadline = "360s"
  project          = var.project
  region           = var.region

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = "GET"
    uri         = "${var.scraping_news_base_endpoint}/mainichi"

    oidc_token {
      service_account_email = module.service-account.scraping-scheduler-invoker-email
    }
  }
}

