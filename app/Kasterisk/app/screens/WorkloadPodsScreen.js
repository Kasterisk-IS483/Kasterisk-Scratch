import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Title } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";

import { checkServerStatus } from '../api/KubeApi'
import {
  fonts,
  spacings,
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

        <Title style={commonStyles.headerTitle}>
          Pod Name
        </Title> 

        <View style={commonStyles.dashboardContainer}>
          <IndividualCard header="Configuration" type="Pods"></IndividualCard>
          <IndividualCard header="Status" type="Pods"></IndividualCard>
          <TableCard header="Conditions" />
          <IndividualCard header="Metadata" type="Pods" />
        </View>

      </ScrollView>
    );
  }

}