from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_rest_jsonapi import Api
import flask_restless
import config


# Initialize flask app
app = Flask(__name__,
            template_folder='../npclient/public',
            static_folder='../npclient/public',
            static_url_path='/static')
app.config.from_object('config')

# Setup DB ORM
db = SQLAlchemy(app)
db.init_app(app)
with app.test_request_context():
    db.create_all()

# Set up API
# api = Api(app, blueprint=(Blueprint('api', __name__, url_prefix='/api')))
api_manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

from npserver import views, views_api

# api.init_app(app)