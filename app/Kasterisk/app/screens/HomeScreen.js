import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default class Home extends Component {
  render() {
    return (
      <View style={landscapeStyles.container}>
        <Text> Profile Screen </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, {this.props.navigation.getParam("idToken")}
        </Text>
        <Button
          title="Sign out"
          onPress={() => this.props.navigation.navigate("WelcomeScreen")}
        />
      </View>
    );
  }
}

const landscapeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});