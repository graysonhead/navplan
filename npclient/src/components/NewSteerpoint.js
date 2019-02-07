import React from 'react';
import { connect } from 'react-redux';
import CoordinateLLForm from './forms/CoordinateLLForm';
import { createSteerpoint } from "../actions";
import Modal from './Modal';
import history from '../history';
import queryString from 'query-string';

import Coordinates from 'coordinate-parser';

class NewSteerpoint extends React.Component {
    state = {flightplan_id: null};

    onSubmit = formValues => {
        const coord_string = formValues.coordinates;
        this.props.createSteerpoint(coord_string, this.state.flightplan_id, `/flightplans/${this.state.flightplan_id}`);
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const values = queryString.parse(nextProps.location.search);
        if (values.flightplan_id) {
            this.setState({flightplan_id: values.flightplan_id});
        }
    }

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
                onDismiss={() => history.goBack}
            />
        )
    }
}

export default connect(null, {createSteerpoint})(NewSteerpoint)