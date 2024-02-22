FROM python:3.11

WORKDIR /app

COPY . .

RUN pip install robotframework

RUN pip install robotframework-seleniumlibrary

RUN pip install robotframework-selenium2library

CMD [ "robot", "./Test_Flexix/valid_login.robot" ]