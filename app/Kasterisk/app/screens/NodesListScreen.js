import React, { Component } from "react";
import { View, ScrollView, Dimensions, Text } from "react-native";
import { Title, Card } from 'react-native-paper';

import DetailPageApi from "../api/DetailPageApi";

import { 
  colours, 
  commonStyles, 
  dashboardStyles, 
  commonPortraitStyles, 
  workloadDetailsBreakpoint,
  cardsOuterPadding,
  spacings
} from "../utils/styles.js";



export default class NodesListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
    //   pod: this.props.route.params.pod,
    //   age: this.props.route.params.age,
    //   labels: this.props.route.params.labels,
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
      <ScrollView style={commonStyles.secondaryContainer}>
       
      </ScrollView>
    );
  }

}