import React from 'react';
import { connect } from 'react-redux';
import { fetchFlightPlan } from "../actions";
import SteerpointCard from "./SteerpointCard";
class ShowFlightPlan extends React.Component {
    componentDidMount() {
        this.props.fetchFlightPlan(this.props.match.params.id);
    }

    renderSteerpoints() {
        return this.props.flightPlan.steerpoints.map(steerpoint => {
            return <SteerpointCard key={steerpoint.id} coord_id={steerpoint.id}/>
        })
    };


    render() {
        if (!this.props.flightPlan) {
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
    return { flightPlan: state.flightPlans[ownProps.match.params.id]};
};

export default connect(mapStateToProps, { fetchFlightPlan })(ShowFlightPlan);
