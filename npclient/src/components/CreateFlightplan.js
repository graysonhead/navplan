import React from 'react';
import { connect } from 'react-redux';
import {createFlightPlan} from "../actions";
import FlightPlanForm from "./forms/FlightPlanForm";
import history from '../history';

class FlightPlanCreate extends React.Component {
    onSubmit = formValues => {
        this.props.createFlightPlan(formValues, '/flightplans');
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
