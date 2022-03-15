variable project {}
variable location {}
variable artifact_registry_id {}


resource "google_artifact_registry_repository" "backend-image" {
  provider = google-beta

  project       = var.project
  location      = var.location
  repository_id = var.artifact_registry_id
  description   = "docker imageレジストリ"
  format        = "DOCKER"
}

output "module_name" {
  value = google_artifact_registry_repository.backend-image
}