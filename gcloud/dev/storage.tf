resource "google_storage_bucket" "assets" {
  name          = "cutydog-matching-app-dev-assets"
  location      = "asia-northeast1"
  storage_class = "STANDARD"
}