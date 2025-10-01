class Config:
    SECRET_KEY = "clave123"

class DevelopmentConfig():
    DEBUG = True

config = {
    'development': DevelopmentConfig
}