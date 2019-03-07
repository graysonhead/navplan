import os

basedir = os.path.abspath(os.path.dirname(__file__))

CSRF_ENABLED = True
SECRET_KEY = 'yasdJ3ntg290DSFnekf'
SQLITE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db?check_same_thread=False')
if not os.environ.get("NP_DATABASE_URI"):
    print("No database env detected, using sqlite database")
else:
    print(f"Using database {os.environ.get('NP_DATABASE_URI')}")
SQLALCHEMY_DATABASE_URI = os.environ.get("NP_DATABASE_URI", SQLITE_URI)
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')