import React from 'react';
import { connect } from 'react-redux';
import ReactMap from 'react-mapbox-gl';
import { Marker } from 'react-mapbox-gl';
import Pin from "./map/pin";
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = "pk.eyJ1IjoiZ3JheXNvbmhlYWQiLCJhIjoiY2p1Z2d0YjBoMHA2cDN5cGI4anYyYjN5dSJ9.WOkEIcr-x_6NEiua4U6A-w";
const style = "mapbox://styles/mapbox/streets-v9";


const Map = ReactMap({
    accessToken
});

const mapStyle = {
    height: '50vh',
    width: '100%'
};

class FlightPlanMap extends React.Component {



    getSteerpointLayers() {
        return this.props.flightplan.steerpoints.map(steerpoint => {
            console.log(steerpoint);
                return (
                    <Marker
                        key={`marker-${steerpoint.id}`}
                        coordinates={[steerpoint.longitude, steerpoint.latitude]}
                        // anchor={"bottom"}
                    >
                        {/*<Pin />*/}
                      <img
                          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
                          width={20}
                          height={20}
                      />
                    </Marker>
                )
        })
    }

    render() {
        return (
            <Map
                style={style}
                containerStyle={mapStyle}
            >
                {this.getSteerpointLayers()}
            </Map>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

export default connect(mapStateToProps, {})(FlightPlanMap);