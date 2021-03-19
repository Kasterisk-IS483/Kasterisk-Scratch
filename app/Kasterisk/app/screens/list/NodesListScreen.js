import React, { Component } from "react";
import { View, ScrollView, Dimensions, Alert } from "react-native";

import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";
import {
  commonStyles,
  dashboardStyles,
  commonPortraitStyles,
  workloadDetailsBreakpoint,
} from "../../utils/styles.js";
import TableCard from "../../components/Cards/TableCard";
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

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

  render() {
    return (
      <ScrollView style={commonStyles.secondaryContainer, dashboardStyles.scrollContainer}>
        <SpinnerOverlay showSpinner={this.state.spinner} />
        <View style={commonStyles.detailsContainer}>
          <TableCard header="Nodes" table={this.state.nodes} />
        </View>
      </ScrollView>
    );
  }
}
