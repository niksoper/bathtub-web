terraform {
  backend "gcs" {
    bucket = "tf-state-956a51ce-4281-4d7c-be0b-7d0b3d4b1992"
  }
}


provider "google" {
  version = "~> 1.20"
  
  project     = "bathtub"
  region      = "europe-west2"
}

module "website_co_uk" {
  source = "modules/static-site"
  domain = "www.bathtuborchestra.co.uk"
}

module "website_com" {
  source = "modules/static-site"
  domain = "www.bathtuborchestra.com"
}
