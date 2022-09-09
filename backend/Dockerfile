# install os and python
FROM python:3.9.10
# You will have to intall tkinter like this including time zone (this is issue with docker)
RUN apt-get update && apt-get install tk-dev 
# turn off python buffereing so that logs can directly be viewed in terminal
ENV PYTHONUNBUFFERED=1
# create a working directory inside the container
WORKDIR /django-react-auth
# copy requirements file into the working directory as requirements.txt
COPY requirements.txt requirements.txt
# upgrade pip (optional)
RUN pip install --upgrade pip
# install all dependancies
RUN python -m pip install -r requirements.txt
# copy all files from local machine folder to container working directory folder
COPY . .
# run command to start server
CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000" ]
