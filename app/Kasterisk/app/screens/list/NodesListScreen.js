import React, { Component } from "react";
import { Dimensions, Alert } from "react-native";

import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";
import {
  getOrientation
} from "../../utils/styles";
import WorkloadTemplate from "../../components/Templates/WorkloadTemplate";

/** Nodes List View Screen **/
export default class NodesListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      nodes: [],
    };
  }

  onLayout() {
    this.setState({ orientation: getOrientation() });
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
