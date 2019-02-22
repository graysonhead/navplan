from npserver.models import User, FlightPlan, Coordinate
from npserver import api_manager, models, db
from npserver.decorators import token_required
from flask import request, g, Response
from flask_restless import ProcessingException

V1_PREFIX = '/api/v1'


def token_check():
    auth = request.headers.get('Authorization')
    user = None
    if auth:
        user = models.User.verify_auth_token(auth)
        g.user = user
    if not auth or not user:
        raise ProcessingException("Token invalid or expired", code=401)
    return user


def token_optional():
    auth = request.headers.get('Authorization')
    user = None
    if auth:
        user = models.User.verify_auth_token(auth)
        g.user = user
    return user


def get_flightplan_preprocessor(data=None, **kwargs):
    user = token_check()
    data.update({"owner_id": user.id})

def list_flightplan_preprocessor(search_params=None, **kwargs):
    user = token_optional()
    if user:
        search_params.update(dict(name='owner_id', op='eq', val=str(user.id)))


api_manager.create_api(
    User,
    methods=['GET', 'POST', 'PATCH', 'DELETE'],
    url_prefix=V1_PREFIX,
    collection_name='users',
    exclude_columns=['password']
)
api_manager.create_api(
    FlightPlan,
    methods=['GET', 'POST', 'PATCH', 'DELETE'],
    url_prefix=V1_PREFIX,
    collection_name='flightplans',
    preprocessors={
        'POST': [get_flightplan_preprocessor],

    }
)
api_manager.create_api(
    Coordinate,
    methods=['GET', 'POST', 'PATCH', 'DELETE'],
    url_prefix=V1_PREFIX,
    collection_name='coordinates'
)