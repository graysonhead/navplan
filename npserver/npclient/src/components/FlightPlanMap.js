import React from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { GeoJSONLayer } from "react-mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiZ3JheXNvbmhlYWQiLCJhIjoiY2p1Z2d0YjBoMHA2cDN5cGI4anYyYjN5dSJ9.WOkEIcr-x_6NEiua4U6A-w"
});
console.log(Map);
// Map.on('load', function() {
//     Map.loadImage('https://i.imgur.com/MK4NUzI.png', function(error, image) {
//         if (error) throw error;
//         Map.addImage('marker', image);
//     })
// });

class FlightPlanMap extends React.Component {

    getSteerpointLayers() {
        return this.props.flightplan.steerpoints.map(steerpoint => {
            console.log(steerpoint);
            return (
                <Layer
                    type={"symbol"}
                    id={steerpoint.id.toString()}
                    layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={[steerpoint.longitude, steerpoint.latitude]}/>
                </Layer>
            )
        })
    }

    render() {
        return (
            <div>
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: "50vh",
                        width: "100%"
                }}>
                    {this.getSteerpointLayers()}
                </Map>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

export default connect(mapStateToProps, {})(FlightPlanMap);