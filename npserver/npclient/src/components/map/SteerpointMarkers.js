import React from 'react';
import { connect } from 'react-redux';
import {Layer} from 'react-mapbox-gl';
import { Marker } from 'react-mapbox-gl';

class SteerpointMarkers extends React.Component {

    getMarkers() {
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
        })}

    render() {
        return (
            <Layer>
                {this.getMarkers()}
            </Layer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        flightPlan: state.flightPlans[ownProps.flightplan.id]
    }
};

export default connect(mapStateToProps, {})(SteerpointMarkers);