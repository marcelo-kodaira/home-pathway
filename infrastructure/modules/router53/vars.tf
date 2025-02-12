variable "domain_name" {
  type        = string
  description = "Domain name for the Route 53 record"
}

variable "zone_id" {
  type        = string
  description = "Hosted zone ID in Route 53"
}

variable "cloudfront_domain_name" {
  type        = string
  description = "CloudFront domain name"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
}

variable "team" {
  type        = string
  description = "Team responsible for the Route 53 record"
}

variable "product" {
  type        = string
  description = "Product associated with the Route 53 record"
}

variable "owner" {
  type        = string
  description = "Owner of the Route 53 record"
}
