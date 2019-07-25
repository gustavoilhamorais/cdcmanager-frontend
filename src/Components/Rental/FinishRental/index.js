import React, { Component } from "react";
import api from "../../../api/conf";

export default class FinishRental extends Component {
  async check(props) {
    const toCheck = await api.get(`/rentals/${props.rentid}`);

    if (toCheck.data.status === true) {
      toCheck.data.status = false;
    } else {
      toCheck.data.status = true;
    }

    await api
    .put(`/rentals/${props.rentid}`, toCheck.data)
    .then(response => {
      if (response.status === 200) {
        this.props.history.push("/rentals");
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <button
        className="btn btn-success btn-bg ml-1 fas fa-check-circle"
        onClick={() => this.check(this.props)}
        rentid={this.props.rentid}
      >
      </button>
    );
  }
}
