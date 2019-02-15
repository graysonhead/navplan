import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// const Menu = () => {
//   return (
//       <div className={"ui menu"}>
//           <div className="header item">
//               <Link to={"/"}>NavPlan.io</Link>
//           </div>
//           <Link to={"/flightplans/new"} className={"item"}>New Flightplan</Link>
//           <Link to={"/flightplans"} className={"item"}>Flightplans</Link>
//           <div className={"right menu"}>
//           </div>
//       </div>
//   )
// };

class Menu extends React.Component {

    renderCallsign() {
        console.log(this.props.auth.isSignedIn);
        if (this.props.auth.isSignedIn) {
            return (
                <div className={"ui item"}>
                    {this.props.auth.user.callsign}
                </div>
            )
        }
    }

    render() {
        return (
            <div className={"ui menu"}>
              <div className="header item">
                  <Link to={"/"}>NavPlan.io</Link>
              </div>
              <Link to={"/flightplans/new"} className={"item"}>New Flightplan</Link>
              <Link to={"/flightplans"} className={"item"}>Flightplans</Link>
              <div className={"right menu"}>
                  {this.renderCallsign()}
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, {})(Menu);
