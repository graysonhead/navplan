import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchFlightPlan, fetchDelCoordsFromFlightPlan } from "../actions";
import { Button, Icon, Divider } from 'semantic-ui-react';
import SteerpointCard from "./SteerpointCard";
import FlightPlanMap from "./FlightPlanMap";
import history from '../history';
import queryString from 'query-string';
import SteerpointPath from "./map/SteerpointPath";
import SteerpointMarkers from "./map/SteerpointMarkers";

class ShowFlightPlan extends React.Component {
    state = {
        displayMode: "LatLon Degrees"
    };
    componentDidMount() {
        this.props.fetchFlightPlan(this.props.match.params.id);
        this.fetchData();
        this.timer = setInterval(() => this.fetchData(), 5000)
    }

    fetchData() {
        this.props.fetchFlightPlan(this.props.match.params.id);
        this.props.fetchDelCoordsFromFlightPlan(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        const values = queryString.parse(nextProps.location.search);
        if (values.displayMode) {
            this.setState({displayMode: values.displayMode});
        } else {
            this.setState({displayMode: 'LatLonDegrees'});
        }
    }

    renderCreateSteerpointButton() {
        if (this.props.auth.isSignedIn) {
            if (this.props.auth.user.id === this.props.flightPlan.owner_id) {
                return (
                    <Button primary
                        onClick={() => history.push({
                                pathname: `/app/flightplans/${this.props.flightPlan.id}/newsteerpoint`
                            })}
                        >
                            <Icon name={'plus square'}/>Create Steerpoint
                    </Button>
                )
            }
        }

    }

    sortSteerpoints() {
        const steerpoint_array = _.values(this.props.coordinates).filter(item => item.fp_steerpoint_id == this.props.match.params.id);
        const sorted_steerpoints = _.orderBy(steerpoint_array, 'order', 'asc');
        return sorted_steerpoints
    }

    renderSteerpoints() {
        const sorted_steerpoints = this.sortSteerpoints();
        return sorted_steerpoints.map(steerpoint => {
            var first_steerpoint, last_steerpoint
            if (steerpoint.order === 0) {
                first_steerpoint = true;
            } else {
                first_steerpoint = false;
            }
            if (steerpoint.order === sorted_steerpoints.length - 1) {
                last_steerpoint = true;
            } else {
                last_steerpoint = false;
            }
            return <SteerpointCard
                displayMode={this.state.displayMode}
                steerpoint_array={sorted_steerpoints}
                key={steerpoint.id}
                coord_id={steerpoint.id}
                first={first_steerpoint}
                last={last_steerpoint}
                fp_owner={this.props.flightPlan.owner_id}
            />
        })
    };


    render() {
        if (!this.props.flightPlan || !this.props.coordinates) {
            return (
                <div className={"ui active dimmer"}>
                    <div className={"ui loader"}>Loading FlightPlan</div>
                </div>
            )
        }
        return (
            <div>
                <h3>{`FlightPlan: ${this.props.flightPlan.name}`}</h3>
                <FlightPlanMap
                    flightplan={this.props.flightPlan}
                >
                    <SteerpointPath flightplan={this.props.flightPlan} steerpoints={this.sortSteerpoints()}/>
                    <SteerpointMarkers flightplan={this.props.flightPlan}/>
                </FlightPlanMap>
                <div>
                    <Button.Group widths={5}>
                        <Button
                            active={this.state.displayMode === "LatLonDegrees" ? true : false}
                            onClick={() => {history.push(
                                {pathname: this.props.location.pathname, search: `?displayMode=LatLonDegrees`})}}
                        >
                            LatLon Degrees
                        </Button>
                        <Button
                            active={this.state.displayMode === "LatLonDegreesMinutes" ? true : false}
                            onClick={() => {history.push(
                                {pathname: this.props.location.pathname, search: `?displayMode=LatLonDegreesMinutes`})}}
                        >
                            LatLon Degrees/Minutes
                        </Button>
                        <Button
                            active={this.state.displayMode === "LatLonDegMinSec" ? true : false}
                            onClick={() => {history.push(
                                {pathname: this.props.location.pathname, search: `?displayMode=LatLonDegMinSec`})}}
                        >
                            LatLon Deg/Min/Sec
                        </Button>
                        {/*<Button*/}
                            {/*active={this.state.displayMode === "MGRS" ? true : false}*/}
                            {/*onClick={() => {history.push(*/}
                                {/*{pathname: this.props.location.pathname, search: `?displayMode=MGRS`})}}*/}
                        {/*>*/}
                            {/*MGRS*/}
                        {/*</Button>*/}
                        {/*<Button*/}
                            {/*active={this.state.displayMode === "UTM" ? true : false}*/}
                            {/*onClick={() => {history.push(*/}
                                {/*{pathname: this.props.location.pathname, search: `?displayMode=UTM`})}}*/}
                        {/*>*/}
                            {/*UTM*/}
                        {/*</Button>*/}
                    </Button.Group>
                </div>
                <div className={"ui segments"}>
                    {this.renderSteerpoints()}
                </div>
                <div className={"ui right floated"}>
                    {this.renderCreateSteerpointButton()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        flightPlan: state.flightPlans[ownProps.match.params.id],
        coordinates: state.coordinates,
        auth: state.auth
    };
};

export default connect(mapStateToProps, { fetchFlightPlan, fetchDelCoordsFromFlightPlan: fetchDelCoordsFromFlightPlan })(ShowFlightPlan);
