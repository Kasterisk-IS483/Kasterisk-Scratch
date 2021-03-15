import React, { Component } from "react";
import { View, ScrollView, Dimensions, Text, Alert } from "react-native";
import { Title, Card } from "react-native-paper";

import TableCard from "../components/Cards/TableCard";
import NodeApi from "../api/NodeApi";

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
        nodes: await NodeApi.listAllNode(),
      });
    } catch (err) {
      Alert.alert("Server Check Failed", err.message);
    }
  }

  render() {
    return (
      <ScrollView style={commonStyles.secondaryContainer}>
        <TableCard header="Nodes" />
        {/* <TableCard header="Nodes" table={this.state.nodes} /> */}
      </ScrollView>
    );
  }
}
