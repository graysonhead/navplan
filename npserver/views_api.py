from npserver.models import User, FlightPlan, Coordinate
from npserver import api_manager, models, db
from npserver.decorators import token_required
from flask import request, g, Response
from flask_restless import ProcessingException

V1_PREFIX = '/api/v1'


def token_check(data=None, **kwargs):
    auth = request.headers.get('Authorization')
    if auth:
        user = models.User.verify_auth_token(auth)
        if not user:
            raise ProcessingException("Token invalid or expired", code=401)
        g.user = user


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
        'POST': [token_check]
    }
)
api_manager.create_api(
    Coordinate,
    methods=['GET', 'POST', 'PATCH', 'DELETE'],
    url_prefix=V1_PREFIX,
    collection_name='coordinates'
)