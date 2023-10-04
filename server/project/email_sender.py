import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

def send_activation_email(username: str, email_address: str, activation_code: str):
    # Create message
    msg = MIMEMultipart('alternative')
    msg["Subject"] = "Account Verification Required - Action Needed"
    msg["From"] = "Simple Page"
    msg['To'] = email_address

    html = f"""<html>
        <head></head>
        <body>
            <p>Hello {username}</p>
            <p>To ensure the security of your Simple Page account, we require you to verify your account by clicking the following link:</p> 
            <a href="http://127.0.0.1:5001/activate?token={activation_code}">CLICK HERE!</a>
            <p>This simple step helps us protect your account and maintain a secure environment. Please click the link at your earliest convenience, as it is time-sensitive.</p>
            <p>If you did not initiate this verification or have concerns, please contact our support team at [Support Email] for assistance.</p>
            <p>Thank you for your cooperation.</p>
        </body>
    </html>"""

    msg.attach(MIMEText(html, "html"))

    # Send email
    smtpObj = smtplib.SMTP("smtp.gmail.com", 587)    
    smtpObj.ehlo()
    smtpObj.starttls()
    smtpObj.login(os.getenv("EMAIL_USERNAME"), os.getenv("EMAIL_PASSWORD"))
    smtpObj.sendmail("my_email_address@gmail.com", email_address, msg.as_string()) 

if __name__ == "__main__":
    print("Test")
    send_activation_email("lul", "shelcod@gmail.com", "lul")