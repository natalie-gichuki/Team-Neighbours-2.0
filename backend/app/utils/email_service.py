# import os
# from sendgrid import SendGridAPIClient
# from sendgrid.helpers.mail import Mail

# SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
# FROM_EMAIL = os.getenv("FROM_EMAIL")
# FRONTEND_URL = os.getenv("FRONTEND_URL")
# BACKEND_URL = os.getenv("BACKEND_URL")


# def send_email(to_email, subject, text_content, html_content=None):
#     """
#     Generic email sender using SendGrid
#     """

#     message = Mail(
#         from_email=FROM_EMAIL,
#         to_emails=to_email,
#         subject=subject,
#         plain_text_content=text_content,
#         html_content=html_content
#     )

#     try:
#         sg = SendGridAPIClient(SENDGRID_API_KEY)
#         sg.send(message)
#     except Exception as e:
#         print("Email sending error:", str(e))


# # ---------------------------
# # ACCOUNT VERIFICATION EMAIL
# # ---------------------------
# def send_verification_email(email, name, token):

#     verification_link = f"{BACKEND_URL}/verify_email/{token}"

#     text_body = f"""
# Hi {name},

# Welcome to Team Neighbours Chama Group!

# Please verify your account by clicking the link below:

# {verification_link}

# If you did not create this account, please ignore this email.

# Team Neighbours
# """

#     html_body = f"""
#     <h2>Welcome to Team Neighbours 👋</h2>

#     <p>Hi {name},</p>

#     <p>Thank you for registering with <strong>Team Neighbours Chama Group</strong>.</p>

#     <p>Please verify your email by clicking the button below:</p>

#     <p>
#         <a href="{verification_link}" 
#            style="padding:12px 20px;
#                   background-color:#2563eb;
#                   color:white;
#                   text-decoration:none;
#                   border-radius:5px;
#                   font-weight:bold;">
#            Verify Email
#         </a>
#     </p>

#     <p>If you did not create this account, simply ignore this email.</p>

#     <p>Team Neighbours</p>
#     """

#     send_email(
#         email,
#         "Verify your Team Neighbours account",
#         text_body,
#         html_body
#     )


# # ---------------------------
# # WELCOME EMAIL
# # ---------------------------
# def send_welcome_email(email, name):

#     text_body = f"""
# Hi {name},

# Your email has been successfully verified.

# Welcome to Team Neighbours Chama Group!

# You can now:

# • Track your contributions
# • Monitor your fines
# • View attendance
# • Monitor your loans

# Login here:
# {FRONTEND_URL}/auth/login

# We are glad to have you in the community!

# Team Neighbours
# """

#     html_body = f"""
#     <h2>🎉 Welcome to Team Neighbours!</h2>

#     <p>Hi {name},</p>

#     <p>Your email has been successfully verified.</p>

#     <p>You can now access your account and:</p>

#     <ul>
#         <li>Track contributions</li>
#         <li>Monitor fines</li>
#         <li>View attendance</li>
#         <li>Apply for loans</li>
#     </ul>

#     <p>
#         <a href="{FRONTEND_URL}/auth/login"
#            style="padding:12px 20px;
#                   background-color:#16a34a;
#                   color:white;
#                   text-decoration:none;
#                   border-radius:5px;
#                   font-weight:bold;">
#            Login to your account
#         </a>
#     </p>

#     <p>Welcome to the community!</p>

#     <p>Team Neighbours</p>
#     """

#     send_email(
#         email,
#         "Welcome to Team Neighbours 🎉",
#         text_body,
#         html_body
#     )