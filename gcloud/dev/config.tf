terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.40"
    }
  }

  backend "gcs" {
    bucket = "cutydog-matching-app-dev-tfstate"
    prefix = "terraform/state"
  }
}

locals {
  project_id = "matching-app-dev-463517"
}

provider "google" {
  project = local.project_id
  region  = "asia-northeast1"
}