import React, { Component } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Title } from 'react-native-paper';

import DetailPageApi from "../../api/DetailPageApi";
import { getLabelButtons, getAgeText } from "../../utils/constants";

import { 
  commonStyles, 
  dashboardStyles, 
  commonPortraitStyles, 
  workloadDetailsBreakpoint 
} from "../../utils/styles.js";

import DetailsCard from "../../components/Cards/DetailsCard";
import TableCard from "../../components/Cards/TableCard";

export default class WorkloadNodeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      node: this.props.route.params.node,
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

  render() {
    
    return (
      <ScrollView style={dashboardStyles.scrollContainer}>
        <View style={commonStyles.detailsContainer}>

          <Title style={commonStyles.headerTitle}>
            Title
          </Title>

          <View style={this.getStyle().rowContainer}>
            <View style={this.getStyle().columnContainer}>
              <DetailsCard header="Configuration" type="Node"/>
            </View>
            <View style={this.getStyle().columnContainer}>
              <TableCard header="Addresses" type="Node" />
            </View>
          </View>

          <TableCard header="Conditions" type="Node" />

          <View style={this.getStyle().rowContainer}>
            <View style={this.getStyle().columnContainer}>
              <TableCard header="Resources" type="Node" />
            </View>
            <View style={this.getStyle().columnContainer}>
              <TableCard header="Images" type="Node" />
            </View>
          </View>

          <DetailsCard header="Metadata" type="Node" />

        </View>
      </ScrollView>
    );
  }

}