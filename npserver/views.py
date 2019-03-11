from flask import render_template, request, abort, jsonify, g
from npserver import app, models
from npserver.decorators import with_db_session, token_required, token_or_auth


@app.route('/auth/users/new', methods=['POST'])
@with_db_session
def newuser(session):
    callsign = request.json.get('callsign')
    email = request.json.get('email')
    password = request.json.get('password')
    if callsign is None or email is None or password is None:
        abort(400)
    if session.query(models.User).filter_by(callsign = callsign).first() is not None:
        abort(400)
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

