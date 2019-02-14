import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './forms/LoginForm';
import { Button } from 'semantic-ui-react';


class Login extends React.Component {
    onSubmit = formValues => {
        console.log(formValues);
    };

    render() {
        return (
            <LoginForm onSubmit={this.onSubmit}/>
        )
    }
}


export default connect(null, {})(Login);