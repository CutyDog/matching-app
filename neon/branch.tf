resource "neon_branch" "production" {
  project_id = neon_project.this.id
  name       = "production"
}

resource "neon_branch" "development" {
  project_id = neon_project.this.id
  name       = "development"
  parent_id  = neon_branch.production.id
}