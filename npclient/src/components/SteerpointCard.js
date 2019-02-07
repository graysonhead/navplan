import React from 'react';
import { connect } from 'react-redux';
import { fetchCoord, reorderSteerpoint, editCoordinate } from "../actions";
import { Field, reduxForm } from 'redux-form';
import SelectType from './forms/SelectType';
var LatLon = require('geodesy').LatLonSpherical;
var Utm = require('geodesy').Utm;

const STEERPOINT_TYPES = [
    { key: 1, text: 'Steerpoint', value: 'stpt', icon: 'location arrow' },
    { key: 2, text: 'Departure', value: 'departure', icon: 'level up alternate' },
    { key: 3, text: 'Landing', value: 'landing', icon: 'level down alternate' },
    { key: 4, text: 'Attack', value: 'atk', icon: 'x'}
];

class SteerpointCard extends React.Component {
    state = {latLon: null};

    componentDidMount() {
        // this.props.fetchCoord(this.props.coord_id);
        const llObj = LatLon(this.props.coordinate.latitude, this.props.coordinate.longitude);
        // const utmObj = llObj.toUtm();
        this.setState({latLon: llObj});
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

    onTypeChange = (e, { value }) => {
        const data = { steerpoint_type: value};
        console.log(value);
        this.props.editCoordinate(this.props.coordinate.id, data);
    };
    renderMoveUp() {
        if (!this.props.first) {
            return <div
                className={"ui icon button"}
                // Tooltip Popup
                data-tooltip="Move Steerpoint Up"
                data-variation="mini"
                onClick={this.onMoveUp}
            > <i className={"icon chevron up"} /></div>
        }
    }

    renderMoveDown() {
        if (!this.props.last) {
            return <div
                className={"ui icon button"}
                data-tooltip="Move Steerpoint Down"
                data-variation="mini"
                onClick={this.onMoveDown}
            > <i className={"icon chevron down"} /></div>
        }
    }

    renderControls() {
        return (
                <div className="right floated ui buttons">
                    <SelectType
                            items={STEERPOINT_TYPES}
                            value={this.props.coordinate ? this.props.coordinate.steerpoint_type : "" }
                            onChange={this.onTypeChange}
                            />
                    {this.renderMoveUp()}
                    {this.renderMoveDown()}
                </div>
        )
    }

    determineColor() {
        switch (this.props.coordinate.steerpoint_type) {
            case 'atk':
                return 'red';
            case 'stpt':
                return 'green';
            case 'departure':
                return 'blue';
            case 'landing':
                return 'blue';
            default:
                return '';
        }
    }

    getDisplayString() {
        if (this.state.latLon) {
            switch (this.props.displayMode) {
            case 'LatLonDegrees':
                return this.state.latLon.toString('d');
            case 'LatLonDegreesMinutes':
                return this.state.latLon.toString('dm');
            case 'LatLonDegMinSec':
                return this.state.latLon.toString('dms');
            case 'UTM':
                return null;
            default:
                return '';
            }
        }

    }

    render() {
        if (!this.props.coordinate) {
            return (
                <div className={'ui segment'}>
                    Coords:
                    <div className={"ui active dimmer"}>
                        <div className="ui mini loader"></div>
                    </div>
                </div>
            )
        }
        this.determineColor();
        return (
            <div className={`ui ${this.determineColor()} clearing segment`}>
                {this.renderControls()}
                    <div className={"content"}>
                        {this.getDisplayString()}
                        {/*{`Coords: ${this.props.coordinate.latitude} ${this.props.coordinate.longitude} ${this.props.coordinate.order}`}*/}
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { coordinate: state.coordinates[ownProps.coord_id]}
};

export default connect(mapStateToProps, { fetchCoord, reorderSteerpoint, editCoordinate })(SteerpointCard);