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

resource "google_artifact_registry_repository" "bizpark-stg-backend-app" {
  provider = google-beta

  project       = var.project
  location      = var.region
  repository_id = var.artifact_registry_id
  description   = "バックエンド"
  format        = "DOCKER"
}

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

resource "google_sql_database" "bizpark-stg-db-sample3" {
  name     = "bizpark-stg-db-sample3"
  instance = google_sql_database_instance.bizpark-stg-db-sample3.name
}

output "bizpark_stg_db_connection_name" {
  value = google_sql_database_instance.bizpark-stg-db-sample3.connection_name
}

resource "google_storage_bucket" "bizpark-stg-user-upload" {
  name          = "bizpzrk-stg-user-upload"
  location      = "ASIA-NORTHEAST1"
  force_destroy = true # 本番はfalseの方がいいかも
}

// オブジェクトをインターネットに公開する。https://zenn.dev/catnose99/articles/18720e3af36d22
resource "google_storage_bucket_iam_binding" "bizpark-stg-user-upload_iam_binding" {
  bucket = google_storage_bucket.bizpark-stg-user-upload.name
  role   = "roles/storage.legacyObjectReader"
  members = [
    "allUsers",
  ]
}

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

resource "google_service_account" "bizpark-stg-scheduler-test6" {
  display_name = "Schedler Test"
  account_id   = "bizpark-stg-scheduler-test6"
}

resource "google_cloud_scheduler_job" "health_sample" {
  name             = "health_sample"
  description      = "test job"
  schedule         = "30 4 * * *"
  time_zone        = "Asia/Tokyo"
  attempt_deadline = "360s"
  project          = var.project
  region           = var.region

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = "GET"
    uri         = "https://bizpark-stg-server-p5rqqwxefa-an.a.run.app/health"

    oidc_token {
      service_account_email = google_service_account.bizpark-stg-scheduler-test6.email
    }
  }
}

# スクレイピング用スケジューラのためのサービスアカウント
resource "google_service_account" "scraping_scheduler_invoker" {
  display_name = "Schedler Invoker"
  account_id   = "scraping_scheduler_invoker"
}

# スクレイピング用スケジューラ
resource "google_cloud_scheduler_job" "health_sample" {
  name             = "scraping_scheduler"
  description      = "ニュースサイトのスクレイピング"
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
    uri         = "https://bizpark-stg-server-p5rqqwxefa-an.a.run.app/scraping/news"

    oidc_token {
      service_account_email = google_service_account.scraping_scheduler_invoker.email
    }
  }
}
