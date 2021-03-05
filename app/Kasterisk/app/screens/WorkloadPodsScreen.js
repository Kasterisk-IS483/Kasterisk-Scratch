import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useState } from "react";
import { View, ScrollView, Dimensions, Alert, Text, Icon } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { checkServerStatus } from '../api/KubeApi'
import {
  commonStyles,
  landscapeStyles,
  portraitStyles,
} from "../utils/styles.js";

import IndividualCard from "../components/Cards/IndividualCard";
import TableCard from "../components/Cards/TableCard";

export default class WorkloadPodsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
    };
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
    });
  }

  getOrientation() {
    if (Dimensions.get("window").width > Dimensions.get("window").height) {
      return "LANDSCAPE";
    } else {
      return "PORTRAIT";
    }
  }

  getStyle() {
    if (this.getOrientation() === "LANDSCAPE") {
      return landscapeStyles;
    } else {
      return portraitStyles;
    }
  }

  onLayout() {
    this.setState({ orientation: this.getOrientation() });
  }

  render() {
    return (
      <ScrollView style={commonStyles.secondaryContainer}>
        {/* <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={{ color: '#FFF' }}
        /> */}
        <View style={commonStyles.dashboardContainer}>
          <IndividualCard type="Pods" header="Configuration"></IndividualCard>
          <IndividualCard type="Pods" header="Status"></IndividualCard>
          <TableCard header="Conditions" />
        </View>

      </ScrollView>
    );
  }

}