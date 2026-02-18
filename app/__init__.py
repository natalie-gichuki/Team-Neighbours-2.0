from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from dotenv import load_dotenv
load_dotenv()

from flask_jwt_extended  import JWTManager
from flasgger import Swagger
from app.config import config_by_name

db = SQLAlchemy()
migrate = Migrate()
cors = CORS()
jwt = JWTManager()
swagger = Swagger()

def create_app(config_name = "development"):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    app.config['SWAGGER'] = {
        'title': 'Team Neighbours 22 chama API',
        'uiversion': 3,
        'securityDefinitions': {
            'Bearer': {
                'type': 'apiKey',
                'name': 'Authorization',
                'in': 'header',
                'description': "JWT Authorization header using the Bearer scheme. Example: 'Authorization: Bearer {token}'"
            }
        }
    }

    # initialise SQLAlchemy
    db.init_app(app)
    # initailise Flask-migrate
    migrate.init_app(app, db)
    #initialise CORS
    cors.init_app(app, resources={r"/*": {"origins": [
        "http://127.0.0.1:5173", 
        "http://localhost:5173"
    ]}}, supports_credentials=True)

    jwt.init_app(app)
    swagger.init_app(app)

    from app.models.attendance import Attendance
    from app.models.contribution import Contribution
    from app.models.fines import Fine
    from app.models.loans import Loan
    from app.models.members import Member

    from app.routes import (
        attendance_routes,
        auth_routes,
        fine_routes,
        loan_routes,
        contribution_routes,
        member_routes,
        #payment_routes,
    )

    # REGISTER BLUEPRINTS
    app.register_blueprint(attendance_routes.attendance_bp)
    app.register_blueprint(auth_routes.auth_bp)
    app.register_blueprint(contribution_routes.contribution_bp)
    app.register_blueprint(fine_routes.fine_bp)
    app.register_blueprint(loan_routes.loan_bp)
    app.register_blueprint(member_routes.member_bp)



    return app
