# Configure the AWS Provider
provider "aws" {
  region = "us-west-2"
}

# Create a VPC for our application
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "Main VPC"
  }
}

# Create an EC2 instance to run our application
resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "App Server"
  }
}

# Friendly explanation:
# This Terraform configuration sets up our cloud infrastructure.
# It creates a Virtual Private Cloud (VPC) to isolate our resources,
# and an EC2 instance to run our application.
# By defining our infrastructure as code, we can easily recreate
# or modify it, ensuring consistency across environments.

