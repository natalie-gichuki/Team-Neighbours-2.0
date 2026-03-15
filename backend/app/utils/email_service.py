import os
import threading
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Environment variables
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL")
FRONTEND_URL = os.getenv("FRONTEND_URL")


def send_email(to_email, subject, text_content, html_content=None):
    """Generic SendGrid email sender"""
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=to_email,
        subject=subject,
        plain_text_content=text_content,
        html_content=html_content
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
        print(f"Email successfully sent to {to_email}")
    except Exception as e:
        print("Error sending email:", str(e))


def send_welcome_email(email, name):
    """Prepare and send welcome email"""
    text_body = f"""
Hi {name},

Welcome to Team Neighbours Chama Group!

You can now:
• Track your contributions
• Monitor your fines
• View attendance
• Monitor your loans

Login here:
{FRONTEND_URL}/auth/login

We are glad to have you in the community!

Team Neighbours
"""
    html_body = f"""
<h2>🎉 Welcome to Team Neighbours!</h2>
<p>Hi {name},</p>
<p>Your account was successfully created.</p>
<p>You can now access your account and:</p>
<ul>
<li>Track your contributions</li>
<li>Monitor your fines</li>
<li>View your attendances</li>
<li>Monitor your loans</li>
</ul>
<p>
    <a href="{FRONTEND_URL}/auth/login"
       style="padding:12px 20px;
              background-color:#16a34a;
              color:white;
              text-decoration:none;
              border-radius:5px;
              font-weight:bold;">
       Login to your account
    </a>
</p>
<p>Welcome to the community!</p>
<p>Team Neighbours</p>
"""

    # Send asynchronously using threading
    threading.Thread(target=send_email, args=(email, "Welcome to Team Neighbours 🎉", text_body, html_body)).start()


# ----------------------------
# Example: Call after account creation
# ----------------------------
def create_user_account(user_data):
    new_user = save_to_database(user_data)  # Your user creation function
    if new_user:
        send_welcome_email(new_user.email, new_user.name)
        # User-facing message
        return {
            "success": True,
            "message": f"Account created! A welcome email has been sent to {new_user.email}."
        }
    return {"success": False, "message": "Account creation failed."}