import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Button, Form} from 'semantic-ui-react';
import { Field, reduxForm } from "redux-form";
import Coordinates from 'coordinate-parser';
import mgrs from 'mgrs';

import history from "../../history";



class CoordinateLLForm extends React.Component {
    state = {displayMode: "LatLon"};
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className={"ui error message"}>
                    <div className={"header"}>{error}</div>
                </div>
            )
        }
    }

    onSubmit = formValues => {
        let coord_dict = {};
        if (this.state.displayMode === "LatLon") {
            const coord = new Coordinates(formValues.coordinates);
            coord_dict.latitude = coord.getLatitude();
            coord_dict.longitude = coord.getLongitude();
        } else if (this.state.displayMode === "MGRS") {
            const coord = new mgrs.toPoint(formValues.coordinates);
            coord_dict.latitude = coord[0];
            coord_dict.longitude = coord[1];
        }
        coord_dict.name = formValues.name;
        this.props.onSubmit(coord_dict);
    };

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input}/>
                {this.renderError(meta)}
            </div>
        )
    };

    render () {
        return (
            <form className={"ui form error"} onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div>
                    <Field name={"name"} component={this.renderInput} label={"Name"}/>
                    <Button.Group widths={5}>
                        <Button
                            active={this.state.displayMode === "LatLon" ? true : false}
                            onClick={() => {this.setState({displayMode: "LatLon"})}}
                        >
                            LatLon
                        </Button>
                        <Button
                            active={this.state.displayMode === "MGRS" ? true : false}
                            onClick={() => {this.setState({displayMode: "MGRS"})}}
                        >
                            MGRS
                        </Button>
                    </Button.Group>
                </div>
                <Field name={"coordinates"} component={this.renderInput} label={"Coordinates"}/>
                <button className={"ui button primary"}>Submit</button>
            </form>
        )
    }
}

const isValidPosition = function(position) {
  var isValid;
        try {
            isValid = true;
            new Coordinates(position);
            return isValid;
        } catch (error) {
            try {
              isValid = true;
              mgrs.toPoint(position);
              return isValid;
            } catch (error) {
                isValid = false;
                return isValid;
            }
        }
};

const validate = (formvalues) => {
    const errors = {};
    if (!formvalues.coordinates) {
        errors.coordinates = "You must enter coordinates"
    } else if (!isValidPosition(formvalues.coordinates)) {
        errors.coordinates = "Coordinates invalid"
    }
    return errors
};

export default reduxForm({
    form: 'coordinateForm',
    validate
})(CoordinateLLForm);