import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Button from "../../src/components/Button";

const onPress = () => {
    alert("clicked")
  }

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <ImageBackground
          style={styles.container}
          source={require("../assets/login-title.png")}
          imageStyle={{ resizeMode: "cover" }}
        />
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.buttonContainer}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Button
              image={require("../assets/login-button-google.png")}
              text="Log in With Google"
              onPress={onPress}
            />
            <Button
              image={require("../assets/login-button-aws.png")}
              text="Log in With Amazon"
              onPress={onPress}
            />
            <Button
              image={require("../assets/login-button-azure.png")}
              text="Log in With Azure AD"
              onPress={onPress}
            />
            <View style={styles.lineStyle} />
            <Button
              image={require("../assets/login-button-kube.png")}
              text="Upload Kubeconfig File"
              onPress={onPress}
            />
            <Button
              image={require("../assets/login-button-kube.png")}
              text="Add Kubeconfig Content"
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1.5,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: "#265395",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    width: 200,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "#FFFFFF",
    width: "90%",
    margin: 10,
  },
});
