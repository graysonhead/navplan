from functools import wraps
from npserver import db, models
from npserver.api_exceptions import Unauthorized
from flask import request, g, Response


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


def token_or_auth(func):
    @wraps(func)
    def inner(*args, **kwargs):
        auth = request.headers.get('Authorization')
        data = request.json
        if isinstance(data, dict):
            if data.get('username') and data.get('password'):
                user = db.session.query(models.User).filter_by(email=data.get('username')).first()
                if not user or not user.check_password(data.get('password')):
                    raise Unauthorized("Login information incorrect", status_code=401)
            else:
                raise Unauthorized("You must supply a username and password for login", status_code=401)
        elif auth:
            user = models.User.verify_auth_token(auth)
            if not user:
                raise Unauthorized("Token invalid or expired", status_code=401)
        else:
            raise Unauthorized("You need to supply login credentials or a token to make this request", status_code=401)
        g.user = user
        return func(*args, **kwargs)
    return inner

def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

