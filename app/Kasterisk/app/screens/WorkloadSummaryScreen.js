import React, { Component } from "react";
import { Text, Image, View, ScrollView, Dimensions } from "react-native";

import {
  commonStyles,
  landscapeStyles,
  portraitStyles,
} from "../utils/styles.js";
import ActionButton from "../components/ActionButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CustomCard = () => (
  <Card>    
    <Card.Cover source={require("../assets/deployment.png")} />
    <Card.Content>
      <Title>Ready</Title>
    </Card.Content>
    <Card.Content>
      <Title>Not Ready</Title>
    </Card.Content>
  </Card>
);
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
      // <View style={commonStyles.workloadSummaryMainContainer}>
      //   <ScrollView contentContainerStyle={commonStyles.scrollView}>

      //     {/* <View style={commonStyles.fillContainer}></View> */}

      //     <View style={commonStyles.workloadSummarySecondaryContainer}>
      //       <CustomCard></CustomCard>
      //     </View>

      //     {/* <View style={commonStyles.fillContainer}></View> */}

      //     <View style={commonStyles.workloadSummarySecondaryContainer}>
      //       <CustomCard></CustomCard>
      //     </View>

      //     {/* <View style={commonStyles.fillContainer}></View> */}

      //     <View style={commonStyles.workloadSummarySecondaryContainer}>
      //       <CustomCard></CustomCard>
      //     </View>

      //   </ScrollView>
      // </View>

      <View style={this.getStyle().workloadSummaryMainContainer}>


        <View style={this.getStyle().workloadSummaryRowContainer}>
          <View style={this.getStyle().workloadSummaryColumnContainer}>
            <CustomCard></CustomCard>
          </View>

          <View style={this.getStyle().workloadSummaryColumnContainer}>
            <CustomCard></CustomCard>
          </View>

          <View style={this.getStyle().workloadSummaryColumnContainer}>
            <CustomCard></CustomCard>
          </View>
        </View>

      </View>
    );
  }
}
