import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Menu from './Menu';
import CreateFlightplan from './CreateFlightplan';
import history from '../history';

const App = () => {
    return (
        <div className={"ui container"}>
            <Router history={history}>
                <div>
                    <Menu />
                    <Switch>
                        <Route path={"/"} exact component={Home} />
                        <Route path={"/flightplans/new"} exact component={CreateFlightplan} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
};

export default App;