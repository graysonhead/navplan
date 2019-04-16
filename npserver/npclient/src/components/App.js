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
import CreateUser from "./CreateUser";
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
                        <Route path={"/app"} exact component={Home} />
                        <Route path={"/app/flightplans/new"} exact component={CreateFlightplan} />
                        <Route path={"/app/flightplans/:id"} exact component={ShowFlightPlan} />
                        <Route path={"/app/flightplans/list/:id"} exact component={ListFlightplans} />
                        <Route path={"/app/flightplans/delete/:id"} exact component={DeleteFlightPlans} />
                        <Route path={"/app/flightplans/:id/newsteerpoint"} exact component={NewSteerpoint} />
                        <Route path={"/app/coordinates/:id/delete"} exact component={DeleteCoordinate} />
                        <Route path={"/app/login"} exact component component={Login} />
                        <Route path={"/app/user/create"} exact component={CreateUser} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
};

export default App;