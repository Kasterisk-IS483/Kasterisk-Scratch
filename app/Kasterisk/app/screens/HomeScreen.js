import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { Colors, Button } from "react-native-paper";

import { commonStyles } from "../utils/styles.js";

export default class Home extends Component {
  render() {

    const getGoogle = async () => {
      try {
        let google = JSON.parse(await AsyncStorage.getItem("@ClusterAuthProviderGoogle"));
        return google;
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }
    
    return (
      <View style={commonStyles.whiteContainer}>
        <ScrollView contentContainerStyle={commonStyles.scrollView}>

          <Text style={commonStyles.heading}>
            Welcome, [name]
            {getGoogle["accessToken"]}
          </Text>

          <View style={commonStyles.centralise}>
            <Button 
              style={commonStyles.actionButton}
              mode={"contained"}
              color={Colors.blue500}
              onPress={() => this.props.navigation.navigate("Welcome")}
            >
              Sign out
            </Button>

          </View>
        </ScrollView>
      </View>
    );
  }
}
