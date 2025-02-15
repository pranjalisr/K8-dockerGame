#!/bin/bash

# Welcome message
echo "🚀 Welcome to the DevOps project setup!"

# Check if Python is installed
if ! command -v python &> /dev/null
then
    echo "Python is not installed. Please install Python and try again."
    exit 1
fi

# Create a virtual environment
echo "📦 Creating a virtual environment..."
python -m venv venv

# Activate the virtual environment
echo "🔧 Activating the virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Set up pre-commit hooks
echo "🔨 Setting up pre-commit hooks..."
pre-commit install

echo "✨ Setup complete! Happy coding!"

# Friendly explanation:
# This script sets up your local development environment.
# It creates a virtual environment, installs dependencies,
# and sets up pre-commit hooks to help catch issues early.
# Running this script will get you ready to start coding in no time!

