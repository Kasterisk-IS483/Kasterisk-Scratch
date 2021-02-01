import React, { Component } from "react";
import { Text, Image, View, ScrollView, Dimensions } from "react-native";

import {
  commonStyles,
  landscapeStyles,
  portraitStyles,
} from "../utils/styles.js";
import ActionButton from "../components/ActionButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCard from "../components/CustomCard";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      result: null,
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

  //state = { credentials: [] };

  // async getGoogle(){
  //   try{
  //     let google1 = await AsyncStorage.getItem("ClusterAuthProviderGoogle");
  //     google1 = JSON.parse(google1);
  //     return google1;
  //   } catch (error) {
  //     // Error retrieving data

  //     console.log(error.message);
  //   }
  // }

  // async componentDidMount(){
  //   let response = await this.getGoogle()
  //     this.setState({credentials : response});
  // }

  render() {

    return (

      <View style={this.getStyle().workloadSummaryMainContainer}>

        <View style={this.getStyle().workloadSummaryRowContainer}>
          <View style={this.getStyle().workloadSummaryColumnContainer}>
            <CustomCard  image={require("../assets/deployment.png")}></CustomCard>
          </View>

          <View style={this.getStyle().workloadSummaryColumnContainer}>
            <CustomCard  image={require("../assets/replicaset.png")}></CustomCard>
          </View>

          <View style={this.getStyle().workloadSummaryColumnContainer}>
            <CustomCard  image={require("../assets/pod.png")}></CustomCard>
          </View>
        </View>

      </View>
    );
  }
}
