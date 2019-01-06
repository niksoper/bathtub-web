resource "google_storage_bucket" "web_content" {
  name     = "${var.domain}"
  location = "europe-west2"

  website {
    main_page_suffix = "index.html"
  }
}

resource "google_storage_bucket_acl" "web_content_acl" {
  bucket = "${google_storage_bucket.web_content.name}"

  default_acl = "publicRead"
}
