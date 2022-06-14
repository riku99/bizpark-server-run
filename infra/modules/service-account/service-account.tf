variable "project" {}

# 停止させないために定期的にサーバーにヘルスチェック送るスケジューラ用のアカウント
resource "google_service_account" "server_invoker" {
  display_name = "Server Invoker"
  account_id   = "server-invoker"
}

resource "google_project_iam_member" "run_invoker" {
  role = "roles/run.invoker"
  member = "serviceAccount:${google_service_account.server_invoker.email}"
  project = var.project
}

output "server-invoker-email" {
  value = google_service_account.server_invoker.email
}
