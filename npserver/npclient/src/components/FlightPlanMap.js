import React from 'react';
import { connect } from 'react-redux';
import ReactMap, {Layer, GeoJSONLayer, Feature} from 'react-mapbox-gl';
import { Marker } from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';
import Pin from "./map/pin";
import 'mapbox-gl/dist/mapbox-gl.css';
import SteerpointPath from "./map/SteerpointPath";

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







    // getGeoJson() {
    //     let steerpoints = [];
    //     this.props.flightplan.steerpoints.map(steerpoint => {
    //         steerpoints.push([steerpoint.longitude, steerpoint.latitude])
    //     });
    //     console.log(steerpoints);
    //
    //     return {
    //         id: 'routes',
    //         type: 'line',
    //         source: {
    //             type: 'geojson',
    //             data: {
    //                 type: 'Feature',
    //                 properties: {'color': 'blue'},
    //                 geometry: {
    //                     "type": "LineString",
    //                     "coordinates": steerpoints
    //                 }
    //             }
    //         },
    //         paint: {
    //             'line-width': 3,
    //             'line-color': {
    //                 'type': 'identity',
    //                 'property': 'color'
    //             }
    //         }
    //     }
    // }
    //
    // getGeoJSONLayer() {
    //     let steerpoints = [];
    //     this.props.flightplan.steerpoints.map(steerpoint => {
    //         steerpoints.push([steerpoint.longitude, steerpoint.latitude])
    //     });
    //
    //     let linePaint = MapboxGL.LinePaint = {
    //         'line-color': "#ff0000",
    //         'line-opacity': 0.9
    //     };
    //
    //     return (
    //         <Layer key={"lineKey"} type={'line'} paint={linePaint}>
    //             <Feature coordinates={this.getSteerpointCoords()}/>
    //         </Layer>
    //     )
    // }

    render() {
        return (
            <Map
                style={style}
                containerStyle={mapStyle}
            >
                {this.props.children}
            </Map>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

export default connect(mapStateToProps, {})(FlightPlanMap);