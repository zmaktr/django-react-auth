# install os and python
FROM python:3.9.10

# You will have to install tkinter like this including time zone (this is an issue with Docker)
RUN apt-get update && apt-get install -y tk-dev 

# Turn off Python buffering so that logs can directly be viewed in the terminal
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /django-react-auth

# Copy the entire project into the container
COPY . .

# Upgrade pip (optional)
RUN pip3 install --upgrade pip

# Install all dependencies
RUN pip3 install -r backend/requirements.txt

# Run migrations during the Docker build
RUN python3 backend/manage.py cloud_run_migrate

# Set the command to start the server when the container starts
CMD ["python3", "backend/manage.py", "runserver", "0.0.0.0:8000"]
