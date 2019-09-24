import React from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, {Layer, GeoJSONLayer, Feature} from 'react-mapbox-gl';
import {updateFlightPlanMapData} from "../actions";
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = "pk.eyJ1IjoiZ3JheXNvbmhlYWQiLCJhIjoiY2p1Z2d0YjBoMHA2cDN5cGI4anYyYjN5dSJ9.WOkEIcr-x_6NEiua4U6A-w";
const style = "mapbox://styles/mapbox/streets-v9";


const Map = ReactMapboxGl({
    accessToken
});

const mapStyle = {
    height: '50vh',
    width: '100%'
};

class FlightPlanMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        map_center: [this.props.flightplan.map_center_longitude, this.props.flightplan.map_center_latitude],
        map_zoom: [this.props.flightplan.map_zoom_level]
    };
    }


    render =() => {

        return (
            <Map
                ref={(e) => { this.map = e; }}
                style={style}
                containerStyle={mapStyle}
                center={this.state.map_center}
                zoom={this.state.map_zoom}
                onDragEnd={this.updateMap}
                onZoomEnd={this.updateMap}
            >
                {this.props.children}
            </Map>
        )
    };

    updateMap = () => {
        if (this.props.auth.isSignedIn) {
            const center_object = this.map.state.map.getCenter();
            this.setState(this.state = {
                map_center: [center_object.lng, center_object.lat],
                map_zoom: [this.map.state.map.getZoom()]
                }
            );
            this.props.updateFlightPlanMapData(
                this.props.flightPlan.id,
                this.state.map_center[0],
                this.state.map_center[1],
                this.state.map_zoom[0]
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        flightPlan: state.flightPlans[ownProps.flightplan.id],
        auth: state.auth
    };
};

export default connect(mapStateToProps, {updateFlightPlanMapData})(FlightPlanMap);