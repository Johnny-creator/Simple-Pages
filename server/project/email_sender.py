import smtplib
import os
from dotenv import load_dotenv

load_dotenv()

def send_activation_email(username: str, email_address: str, activation_code: str):
    smtpObj = smtplib.SMTP("smtp.gmail.com", 587)    
    smtpObj.ehlo()
    smtpObj.starttls()
    smtpObj.login(os.getenv("EMAIL_USERNAME"), os.getenv("EMAIL_PASSWORD"))
    smtpObj.sendmail("my_email_address@gmail.com", "shelcod@gmail.com", "What's up doc?\nthis is a test<a href='https://www.sheldonc.ca'>Click here!</a>") 

if __name__ == "__main__":
    print("Test")
    send_activation_email("lul", "lul", "lul")