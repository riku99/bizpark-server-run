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

resource "google_sql_database_instance" "bizpark-stg-db-sample2" {
  name             = "bizpark-stg-db-sample2"
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

resource "google_sql_database" "bizpark-stg-db-sample2" {
  name     = "bizpark-stg-db-sample2"
  instance = google_sql_database_instance.bizpark-stg-db-sample2.name
}

output "bizpark_stg_db_connection_name" {
  value = google_sql_database_instance.bizpark-stg-db-sample2.connection_name
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
  }
}