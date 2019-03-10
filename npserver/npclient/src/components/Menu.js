import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUser, logInWithCookie } from "../actions";
import Cookies from 'js-cookie';

class Menu extends React.Component {

    componentDidMount() {
        const token = Cookies.get('token');
        if (token) {
            this.props.logInWithCookie(token);
        }
    }

    renderCallsign() {
        if (this.props.auth.isSignedIn) {
            return (
                <div className={"ui item"}>
                    {this.props.auth.user.callsign}
                </div>
            )
        }
    }

    onLogOut() {
        this.props.logOutUser();
    }

    renderLogout() {
        if (this.props.auth.isSignedIn) {
            return (
                <div className={"ui item"}>
                    <Link to={"/"} onClick={this.props.logOutUser}>Logout</Link>
                </div>
            )
        }
    }

    renderLogin() {
        if (!this.props.auth.isSignedIn) {
            return (
                <div className={"ui item"}>
                    <Link to={"/login"}>Login</Link>
                </div>
            )
        }
    }

    renderListFlightplans() {
        if (this.props.auth.isSignedIn) {
            return <Link to={`/flightplans/list/${this.props.auth.user.id}`} className={"item"}>Flightplans</Link>
        }
    }


    render() {
        return (
            <div className={"ui menu"}>
              <div className="header item">
                  <Link to={"/"}>NavPlan.io</Link>
              </div>
              <Link to={"/flightplans/new"} className={"item"}>New Flightplan</Link>
            {this.renderListFlightplans()}
              <div className={"right menu"}>
                  {this.renderCallsign()}
                  {this.renderLogout()}
                  {this.renderLogin()}
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, {logOutUser, logInWithCookie })(Menu);
