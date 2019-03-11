from flask import render_template, request, abort, jsonify, g
from npserver import app, models
from npserver.api_exceptions import ApiError
from npserver.decorators import with_db_session, token_required, token_or_auth


@app.route('/api/v1/auth/users/new', methods=['POST'])
@with_db_session
def newuser(session):
    callsign = request.json.get('callsign')
    email = request.json.get('email')
    password = request.json.get('password')
    if callsign is None or email is None or password is None:
        raise ApiError("A problem occured with your request", status_code=400)
    if session.query(models.User).filter_by(email = email).first() is not None:
        raise ApiError("A user with that e-mail already exists", status_code=400)
    user = models.User(callsign=callsign, email=email, password=password)
    session.add(user)
    session.commit()
    return jsonify({'callsign': user.callsign, 'email': user.email}), 201


@app.route('/test')
# @auth.login_required
@token_required
def get_resource():
    return jsonify({'data': f'Hello'})


@app.route('/api/v1/auth/login', methods=['POST'])
@token_or_auth
def login_user():
    return jsonify(g.user.as_dict())


@app.route('/api/v1/auth/token', methods=['POST'])
@token_or_auth
def get_auth_token():
    token = g.user.generate_auth_token()
    return jsonify({'token': token.decode('ascii')})


@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>')
def index(path):
    return render_template('index.html', version=app.config['VERSION'])

