from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
# from flask_login import LoginManager
import flask_restless
import config


# Initialize flask app
app = Flask(__name__,
            template_folder='./npclient/public',
            static_folder='./npclient/public',
            static_url_path='/static')
app.config.from_object('config')

# Setup DB ORM
db = SQLAlchemy(app)
db.init_app(app)
db.create_all()

# Set up API
api_manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

from npserver import views, views_api, error_handlers