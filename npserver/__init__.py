from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
import flask_restless
import os
from sqlalchemy_utils import database_exists, create_database


basedir = os.path.abspath(os.path.dirname(__file__))

# Initialize flask app
app = Flask(__name__,
            template_folder='./npclient/public',
            static_folder='./npclient/public',
            static_url_path='/static')

app.config["SECRET_KEY"] = 'n23th9sn1nlsd97934v09g'

db_test = os.environ.get("NP_DATABASE_SQLITE")
db_uri = os.environ.get("NP_DATABASE_URI")
if db_test:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db?check_same_thread=False')
elif db_uri and not db_test:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
else:
    raise SyntaxError("You must specify a database URI")

app.config["ADMIN_USER"] = os.environ.get("NP_ADMIN_USER")
app.config["ADMIN_PASS"] = os.environ.get("NP_ADMIN_PASS")

# Setup DB ORM
print("Starting database")
db = SQLAlchemy(app)
db.init_app(app)
if not database_exists(app.config['SQLALCHEMY_DATABASE_URI']):
    print('Database doesn\'t exist, creating it')
    create_database(app.config['SQLALCHEMY_DATABASE_URI'])



# Set up API
api_manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

from npserver import views, views_api, error_handlers