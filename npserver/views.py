from flask import render_template, request, abort, jsonify, g
from npserver import app, models, db, auth
from npserver.decorators import with_db_session


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
@auth.login_required
def get_resource():
    return jsonify({'data': f'Hello {g.user.callsign}'})

@app.route('/auth/currentuser')
@auth.login_required
def get_current_user():
    return jsonify(g.user.as_dict())

@app.route('/auth/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token()
    return jsonify({'token': token.decode('ascii')})

@auth.verify_password
def verify_password(email_or_token, password):
    user = models.User.verify_auth_token(email_or_token)
    if not user:
        user = db.session.query(models.User).filter_by(email=email_or_token).first()
        if not user or not user.check_password(password):
            return False
    g.user = user
    return True



@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')
