import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './Modal';
import history from '../history';
import { fetchFlightPlan, deleteFlightPlan} from "../actions";

class DeleteFlightPlan extends React.Component {
    componentDidMount() {
        this.props.fetchFlightPlan(this.props.match.params.id);
    }

    renderContent() {
        if (!this.props.flightPlan) {
            return "Are you sure you want to delete ?"
        }
        return `Are you sure you want to delete ${this.props.flightPlan.name}?`
        // return (
        //     <Text>
        //         <Text>Are you sure you want to delete</Text>
        //         <Text style={{fontWeight: "bold"}}> ${this.props.flightPlan.name}</Text>
        //         <Text>?</Text>
        //     </Text>
        // );
    }

    renderActions() {
        return (
            <>
                <button onClick={this.onDelete} className={"ui button negative"}>Delete</button>
                <Link to={'/app/flightplans'} className={"ui button"}>Cancel</Link>
            </>
        )
    }

    onDelete = () => {
        this.props.deleteFlightPlan(this.props.match.params.id, '/app/flightplans');
    };

    render() {
        return (
            <Modal
                title={"Delete Flightplan"}
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/app/flightplans')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { flightPlan: state.flightPlans[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchFlightPlan, deleteFlightPlan })(DeleteFlightPlan);