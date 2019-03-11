import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div class="ui container">
                <p>
                Welcome to NavPlan, a tool for creating shared flight plans in games like Eagle Dynamic's DCS world.
                </p>
                <p>
                Create an account, make a flightplan, and share it with your friends. Any changes you make will be
                automatically updated on their screens, and they can pick their own coordinate format to view the flightplan in.
                </p>
            </div>
        )
    }
}

export default Home;