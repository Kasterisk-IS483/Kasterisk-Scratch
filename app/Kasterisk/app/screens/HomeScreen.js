import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import ClusterAuthProviderGoogle from "./WelcomeScreen";

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Profile Screen </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, TESTINGGGGGGGGGG
          {ClusterAuthProviderGoogle}
          {JSON.parse(localStorage.getItem("ClusterAuthProviderGoogle"))}
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