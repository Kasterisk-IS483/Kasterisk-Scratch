import React, { Component } from "react";
import { Text, View, ScrollView, AsyncStorage } from "react-native";

import { commonStyles} from "../utils/styles.js";
import ActionButton from "../components/ActionButton";



export default class Home extends Component {
  state = {googleKey : ""};

  async getGoogle() {
    try {
      let google = await AsyncStorage.getItem("@ClusterAuthProviderGoogle");
      alert(google)
      google = JSON.parse(google)
      
      alert(google.accessToken)
      return google.accessToken;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }


  async componentDidMount(){
    let key = await this.getGoogle()
      this.setState({googleKey : key});
  }

  

  render() {
    
    return (
      <View style={commonStyles.whiteContainer}>
        <ScrollView contentContainerStyle={commonStyles.scrollView}>

          <Text style={commonStyles.heading}>
            Welcome, [name]
            {this.state.googleKey}
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
