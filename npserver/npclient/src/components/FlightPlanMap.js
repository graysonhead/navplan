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
    state = {
        map_center: [this.props.flightplan.map_center_longitude, this.props.flightplan.map_center_latitude],
        map_zoom: [this.props.flightplan.map_zoom_level]
    };

    render =() => {

        return (
            <Map
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
        console.log(this.state.map_center);
        console.log(this.state.map_zoom);
        // this.props.updateFlightPlanMapData(
        //     this.props.flightPlan.id,
        //     this.state.map_center[0],
        //     this.state.map_center[1],
        //     this.state.map_zoom[0]
        // );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        flightPlan: state.flightPlans[ownProps.flightplan.id]
    };
};

export default connect(mapStateToProps, {updateFlightPlanMapData})(FlightPlanMap);