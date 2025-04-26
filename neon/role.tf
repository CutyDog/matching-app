resource "neon_role" "neondb_owner" {
  project_id = neon_project.this.id
  branch_id  = neon_branch.production.id
  name       = "neondb_owner"
}