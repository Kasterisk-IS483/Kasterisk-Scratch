import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";

import { commonStyles } from "../utils/styles.js";
import ActionButton from "../components/ActionButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Home extends Component {

  state = {credentials : []};

  async getGoogle(){
    try{
      let google1 = await AsyncStorage.getItem("ClusterAuthProviderGoogle");
      google1 = JSON.parse(google1);
      return google1;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  async componentDidMount(){
    let response = await this.getGoogle()
      this.setState({credentials : response});
  }


  render() {
    
    return (
      <View style={[commonStyles.container, {backgroundColor: colours.secondary}]}>
        <ScrollView contentContainerStyle={commonStyles.scrollView}>

          <Text style={commonStyles.heading}>
            Welcome, {this.state.credentials["accessToken"]}
          </Text>

          <ActionButton
              text="Sign out"
              onPress={() => this.props.navigation.navigate("Welcome")}
          />

        </ScrollView>
      </View>
    );
  }
}
