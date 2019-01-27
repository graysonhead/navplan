import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
      <div className={"ui menu"}>
          <div className="header item">
              <Link to={"/"}>NavPlan.io</Link>
          </div>
          <Link to={"/flightplans/new"} className={"item"}>New Flightplan</Link>
      </div>
  )
};

export default Menu;