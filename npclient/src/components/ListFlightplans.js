import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFlightPlans } from "../actions";

class ListFlightplans extends React.Component {
    componentDidMount() {
        this.props.fetchFlightPlans();
    }

    renderList() {
        return this.props.flightPlans.map( flightPlan => {
            return (
                <div className={"item"} key={flightPlan.id}>
                    <div className={"right floated content"}>
                        <Link to={`/flightplans/delete/${flightPlan.id}`} className={"ui button negative"}>
                            Delete
                        </Link>
                    </div>
                    <div className={"content"}>
                        <Link className={"header"} to={`/flightplans/${flightPlan.id}`}>
                            {flightPlan.name}
                        </Link>
                    </div>
                </div>
            )
        })
    }

    render() {
        return(
            <div>
                <h2>Flightplans</h2>
                <div className={"ui celled list"}>
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        flightPlans: Object.values(state.flightPlans)
    }

};

export default connect(mapStateToProps, { fetchFlightPlans })(ListFlightplans);