
FROM python:3.11

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

RUN pip list

# Run robot when the container launches
RUN robot ./Test_Flexix/valid_register.robot
RUN robot ./Test_Flexix/valid_login.robot
RUN robot ./Test_Flexix/valid_create.robot
RUN robot ./Test_Flexix/valid_rename.robot
RUN robot ./Test_Flexix/valid_delete.robot

