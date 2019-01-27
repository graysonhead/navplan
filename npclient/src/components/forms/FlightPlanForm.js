import React from 'react';
import { Field, reduxForm} from "redux-form";

class FlightPlanForm extends React.Component {

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
        console.log(formValues);
      this.props.onSubmit(formValues);
    };

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input { ...input }/>
                {this.renderError(meta)}
            </div>
        )
    };

    render () {
        return (
            <form className={"ui form error"} onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name={"name"} component={this.renderInput} label={"Enter Name"} />
                <button className={"ui button primary"}>Submit</button>
            </form>
        )
    }
}

const validate = (formvalues) => {
    const errors = {};
    if (!formvalues.name) {
        errors.name = "You must enter a name";
    }
    return errors
};

export default reduxForm({
    form: 'flightplanForm',
    validate
})(FlightPlanForm);