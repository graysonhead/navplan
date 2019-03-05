import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './Modal';
import history from '../history';
import { deleteCoordinate, fetchCoord } from '../actions';
import { Button } from 'semantic-ui-react';

class DeleteCoordinate extends React.Component {
    componentDidMount() {
        this.props.fetchCoord(this.props.match.params.id);
    }

    renderActions() {
        return (
            <>
                <Button onClick={this.onDelete}>Delete</Button>
                <Button onClick={history.goBack}>Cancel</Button>
            </>
        )
    }

    onDelete = () => {
        this.props.deleteCoordinate(this.props.match.params.id, true);
    };

    render() {
        return (
            <Modal
                title={"Delete Coordinate"}
                content={"Are you sure you want to delete this waypoint?"}
                actions={this.renderActions()}
                onDismiss={() => history.goBack()}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { coordinate: state.coordinates[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {deleteCoordinate, fetchCoord})(DeleteCoordinate);