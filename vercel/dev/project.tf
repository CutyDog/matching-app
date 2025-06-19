resource "vercel_project" "matching-app-dev" {
  name      = "matching-app-dev"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = "CutyDog/matching-app"
  }
}