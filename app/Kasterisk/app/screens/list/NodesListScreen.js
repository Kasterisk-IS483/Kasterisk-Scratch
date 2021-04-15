import React, { Component } from "react";
import { Dimensions, Alert } from "react-native";

import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";
import {
  commonStyles,
  commonPortraitStyles,
  workloadDetailsBreakpoint,
} from "../../utils/styles";
import WorkloadTemplate from "../../components/Templates/WorkloadTemplate";

export default class NodesListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      nodes: [],
    };
  }

  getOrientation() {
    if (Dimensions.get("window").width > workloadDetailsBreakpoint) {
      return "LANDSCAPE";
    } else {
      return "PORTRAIT";
    }
  }
  getStyle() {
    if (this.getOrientation() === "LANDSCAPE") {
      return commonStyles;
    } else {
      return commonPortraitStyles;
    }
  }
  onLayout() {
    this.setState({ orientation: this.getOrientation() });
  }

  setWindow = () => {
    this.setState(Dimensions.get("window"));
  }

  async componentDidMount() {
    Dimensions.addEventListener("change", this.setWindow);

    this.setState({
      spinner: true,
    });
    try {
      this.setState({
        nodes: await WorkloadSummaryApi.nodesInfo(),
      });
    } catch (err) {
      Alert.alert("Server Check Failed", err.message);
    }
    this.setState({
      spinner: false,
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.setWindow);
  }

  render() {
    return (
      <WorkloadTemplate type="list" header="Nodes" showSpinner={this.state.spinner}>
        {this.state.nodes}
      </WorkloadTemplate>
    );
  }
}
