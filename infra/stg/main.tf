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

module "cloud-sql" {
  source    = "../modules/cloud-sql"
  region    = var.region
  tier      = local.db_tier
  disk_size = local.db_disk_size
  activation_policy = "ALWAYS"
}

module "cloud-storage" {
  source = "../modules/cloud-storage"
  force_destroy = true
  name = "bizpark-user-upload-stg"
}

output "user_upload_storage_bucket_name" {
  value = module.cloud-storage.bucket_name
}

module "cloud-build" {
  source                      = "../modules/cloud-build"
  region                      = var.region
  cloudsql_instance_full_name = module.cloud-sql.bizpark-db-connection-name
  registory_name              = var.registory_name # localにできそう(?)
  bucket_name                 = module.cloud-storage.bucket_name
  target_branch               = local.deploy_target_branch
  app_bundle_id               = var.app_bundle_id
}

module "service-account" {
  source  = "../modules/service-account"
  project = var.project
}

module "cloud-scheduler" {
  source                = "../modules/cloud-scheduler"
  health-check-endpoint     = var.health_check_endpoint
  service-account-email = module.service-account.server-invoker-email
}