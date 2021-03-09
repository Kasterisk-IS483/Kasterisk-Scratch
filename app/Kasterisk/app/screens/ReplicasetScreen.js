import React, { Component } from "react";

import WorkloadSummaryScreen from "./WorkloadSummaryScreen"

export default class ReplicasetScreen extends Component {

  render() {
    return (
      <WorkloadSummaryScreen index={2}/>
    );
  }

}