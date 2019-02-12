from npserver.models import User, FlightPlan, Coordinate
from npserver import api_manager
V1_PREFIX = '/api/v1'

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
    collection_name='flightplans'
)
api_manager.create_api(
    Coordinate,
    methods=['GET', 'POST', 'PATCH', 'DELETE'],
    url_prefix=V1_PREFIX,
    collection_name='coordinates'
)