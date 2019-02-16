from npserver import db, app
from sqlalchemy import String, Column, Integer, ForeignKey, Float, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, \
    BadSignature, \
    SignatureExpired


class User(db.Model):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    g_auth_id = Column(String)
    flightplans = relationship("FlightPlan", back_populates="owner")
    callsign = Column(String(120), unique=True)
    email = Column(String(120), unique=True)
    password = Column(String(120))
    created_date = Column(DateTime, server_default=func.now())

    def __init__(self, callsign=None, password=None, email=None):
        self.callsign = callsign
        self.email = email
        if password:
            self.set_password(password)

    def generate_auth_token(self, expiration=86400):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None
        except BadSignature:
            return None
        user = User.query.get(data['id'])
        return user

    def as_dict(self):
        included_attributes = [
            'callsign',
            'id',
            'email',
            'g_auth_id',
            'created_date'
        ]
        ret_dict = {}
        for key in included_attributes:
            ret_dict.update({key: getattr(self, key)})
        return ret_dict

    # Flask User Properties
    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return self.username

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return '<User: {}>'.format(self.callsign)


class FlightPlan(db.Model):
    __tablename__ = "flightplan"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    owner_id = Column(Integer, ForeignKey('user.id'))
    owner = relationship("User", back_populates="flightplans")
    steerpoints = relationship("Coordinate",
                               back_populates="steerpoint_flightplan",
                               foreign_keys="[Coordinate.fp_steerpoint_id]")
    markpoints = relationship("Coordinate",
                              back_populates="markpoint_flightplan",
                              foreign_keys="[Coordinate.fp_markpoint_id]")


class Coordinate(db.Model):
    __tablename__ = "coordinate"
    id = Column(Integer, primary_key=True)
    order = Column(Integer)
    fp_steerpoint_id = Column(Integer, ForeignKey("flightplan.id"))
    fp_markpoint_id = Column(Integer, ForeignKey("flightplan.id"))
    steerpoint_flightplan = relationship("FlightPlan", foreign_keys=[fp_steerpoint_id])
    markpoint_flightplan = relationship("FlightPlan", foreign_keys=[fp_markpoint_id])
    latitude = Column(Float)
    longitude = Column(Float)
    steerpoint_type = Column(String)
