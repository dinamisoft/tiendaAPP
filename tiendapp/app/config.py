class Config:
    SECRET_KEY = "Aycaramba123"

class DevelopmentConfig():
    DEBUG = True

config = {
    'development': DevelopmentConfig
}