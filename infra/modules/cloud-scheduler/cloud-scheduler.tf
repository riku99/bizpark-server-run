variable "health-check-endpoint" {}
variable "service-account-email" {}

resource "google_cloud_scheduler_job" "server_health_check_scheduler" {
  name             = "server-health-check-scheduler"
  description      = "サーバーを停止させないために短い間隔で定期的にヘルスチェックを叩くスケジューラ"
  schedule         = "*/1 * * * *" // 1分毎に実行
  time_zone        = "Asia/Tokyo"
  attempt_deadline = "20s"

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = "GET"
    uri         = var.health-check-endpoint

    oidc_token {
      service_account_email = var.service-account-email
    }
  }
}