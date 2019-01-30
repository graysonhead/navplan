import React from 'react';
import { connect } from 'react-redux';
import { fetchCoord } from "../actions";

class SteerpointCard extends React.Component {
    componentDidMount() {
        this.props.fetchCoord(this.props.coord_id);
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
        // return (
        //     <div className={"ui existing segment"}>
        //         <div className={"item"}>
        //             <button className={"ui icon button"}>
        //                 <i className={"cloud icon"}></i>
        //             </button>
        //         </div>
        //         <div className={"content"}>
        //             {`Coords: ${this.props.coordinate.latitude} ${this.props.coordinate.longitude}`}
        //         </div>
        //     </div>
        // )
        return (
            <div className={"item"}>
                    <div className={"right floated content"}>
                        <i className={"icon cloud"} />
                    </div>
                    <div className={"content"}>
                        {`Coords: ${this.props.coordinate.latitude} ${this.props.coordinate.longitude}`}
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { coordinate: state.coordinates[ownProps.coord_id]}
};

export default connect(mapStateToProps, { fetchCoord })(SteerpointCard);