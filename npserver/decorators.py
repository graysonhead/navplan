from functools import wraps
from npserver import db, models
from npserver.api_exceptions import Unauthorized
from flask import request, g


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


def token_required(func):
    @wraps(func)
    def inner(*args, **kwargs):
        auth_token = request.headers.get('Authorization')
        if auth_token is not None:
            user = models.User.verify_auth_token(auth_token)
            g.user = user
            if g.user:
                return func(*args, **kwargs)
        raise Unauthorized("You need to authenticate to make this request", status_code=401)
    return inner
