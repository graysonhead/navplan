import React from 'react';
import { connect } from 'react-redux';
import { Layer, Feature } from 'react-mapbox-gl';
import { Marker } from 'react-mapbox-gl';

class SteerpointMarkers extends React.Component {

    getSteerpointMarkers() {

        return this.props.flightplan.steerpoints.map(steerpoint => {
                console.log(steerpoint);
                    return (
                        <Feature
                            anchor={"center"}
                            key={steerpoint.id}
                            coordinates={[steerpoint.longitude, steerpoint.latitude]}
                        />
                    )


            })}

    render() {
         return(
             <Layer
                type="symbol"
                id="marker-steerpoints"
                // layout={{ 'icon-image': 'marker-15' }}
                layout={{ 'icon-image': 'triangle-15' }}
             >
                {this.getSteerpointMarkers()}
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