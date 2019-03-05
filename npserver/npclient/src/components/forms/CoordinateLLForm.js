import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from "redux-form";
import Coordinates from 'coordinate-parser';



class CoordinateLLForm extends React.Component {
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
        const coord = new Coordinates(formValues.coordinates);
        const coord_dict = { latitude: coord.getLatitude(), longitude: coord.getLongitude()};
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
                <Field name={"coordinates"} component={this.renderInput} label={"Coordinates"}/>
                <button className={"ui button primary"}>Submit</button>
            </form>
        )
    }
}

const isValidPosition = function(position) {
  var error;
  var isValid;
  try {
    isValid = true;
    new Coordinates(position);
    return isValid;
  } catch (error) {
    isValid = false;
    return isValid;
  }
};

const getLatLon = function(position) {
    new Coor
}

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