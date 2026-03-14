# create_admins.py
from app import create_app, db
from app.models.members import Member
from werkzeug.security import generate_password_hash

app = create_app()
app.app_context().push()

admins = [
    {"name": "Pricilla Wamuyu", "email": "pricillakagucia@yahoo.com", "phone": "25474654786524","gender": "female", "password": "Wond3r#"},
    {"name": "Jasmine Wanjiru", "email": "jasminengugi@gmail.com", "phone": "25476578435231", "gender": "female", "password": "Wond3r#"},
    
]

for admin in admins:
    new_admin = Member(
        name=admin["name"],
        email=admin["email"],
        phone=admin["phone"],
        gender=admin["gender"],
        password_hash=generate_password_hash(admin["password"]),
        role="admin",
    )
    db.session.add(new_admin)

db.session.commit()
print(f"{len(admins)} admins created successfully!")