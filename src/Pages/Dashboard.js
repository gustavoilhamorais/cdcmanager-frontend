import React, { Component } from "react";
import Card from "../Components/Card";
import RentsCard from "../Components/Dashboard/RentsCard";
import AlertCard from '../Components/Dashboard/AlertsCard';
import IncomingsCard from "../Components/Dashboard/IncomingsCard";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <RentsCard />
          <IncomingsCard />
          <AlertCard />
        </div>
      </div>
    );
  }
}

export default Dashboard;
