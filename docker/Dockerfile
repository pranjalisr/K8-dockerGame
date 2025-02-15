# Start with a base Python image
FROM python:3.9-slim-buster

# Set up our work directory in the container
WORKDIR /app

# Copy our requirements first (for better caching)
COPY requirements.txt .

# Install our Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of our application code
COPY . .

# Tell Docker what command to run when our container starts
CMD ["python", "app.py"]

# Friendly explanation:
# This Dockerfile creates a consistent environment for our app.
# It starts with a Python image, installs our dependencies,
# copies our code into the container, and specifies how to run our app.
# This ensures our app runs the same way everywhere!

