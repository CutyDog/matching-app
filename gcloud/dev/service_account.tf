resource "google_service_account" "nextjs" {
  account_id   = "nextjs-dev"
  display_name = "nextjs-dev"
}

resource "google_project_iam_member" "nextjs_storage_bucket_access" {
  project = local.project_id
  role    = "roles/storage.objectAdmin"
  member  = "serviceAccount:${google_service_account.nextjs.email}"
}