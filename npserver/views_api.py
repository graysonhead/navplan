from npserver.models import User, FlightPlan, Coordinate
from npserver import api_manager
V1_PREFIX = '/api/v1'

api_manager.create_api(
    User,
    methods=['GET', 'POST', 'PATCH', 'DELETE'],
    url_prefix=V1_PREFIX,
    collection_name='users'
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

# from npserver import api, models, db
# from flask_rest_jsonapi import ResourceDetail, ResourceList, ResourceRelationship
# from marshmallow_jsonapi.flask import Schema, Relationship
# from marshmallow_jsonapi import fields
#
# class UserSchema(Schema):
#     class Meta:
#         type_ = 'user'
#         self_view = 'api.user_detail'
#         self_view_kwargs = {'id': '<id>'}
#         self_view_many = 'api.user_list'
#
#     id = fields.Integer(as_string=True, dump_only=True)
#     g_auth_id = fields.Str(required=True)
#     flightplans = Relationship(
#         self_view='api.user_flightplans',
#         self_view_kwargs={'id': '<id>'},
#         related_view='api.flightplan_list',
#         related_view_kwargs={'id': '<id>'},
#         many=True,
#         schema='FlightPlanSchema',
#         type_='flightplan',
#         id_field='flightplan_id'
#     )
#
# class FlightPlanSchema(Schema):
#     class Meta:
#         type_= 'flightplan',
#         self_view = 'api.flightplan_detail',
#         self_view_kwargs = {'id': '<id>'},
#         self_view_many = 'api.flightplan_list'
#
#     id = fields.Integer(as_string=True, dump_only=True)
#     owner = Relationship(
#         attribute='owner',
#         self_view='api.flightplan_user',
#         self_view_kwargs={'id': '<id>'},
#         related_view='api.user_detail',
#         related_view_kwargs={'flightplan_id': '<id>'},
#         schema='UserSchema',
#         type_='user'
#     )
#
# # Users
# class UserList(ResourceList):
#     schema = UserSchema
#     data_layer = {
#         'session': db.session,
#         'model': models.User
#     }
#
# class UserDetail(ResourceDetail):
#     schema = UserSchema
#     data_layer = {
#         'session': db.session,
#         'model': models.User
#     }
#
# class UserRelationship(ResourceRelationship):
#     schema = UserSchema,
#     data_layer = {
#         'session': db.session,
#         'model': models.User
#     }
#
# # FlightPlans
#
# class FlightPlanList(ResourceList):
#     schema = FlightPlanSchema,
#     data_layer = {
#         'session': db.session,
#         'model': models.FlightPlan
#     }
#
# class FlightPlanDetail(ResourceDetail):
#     schema = FlightPlanSchema,
#     data_layer = {
#         'session': db.session,
#         'model': models.FlightPlan
#     }
#
# class FlightPlanRelationship(ResourceRelationship):
#     schema = FlightPlanSchema,
#     data_layer = {
#         'session': db.session,
#         'model': models.FlightPlan
#     }
#
#
# api.route(UserList, 'user_list', '/users')
# api.route(UserDetail, 'user_detail', '/users/<int:id>', '/flightplans/<int:flightplan_id>/owner')
# api.route(UserRelationship, 'user_flightplans', '/users/<int:id>/relationships/flightplans')
# api.route(FlightPlanList, 'flightplan_list', '/flightplans', '/users/<int:id>/relationships/flightplans')
# api.route(FlightPlanDetail, 'flightplan_detail', '/flightplans/<int:id>')
# api.route(FlightPlanRelationship, 'flightplan_user', '/flightplans/<int:id>/relationships/owner')
