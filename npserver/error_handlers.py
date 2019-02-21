from npserver import app
from npserver.api_exceptions import Unauthorized
from flask import jsonify


@app.errorhandler(Unauthorized)
def handle_unauthorized(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
