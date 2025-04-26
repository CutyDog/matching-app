resource "neon_database" "neondb" {
  project_id = neon_project.this.id
  branch_id  = neon_branch.production.id
  name       = "neondb"
  owner_name = neon_role.neondb_owner.name
}

output "database_id" {
  value = neon_database.neondb.id
}