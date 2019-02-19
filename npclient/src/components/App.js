import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Menu from './Menu';
import CreateFlightplan from './CreateFlightplan';
import history from '../history';
import ListFlightplans from "./ListFlightplans";
import DeleteFlightPlans from "./DeleteFlightPlan";
import ShowFlightPlan from "./ShowFlightPlan";
import NewSteerpoint from "./NewSteerpoint";
import DeleteCoordinate from "./DeleteCoordinate";
import Login from './Login';
import Flash from './Flash';

const App = () => {
    return (
        <div className={"ui container"}>
            <Router history={history}>
                <div>
                    <Menu />
                    <Flash />
                    <Switch>
                        <Route path={"/"} exact component={Home} />
                        <Route path={"/flightplans/new"} exact component={CreateFlightplan} />
                        <Route path={"/flightplans/:id"} exact component={ShowFlightPlan} />
                        <Route path={"/flightplans"} exact component={ListFlightplans} />
                        <Route path={"/flightplans/delete/:id"} exact component={DeleteFlightPlans} />
                        <Route path={"/flightplans/:id/newsteerpoint"} exact component={NewSteerpoint} />
                        <Route path={"/coordinates/:id/delete"} exact component={DeleteCoordinate} />
                        <Route path={"/login"} exact component component={Login} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
};

export default App;