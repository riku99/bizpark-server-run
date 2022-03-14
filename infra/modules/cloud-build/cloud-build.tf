variable "region" {}
variable "cloudsql_instance_full_name" {}
variable "registory_name" {}
variable "bucket_name" {}
variable "target_branch" {}

resource "google_cloudbuild_trigger" "deploy-bizpark-server" {
  name        = "deploy-bizpark-server"
  description = "バックエンドアプリケーションをCloud Runへdeployする"

  github {
    owner = "riku99"
    name  = "bizpark-server-run"
    push {
      # branch = "^qa$"
      branch = var.target_branch
    }
  }

  filename = "./cloudbuild.yml"
  substitutions = {
    _REGION                         = var.region
    _CLOUDSQL_INSTANCE_FULL_NAME    = var.cloudsql_instance_full_name
    _ARTIFACT_REPOSITORY_IMAGE_NAME = var.registory_name
    _STORAGE_BUCKET_NAME            = var.bucket_name
  }
}