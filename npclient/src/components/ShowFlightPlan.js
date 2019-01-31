import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchFlightPlan, fetchCoordsFromFlightPlan } from "../actions";
import SteerpointCard from "./SteerpointCard";
class ShowFlightPlan extends React.Component {
    componentDidMount() {
        this.props.fetchFlightPlan(this.props.match.params.id);
        this.props.fetchCoordsFromFlightPlan(this.props.match.params.id);
    }

    renderSteerpoints() {
        const steerpoint_array = _.values(this.props.coordinates).filter(item => item.fp_steerpoint_id == this.props.match.params.id);
        const sorted_steerpoints = _.orderBy(steerpoint_array, 'order', 'asc');
        return sorted_steerpoints.map(steerpoint => {
            var first_steerpoint, last_steerpoint
            if (steerpoint.order === 0) {
                first_steerpoint = true;
            } else {
                first_steerpoint = false;
            }
            if (steerpoint.order === sorted_steerpoints.length - 1) {
                last_steerpoint = true;
            } else {
                last_steerpoint = false;
            }
            return <SteerpointCard
                steerpoint_array={sorted_steerpoints}
                key={steerpoint.id}
                coord_id={steerpoint.id}
                first={first_steerpoint}
                last={last_steerpoint}
            />
        })
    };


    render() {
        if (!this.props.flightPlan || !this.props.coordinates) {
            return (
                <div className={"ui active dimmer"}>
                    <div className={"ui loader"}>Loading FlightPlan</div>
                </div>
            )
        }
        return (
            <div>
                <h3>{`FlightPlan: ${this.props.flightPlan.name}`}</h3>
                <div className={"ui celled list"}>
                    {this.renderSteerpoints()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        flightPlan: state.flightPlans[ownProps.match.params.id],
        coordinates: state.coordinates
    };
};

export default connect(mapStateToProps, { fetchFlightPlan, fetchCoordsFromFlightPlan })(ShowFlightPlan);
