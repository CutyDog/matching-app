resource "google_storage_bucket" "assets" {
  name          = "cutydog-matching-app-dev-assets"
  location      = "asia-northeast1"
  storage_class = "STANDARD"

  cors {
    origin          = ["*"]
    method          = ["GET"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}