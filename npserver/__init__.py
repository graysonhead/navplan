from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
import flask_restless
import os
import config
from sqlalchemy_utils import database_exists, create_database


basedir = os.path.abspath(os.path.dirname(__file__))

# Initialize flask app
app = Flask(__name__,
            template_folder='./npclient/public',
            static_folder='./npclient/public',
            static_url_path='/static')

dirname = os.path.dirname(__file__)

app.config["SECRET_KEY"] = config.SECRET_KEY
if os.environ.get('NP_VERSION'):
    version = os.environ.get('NP_VERSION')
else:
    version = "dev"

app.config["VERSION"] = version
print(f"App version: {version}")

db_uri = os.environ.get("SQLALCHEMY_DATABASE_URI")
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

app.config["ADMIN_USER"] = os.environ.get("NP_ADMIN_USER")
app.config["ADMIN_PASS"] = os.environ.get("NP_ADMIN_PASS")

# Setup DB ORM
print("Starting database")
metadata = MetaData()
db = SQLAlchemy(app, metadata=metadata)
db.init_app(app)



# Set up API
api_manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

from npserver import views, views_api, error_handlers