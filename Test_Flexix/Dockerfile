FROM python:3.11.0-alpine

WORKDIR /app

COPY . .

RUN pip install robotframework

RUN pip install robotframework-seleniumlibrary

RUN pip install robotframework-selenium2library

CMD ["C:\Users\mon\AppData\Local\Programs\Python\Python311\Scripts", "robot", "./Test_Flexix/valid_login.robot"]