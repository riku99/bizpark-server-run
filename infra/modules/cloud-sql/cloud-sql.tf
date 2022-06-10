variable region {}
variable tier {}
variable disk_size {}
variable activation_policy {} # ALWAYSだと起動状態、NEVERだと停止

resource "google_sql_database_instance" "bizpark-db-instance" {
  name             = "db"
  database_version = "POSTGRES_14"
  region           = var.region

  # 後で消せるように
  #  deletion_protection = false

  settings {
    tier              = var.tier
    availability_type = "ZONAL"
    disk_size         = var.disk_size
    disk_type         = "PD_SSD"
    activation_policy = var.activation_policy

    ip_configuration {
      ipv4_enabled = "true"
    }
  }
}

resource "google_sql_database" "bizpark-db" {
  name     = "bizpark-db"
  instance = google_sql_database_instance.bizpark-db-instance.name
}

output "bizpark-db-connection-name" {
  value = google_sql_database_instance.bizpark-db-instance.connection_name
}