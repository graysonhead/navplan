import React from 'react';
import { connect } from 'react-redux';
import {createFlightPlan} from "../actions";
import FlightPlanForm from "./forms/FlightPlanForm";

class FlightPlanCreate extends React.Component {
    onSubmit = formValues => {
        this.props.createFlightPlan(formValues);
    };

    render() {
        return (
            <div>
                <h3>Create New Flightplan</h3>
                <FlightPlanForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

export default connect(null, {createFlightPlan})(FlightPlanCreate);
