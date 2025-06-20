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

provider "google" {
  project = "matching-app-dev-463517"
  region  = "asia-northeast1"
}