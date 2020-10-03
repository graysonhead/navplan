import React from 'react';
import { connect } from 'react-redux';
import CoordinateLLForm from './forms/CoordinateLLForm';
import { createSteerpoint, fetchFlightPlan } from "../actions";
import { Button } from 'semantic-ui-react';
import Modal from './Modal';
import history from '../history';
import queryString from 'query-string';

import Coordinates from 'coordinate-parser';

class NewSteerpoint extends React.Component {

    componentDidMount() {
        this.props.fetchFlightPlan(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.createSteerpoint(formValues, this.props.match.params.id, `/app/flightplans/${this.props.match.params.id}`);
    };

    renderForm() {
        return (
            <div>
                <h3>New Coordinate</h3>
                <CoordinateLLForm onSubmit={this.onSubmit}/>
            </div>
        )
    }

    render() {
        return (
            <Modal
                title={"New Coordinate"}
                content={this.renderForm()}
                actions={<Button onClick={() => history.goBack()}>Cancel</Button>}
                onDismiss={() => history.goBack()}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        flightPlan: state.flightPlans[ownProps.id]
    }
};

export default connect(mapStateToProps, {createSteerpoint, fetchFlightPlan})(NewSteerpoint)