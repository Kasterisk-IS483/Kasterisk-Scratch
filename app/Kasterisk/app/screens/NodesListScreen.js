import React, { Component } from "react";
import { ScrollView, Dimensions, Alert } from "react-native";

import TableCard from "../components/Cards/TableCard";
import WorkloadSummaryApi from "../api/WorkloadSummaryApi";

import {
  colours,
  commonStyles,
  dashboardStyles,
  commonPortraitStyles,
  workloadDetailsBreakpoint,
  cardsOuterPadding,
  spacings,
} from "../utils/styles.js";

export default class NodesListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      nodes: [],
    };
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
    });
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

  async componentDidMount() {
    try {
      this.setState({
        nodes: await WorkloadSummaryApi.nodesInfo(),
      });
    } catch (err) {
      Alert.alert("Server Check Failed", err.message);
    }
  }

  render() {
    return (
      <ScrollView style={commonStyles.secondaryContainer}>
        <TableCard header="Nodes" table={this.state.nodes} />
      </ScrollView>
    );
  }
}
