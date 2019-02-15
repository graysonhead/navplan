import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './forms/LoginForm';
import { logInUser } from "../actions";
import { Button } from 'semantic-ui-react';


class Login extends React.Component {
    onSubmit = formValues => {
        this.props.logInUser(formValues);
    };

    render() {
        return (
            <LoginForm onSubmit={this.onSubmit}/>
        )
    }
}

export default connect(null, {logInUser})(Login);