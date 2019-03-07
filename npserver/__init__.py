from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
import flask_restless
import os

basedir = os.path.abspath(os.path.dirname(__file__))

# Initialize flask app
app = Flask(__name__,
            template_folder='./npclient/public',
            static_folder='./npclient/public',
            static_url_path='/static')

db_test = os.environ.get("NP_DATABASE_SQLITE")
db_uri = os.environ.get("NP_DATABASE_URI")
if db_uri:
    if db_test:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db?check_same_thread=False')
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
else:
    raise SyntaxError("You must specify a database URI")

# Setup DB ORM
print("Starting database")
db = SQLAlchemy(app)
db.init_app(app)
db.create_all()

# Set up API
api_manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

from npserver import views, views_api, error_handlers