from npserver import db
from sqlalchemy import String, Column, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship


class User(db.Model):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    g_auth_id = Column(String)
    flightplans = relationship("FlightPlan", back_populates="owner")


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
