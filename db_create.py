#!venv/bin/python
from migrate.versioning import api
from config import SQLALCHEMY_DATABASE_URI
from config import SQLALCHEMY_MIGRATE_REPO
from npserver import db
import os.path

db_test = os.environ.get("NP_DATABASE_SQLITE")
db_uri = os.environ.get("NP_DATABASE_URI")
if db_uri:
    if db_test:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db?check_same_thread=False')
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

db.create_all()
if not os.path.exists(SQLALCHEMY_MIGRATE_REPO):
	api.create(SQLALCHEMY_MIGRATE_REPO, 'database repository')
	api.version_control(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO)
else:
	api.version_control(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO,
						api.version(SQLALCHEMY_MIGRATE_REPO))