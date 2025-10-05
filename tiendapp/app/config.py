class Config:
    SECRET_KEY = "AyCaramba123"

class DevelopmentConfig():
    DEBUG = True

config = {
    'development': DevelopmentConfig
}
