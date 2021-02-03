import React, { Component } from "react";
import { Text, Image, View, ScrollView, Dimensions } from "react-native";

import {
  commonStyles,
  landscapeStyles,
  portraitStyles,
} from "../utils/styles.js";
import ActionButton from "../components/ActionButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OverviewCard from "../components/OverviewCard";

export default class WorkloadSummaryScreen extends Component {

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

  async test(){
    let clusters = await AsyncStorage.getItem("@clusters")
    clusters = JSON.parse(clusters)
    let first = await AsyncStorage.getItem(clusters[0])
    first = JSON.parse(first);
    let url = first['cluster']['server']
    alert(url);
  }

  async componentDidMount(){
    await this.test();
  }

  render() {

    return (

      <View style={this.getStyle().workloadSummaryMainContainer}>

        <View style={this.getStyle().workloadSummaryRowContainer}>
          <View style={this.getStyle().workloadSummaryColumnContainer}>
            <OverviewCard image={require("../assets/deployment.png")} type="Deployments" ></OverviewCard>
          </View>

          <View style={this.getStyle().workloadSummaryColumnContainer}>
            <OverviewCard image={require("../assets/replicaset.png")} type="ReplicaSet" ></OverviewCard>
          </View>

          <View style={this.getStyle().workloadSummaryColumnContainer}>
            <OverviewCard image={require("../assets/pod.png")} type="Pods" ></OverviewCard>
          </View>
        </View>

      </View>
    );
  }
}
