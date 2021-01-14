import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";

import { commonStyles} from "../utils/styles.js";
import ActionButton from "../components/ActionButton";
import * as SecureStore from 'expo-secure-store';

export default class Home extends Component {

  state = {credentials : []};

  async getGoogle(){
    try{
      let google1 = await SecureStore.getItemAsync("ClusterAuthProviderGoogle");
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
      <View style={commonStyles.whiteContainer}>
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
