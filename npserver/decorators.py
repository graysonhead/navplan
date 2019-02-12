from functools import wraps
from npserver import db

def with_db_session(func):
    @wraps(func)
    def inner(*args, **kwargs):
        sesh = db.session()
        try:
            return func(sesh, *args, **kwargs)
        except:
            sesh.rollback()
            raise
        finally:
            sesh.close()
    return inner