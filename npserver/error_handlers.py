from npserver import app
from npserver.api_exceptions import ApiError
from flask import jsonify


@app.errorhandler(ApiError)
def json_error(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
