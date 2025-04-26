resource "neon_project" "this" {
  name = "matching-app"
}

output "project_id" {
  value = neon_project.this.id
}