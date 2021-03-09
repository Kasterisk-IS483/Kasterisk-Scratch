import React, { Component, useState } from "react";

import WorkloadSummaryScreen from "./WorkloadSummaryScreen"

export default class DeploymentScreen extends Component {

  render() {
    return (
      <WorkloadSummaryScreen index={1}></WorkloadSummaryScreen>
    );
  }

}