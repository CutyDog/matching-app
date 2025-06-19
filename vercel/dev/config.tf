terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
  }

  backend "s3" {
    bucket = "cutydog-vercel-tfstate"
    key    = "terraform.tfstate"
    region = "ap-northeast-1"
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}