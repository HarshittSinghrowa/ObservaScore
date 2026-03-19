# Terraform configuration for ObservaScore infrastructure
# Author: Harshitt Singhrowa | Reg: 23FE10CSE00838

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region"   { default = "ap-south-1" }
variable "app_name"     { default = "observascore" }
variable "environment"  { default = "production" }

# VPC
resource "aws_vpc" "observascore_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name    = "${var.app_name}-vpc"
    Project = var.app_name
    Author  = "Harshitt Singhrowa"
    RegNo   = "23FE10CSE00838"
  }
}

# Public subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.observascore_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${var.aws_region}a"
  tags = { Name = "${var.app_name}-public-subnet" }
}

# Security group
resource "aws_security_group" "observascore_sg" {
  name   = "${var.app_name}-sg"
  vpc_id = aws_vpc.observascore_vpc.id

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Frontend"
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Backend API"
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.app_name}-sg" }
}

# EC2 instance
resource "aws_instance" "observascore_server" {
  ami                    = "ami-0f5ee92e2d63afc18"  # Ubuntu 22.04 ap-south-1
  instance_type          = "t3.medium"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.observascore_sg.id]

  user_data = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y docker.io docker-compose
    systemctl start docker
    systemctl enable docker
    cd /opt && git clone https://github.com/harshittsinghrowa/devops-project-observascore.git
    cd devops-project-observascore && docker-compose up -d
  EOF

  tags = {
    Name        = "${var.app_name}-server"
    Environment = var.environment
    Author      = "Harshitt Singhrowa"
    RegNo       = "23FE10CSE00838"
  }
}

output "public_ip" {
  value       = aws_instance.observascore_server.public_ip
  description = "ObservaScore server public IP"
}

output "app_url" {
  value = "http://${aws_instance.observascore_server.public_ip}:3000"
}
