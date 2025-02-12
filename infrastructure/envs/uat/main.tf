provider "aws" {
  region = "us-east-1"
}

module "s3_bucket" {
  source = "../../modules/s3_bucket"

  cloudfront_origin_access_identity = module.cloudfront.cloudfront_origin_access_identity

  bucket_name = ""
  environment = ""
  team        = ""
  product     = ""
  owner       = ""
}

module "cloudfront" {
  source = "../../modules/cloudfront"

  bucket_name         = ""
  domain_name         = ""
  acm_certificate_arn = ""
  environment         = ""
  team                = ""
  product             = ""
  owner               = ""
}

module "route53_record" {
  source = "../../modules/router53"

  domain_name            = ""
  zone_id                = ""
  cloudfront_domain_name = module.cloudfront.cloudfront_domain_name

  environment = ""
  team        = ""
  product     = ""
  owner       = ""
}
