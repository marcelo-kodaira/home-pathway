variable "bucket_name" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "acm_certificate_arn" {
  type = string
}

variable "environment" {
  type = string
}

variable "team" {
  type = string
}

variable "product" {
  type = string
}

variable "owner" {
  type = string
}
