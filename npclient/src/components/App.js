import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Menu from './Menu';
import CreateFlightplan from './CreateFlightplan';
import history from '../history';
import ListFlightplans from "./ListFlightplans";
import DeleteFlightPlans from "./DeleteFlightPlan";

const App = () => {
    return (
        <div className={"ui container"}>
            <Router history={history}>
                <div>
                    <Menu />
                    <Switch>
                        <Route path={"/"} exact component={Home} />
                        <Route path={"/flightplans/new"} exact component={CreateFlightplan} />
                        <Route path={"/flightplans"} exact component={ListFlightplans} />
                        <Route path={"/flightplans/delete/:id"} exact component={DeleteFlightPlans} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
};

export default App;