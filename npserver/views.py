from flask import render_template, request, abort, jsonify
from npserver import app, login_manager, models, db
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


@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')
