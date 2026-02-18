import os

class Config:
    # General configuration
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback_jwt_secret_key")

class Development(Config):
    DEBUG: True
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://natto:Natali32007.@localhost:5432/teamNeighbours2"
    )

class Testing(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://natto:Natali32007.@localhost:5432/teamNeighbours2"
    )
    PRESERVE_CONTEXT_ON_EXCEPTION = False

class Production(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://natto:Natali32007.@localhost:5432/teamNeighbours2"
    )


config_by_name = {
    "development": Development,
    "testing": Testing,
    "production": Production
}

