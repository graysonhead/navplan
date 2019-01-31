import React from 'react';
import { connect } from 'react-redux';
import { fetchCoord, reorderSteerpoint } from "../actions";

class SteerpointCard extends React.Component {
    componentDidMount() {
        this.props.fetchCoord(this.props.coord_id);
    }

    onMoveUp = () => {
        this.props.reorderSteerpoint(
            this.props.coordinate,
            this.props.steerpoint_array.indexOf(this.props.coordinate) - 1,
            this.props.steerpoint_array
        )
    };

    onMoveDown = () => {
        this.props.reorderSteerpoint(
            this.props.coordinate,
            this.props.steerpoint_array.indexOf(this.props.coordinate) + 1,
            this.props.steerpoint_array
        )
    };
    renderMoveUp() {
        if (!this.props.first) {
            return <button
                className={"ui icon button"}
                onClick={this.onMoveUp}
            > <i className={"icon chevron up"} /></button>
        }
    }

    renderMoveDown() {
        if (!this.props.last) {
            return <button
                className={"ui icon button"}
                onClick={this.onMoveDown}
            > <i className={"icon chevron down"} /></button>
        }
    }

    renderControls() {
        return (
            <div className={"right floated content"}>
                <div className="ui buttons">
                    {this.renderMoveUp()}
                    {this.renderMoveDown()}
                </div>
            </div>
        )
    }

    render() {
        if (!this.props.coordinate) {
            return (
                <div className={"ui segment"}>
                    Coords:
                    <div className={"ui active dimmer"}>
                        <div className="ui mini loader"></div>
                    </div>
                </div>
            )
        }
        return (
            <div className={"item"}>
                {this.renderControls()}
                    <div className={"content"}>
                        {`Coords: ${this.props.coordinate.latitude} ${this.props.coordinate.longitude} ${this.props.coordinate.order}`}
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { coordinate: state.coordinates[ownProps.coord_id]}
};

export default connect(mapStateToProps, { fetchCoord, reorderSteerpoint })(SteerpointCard);