from npserver.models import User, FlightPlan, Coordinate
from npserver import api_manager, models, db
from npserver.decorators import token_required
from flask import request, g, Response
from flask_restless import ProcessingException
from npserver.api_exceptions import ApiError
from npserver.decorators import with_db_session

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


def post_flightplan_preprocessor(data=None, **kwargs):
    user = token_check()
    data.update({"owner_id": user.id})


def list_flightplan_preprocessor(search_params=None, **kwargs):
    user = token_check()
    if 'filters' in search_params:
        if not search_params['filters'][0] == {'name': 'owner_id', 'op': 'eq', 'val': str(user.id)}:
            raise ApiError("You can only list your own flight plans, "
                               "view https://flask-restless.readthedocs.io/en/stable/searchformat.html#quick-examples "
                               "for examples", status_code=403)
    else:
        raise ApiError("You can only list your own flight plans, "
                           "view https://flask-restless.readthedocs.io/en/stable/searchformat.html#quick-examples "
                           "for examples", status_code=403)


def patch_flightplan_preprocessor(instance_id=None, data=None, **kwargs):
    user = token_check()
    flight_plan = db.session.query(models.FlightPlan).filter_by(id=instance_id).first()
    if not flight_plan:
        raise ApiError(f"No flightplan found with id {instance_id}", status_code=404)
    if not flight_plan.owner_id == user.id:
        raise ApiError("You can only edit flight plans you have permission to edit", status_code=403)


def patch_user_preprocessor(instance_id=None, data=None, **kwargs):
    user = token_check()
    if user.id != instance_id:
        raise ApiError("You can only edit your own user", status_code=404)


def post_coordinate_preprocessor(data=None, **kwargs):
    user = token_check()
    fp_id = data['fp_steerpoint_id']
    if not fp_id:
        raise ApiError("You cannot create a coordinate without a fp_steerpoint_id", status_code=400)
    flight_plan = db.session.query(models.FlightPlan).filter_by(id=fp_id).first()
    if user.id != flight_plan.owner_id:
        raise ApiError("You cannot create coordinates that belong to a flightplan you don't have permission to edit",
                       status_code=403)

@with_db_session
def delete_coordinate_preprocessor(session, instance_id=None, **kwargs):
    user = token_check()
    coord_object = session.query(models.Coordinate).filter_by(id=instance_id).first()
    if coord_object.steerpoint_flightplan:
        if not coord_object.steerpoint_flightplan.owner_id == user.id:
                raise ApiError("You cannot delete coordinates that belong to a flightplan you don't have permission to edit",
                               status_code=403)


api_manager.create_api(
    User,
    methods=['GET', 'POST', 'PATCH'],
    url_prefix=V1_PREFIX,
    collection_name='users',
    exclude_columns=['password'],
    preprocessors={
        'PATCH_SINGLE': [patch_user_preprocessor]
    }
)
api_manager.create_api(
    FlightPlan,
    methods=['GET', 'POST', 'PATCH', 'DELETE'],
    url_prefix=V1_PREFIX,
    collection_name='flightplans',
    preprocessors={
        'POST': [post_flightplan_preprocessor],
        'GET_MANY': [list_flightplan_preprocessor],
        'PATCH_SINGLE': [patch_flightplan_preprocessor],
        'DELETE_SINGLE': [patch_flightplan_preprocessor]

    }
)
api_manager.create_api(
    Coordinate,
    methods=['GET', 'POST', 'PATCH', 'DELETE'],
    url_prefix=V1_PREFIX,
    collection_name='coordinates',
    preprocessors={
        'POST': [post_coordinate_preprocessor],
        'DELETE_SINGLE': [delete_coordinate_preprocessor]
    }
)