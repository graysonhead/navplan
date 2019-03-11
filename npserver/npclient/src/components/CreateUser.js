import React from 'react';
import { connect } from 'react-redux';
import CreateUserForm from './forms/CreateUserForm';
import {createUser} from '../actions';
import { Button } from 'semantic-ui-react';

class CreateUser extends React.Component {
    onSubmit = formValues => {
        this.props.createUser(formValues);
    };

    render() {
        return (
            <CreateUserForm onSubmit={this.onSubmit}/>
        )
    }
}

export default connect(null, {createUser})(CreateUser);