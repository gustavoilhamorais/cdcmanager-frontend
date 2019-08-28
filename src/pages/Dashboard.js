import React, { Component } from "react";
import Card from "../components/Card";
import RentsCard from "../components/Dashboard/RentsCard";
import AlertCard from '../components/Dashboard/AlertsCard';
import IncomingsCard from "../components/Dashboard/IncomingsCard";

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
