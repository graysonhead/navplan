import React from 'react';
import { connect } from 'react-redux';
import { Layer, Feature } from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';


class SteerpointPath extends React.Component {

    getSteerpointCoords() {
        let steerpoints = [];
        this.props.steerpoints.map(steerpoint => {
            steerpoints.push([steerpoint.longitude, steerpoint.latitude])
        });
        return steerpoints;
    }

    render() {

        let linePaint = MapboxGL.LinePaint = {
            'line-color': "#ff0000",
            'line-opacity': 0.9
        };

        return (
            <Layer key={"lineKey"} type={'line'} paint={linePaint}>
                <Feature coordinates={this.getSteerpointCoords()}/>
            </Layer>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        flightPlan: state.flightPlans[ownProps.flightplan.id]
    }
};

export default connect(mapStateToProps, {})(SteerpointPath);