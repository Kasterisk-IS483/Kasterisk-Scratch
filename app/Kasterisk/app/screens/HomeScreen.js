import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default class Home extends Component {
  render() {
    var getGoogle = JSON.parse(AsyncStorage.getItem("ClusterAuthProviderGoogle"));

    const getGoogle = async () => {
      try {
        let google = JSON.parse(await AsyncStorage.getItem("ClusterAuthProviderGoogle"));
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
          {this.getGoogle["accessToken"]}
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
    alignItems: "center",
    justifyContent: "center"
  }
});