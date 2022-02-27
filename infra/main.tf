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
  
  project = var.project
  location      = var.region
  repository_id = var.artifact_registry_id
  description   = "バックエンド"
  format        = "DOCKER"
}

resource "google_sql_database_instance" "bizpark-db-staging" {
  name             = "bizpark-db-staging"
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

resource "google_sql_database" "bizpark-db-staging" {
  name     = "bizpark-db-staging"
  instance = google_sql_database_instance.bizpark-db-staging.name
}

output "bizpark_stg_db_connection_name" {
  value = google_sql_database_instance.bizpark-db-staging.connection_name
}