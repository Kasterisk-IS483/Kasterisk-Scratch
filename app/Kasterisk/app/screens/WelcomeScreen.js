import React, { Component, useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, Dimensions, StyleSheet } from "react-native";
import * as Google from "expo-google-app-auth";
// import * as Linking from "expo-linking";
import Button from "../components/Button";
import { commonStyles, portraitStyles } from "../styles.js";

const onPress = () => {
  // alert(this.getOrientation());
};

const styles = {
  logo: {
    position: "absolute",
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    left: "25%",
    top: "15%",
  },
  description: {
    position: "absolute",
    width: "50%",
    fontSize: 18,
    left: "25%",
    top: "50%",
    textAlign: "center",
  },
};

// const prefix = Linking.makeUrl("/");
// Expo client: "exp://127.0.0.1:19002"
// Standalone: "kasterisk://"

const IOS_CLIENT_ID =
  "587877229134-ivv7cc74rvke5jhhsejeq4cugpdfe0lh.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "587877229134-jlnds3fpb8i91orlrdstmedgvfus2qov.apps.googleusercontent.com";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: ''
    };
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
  });
  }
  
  getOrientation() {
    if (Dimensions.get('window').width > Dimensions.get('window').height) {
      return 'LANDSCAPE';
    } else {
      return 'PORTRAIT';
    }
  }

  getStyle() {
    if (this.getOrientation() === 'LANDSCAPE') {
      return commonStyles;
    } else {
      return portraitStyles;
    }
  }

  onLayout() {
    this.setState({ orientation: this.getOrientation()});
  }
  
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("WelcomeScreen.js.js 21 | ", result.user.givenName, result.idToken);
        this.props.navigation.navigate("Home", {
          idToken: result.idToken
        }); //after Google login redirect to Home
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('WelcomeScreen.js.js 30 | Error with login', e);
      return { error: true };
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={this.getStyle().container}>
        <View style={this.getStyle().fillContainer}>
          <ImageBackground
            style={this.getStyle().fillContainer}
            source={require("../assets/welcome-bg-landscape.png")}
            imageStyle={{ resizeMode: "cover" }}
          />
          <Image
            style={styles.logo}
            source={require('../assets/kasterisk-logo.png')}
          />
          <Text style={styles.description}>Access, manage and monitor your Kubernetes clusters.</Text>
        </View>

        <View style={this.getStyle().primaryContainer}>
          <View style={commonStyles.centredContainer}>
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <Button
                image={require("../assets/welcome-button-google.png")}
                text="Log in With Google"
                onPress={this.signInWithGoogle}
              />
              <Button
                image={require("../assets/welcome-button-aws.png")}
                text="Log in With Amazon"
                onPress={() =>
                  navigation.navigate("AWS Login")
                }
              />
              <Button
                image={require("../assets/welcome-button-azure.png")}
                text="Log in With Azure AD"
                onPress={onPress}
              />
              <View style={commonStyles.divider} />
              <Button
                image={require("../assets/welcome-button-kube.png")}
                text="Upload Kubeconfig File"
                onPress={() =>
                  navigation.navigate("KubeconfigUpload")
                }
              />
              <Button
                image={require("../assets/welcome-button-kube.png")}
                text="Add Kubeconfig Content"
                onPress={() =>
                  navigation.navigate("KubeconfigContent")
                }
              />
            </View>
          </View>
        </View>
      </View>
    );

  }
}