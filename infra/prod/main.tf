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
  db_tier              = "db-lightweight-1"
  db_disk_size         = "10"
}

module "cloud-sql" {
  source    = "../modules/cloud-sql"
  region    = var.region
  tier      = local.db_tier
  disk_size = local.db_disk_size
}