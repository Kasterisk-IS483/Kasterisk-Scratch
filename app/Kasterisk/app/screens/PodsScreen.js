import React, { Component, useState } from "react";

import WorkloadSummaryScreen from "./WorkloadSummaryScreen"

export default class PodsScreen extends Component {

  render() {
    return (
      <WorkloadSummaryScreen index={3}></WorkloadSummaryScreen>
    );
  }

}