variable force_destroy {}
variable name {}

resource "google_storage_bucket" "bizpark-user-upload" {
  name          = var.name
  location      = "ASIA-NORTHEAST1"
  force_destroy = var.force_destroy
}

// オブジェクトをインターネットに公開する。https://zenn.dev/catnose99/articles/18720e3af36d22
resource "google_storage_bucket_iam_binding" "bizpark-user-upload-iam-binding" {
  bucket = google_storage_bucket.bizpark-user-upload.name
  role   = "roles/storage.legacyObjectReader"
  members = [
    "allUsers",
  ]
}

output "bucket_name" {
  value = google_storage_bucket.bizpark-user-upload.name
}