import React, { Component } from "react";
import { View, ScrollView, Dimensions, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import TableCard from "../../components/Cards/TableCard";
import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";

import {
  commonStyles,
  dashboardStyles,
  commonPortraitStyles,
  workloadDetailsBreakpoint,
} from "../../utils/styles.js";

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
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        <View style={commonStyles.detailsContainer}>
          <TableCard header="Nodes" table={this.state.nodes} />
        </View>
      </ScrollView>
    );
  }
}
