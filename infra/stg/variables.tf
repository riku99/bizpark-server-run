variable "project" {}

variable "credentials_file" {}

variable "region" {
  default = "asia-northeast1"
}

variable "zone" {
  default = "asia-northeast1-c"
}

variable "artifact_registry_id" {}

variable "cloudsql_instance_full_name" {} # 後で消す

variable "registory_name" {}

variable "scraping_news_base_endpoint" {}