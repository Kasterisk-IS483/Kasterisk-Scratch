import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Profile Screen </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, TESTINGGGGGGGGGG
          {this.props.route.params.idToken}
          {localStorage.getItem('STORAGE_TEMPORARY_CREDENTIALS')}
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