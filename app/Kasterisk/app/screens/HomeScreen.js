import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { commonStyles } from "../styles.js";

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
      <View style={styles.container}>
        <Text> Profile Screen </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, TESTINGGGGGGGGGG
          {getGoogle["accessToken"]}
        </Text>
        <Button
          title="Sign out"
          onPress={() => this.props.navigation.navigate("Welcome")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    ...commonStyles.centralise
  }
});