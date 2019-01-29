import React from 'react';
import { connect } from 'react-redux';
import { fetchFlightPlan } from "../actions";

class ShowFlightPlan extends React.Component {
    componentDidMount() {
        this.props.fetchFlightPlan(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                Flightplan
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { flightPlan: state.flightPlans[ownProps.match.params.id]};
};

export default connect(mapStateToProps, { fetchFlightPlan })(ShowFlightPlan);
