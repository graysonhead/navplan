import React from 'react';
import { Field, reduxForm } from 'redux-form';


class LoginForm extends React.Component {
    renderError({ error, touched }){
        if (touched && error) {
            return (
                <div className={'ui error message'}>
                    <div className={"header"}>{error}</div>
                </div>
            )
        }
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
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

    renderPasswordInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input type={'password'} {...input}/>
                {this.renderError(meta)}
            </div>
        )
    };

    render () {
        return (
            <form className={"ui form error"} onSubmit={this.props.handleSubmit(this.onSubmit())}>
                <Field name={"email"} component={this.renderInput} label={"Email Address"} />
                <Field name={"password"} component={this.renderPasswordInput} label={"Password"} />
            </form>
        )
    }
}

const validate = (formvalues) => {
    const errors = {};
    if (!formvalues.email) {
        errors.email = "You must enter an email"
    }
    if (!formvalues.password) {
        errors.password = "You must enter a password"
    }
    return errors
};

export default reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);