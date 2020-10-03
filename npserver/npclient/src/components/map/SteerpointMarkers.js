import React from 'react';
import { connect } from 'react-redux';
import { Layer, Feature } from 'react-mapbox-gl';
import { Marker } from 'react-mapbox-gl';

class SteerpointMarkers extends React.Component {

    getAttackMarkers() {
        const steerpoint_list = this.props.flightplan.steerpoints.filter( steerpoint => steerpoint.steerpoint_type === "atk");
        return steerpoint_list.map(steerpoint => {
                    return (
                        <Feature
                            anchor={"center"}
                            key={steerpoint.id}
                            coordinates={[steerpoint.longitude, steerpoint.latitude]}
                        />
                    )
            })
    }

    getSteerpointMarkers() {
        const steerpoint_list = this.props.flightplan.steerpoints.filter( steerpoint => steerpoint.steerpoint_type === "stpt");
        return steerpoint_list.map(steerpoint => {
                    return (
                        <Feature
                            anchor={"center"}
                            key={steerpoint.id}
                            coordinates={[steerpoint.longitude, steerpoint.latitude]}
                        />
                    )
            })}

    getToLndMarkers() {
        const steerpoint_list = this.props.flightplan.steerpoints.filter( steerpoint => steerpoint.steerpoint_type === "departure" || steerpoint.steerpoint_type === "landing" );
        return steerpoint_list.map(steerpoint => {
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
             <>
             <Layer
             id="marker-atkpoints"
             layout={{ 'icon-image': 'star-15'}}
             type="symbol"
             >
                 {this.getAttackMarkers()}
             </Layer>
             <Layer
                id="marker-steerpoints"
                layout={{ 'icon-image': 'triangle-15' }}
                type="symbol"
             >
                {this.getSteerpointMarkers()}
             </Layer>
            <Layer
                id="marker-tolnd"
                layout={{ 'icon-image': 'airport-15' }}
                type="symbol"
             >
                {this.getToLndMarkers()}
             </Layer>
             </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        flightPlan: state.flightPlans[ownProps.flightplan.id]
    }
};

export default connect(mapStateToProps, {})(SteerpointMarkers);