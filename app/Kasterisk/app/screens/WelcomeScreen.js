import React, { Component, useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, Dimensions, StyleSheet } from "react-native";
import * as Google from "expo-google-app-auth";
import implement, { Interface, type } from 'implement-js'
// import * as Linking from "expo-linking";

import CustomButton from "../components/CustomButton";
import { commonStyles, landscapeStyles, portraitStyles, whiteCol } from "../styles.js";

const onPress = () => {
  // alert(this.getOrientation());
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
      return landscapeStyles;
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
      console.log(result)
      if (result.type === "success") {
        console.log("WelcomeScreen.js.js 21 | ", result.user.givenName);
        saveTemporaryCredentials({
          accessToken: result.accessToken,
          expires: 0,
          idToken: result.idToken,
          refreshToken: result.refreshToken,
        });
        console.log(localStorage.getItem(STORAGE_TEMPORARY_CREDENTIALS));
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
            style={this.getStyle().logo}
            source={require('../assets/kasterisk-logo.png')}
          />
          <Text style={this.getStyle().description}>Access, manage and monitor your Kubernetes clusters.</Text>
        </View>

        <View style={this.getStyle().primaryContainer}>
          <View style={commonStyles.centredContainer}>
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <CustomButton
                image={require("../assets/welcome-button-google.png")}
                text="Log in With Google"
                onPress={this.signInWithGoogle}
              />
              <CustomButton
                image={require("../assets/welcome-button-aws.png")}
                text="Log in With Amazon"
                onPress={() =>
                  navigation.navigate("AWS Login")
                }
              />
              <CustomButton
                image={require("../assets/welcome-button-azure.png")}
                text="Log in With Azure AD"
                onPress={onPress}
              />
              <View style={commonStyles.divider} />
              <CustomButton
                image={require("../assets/welcome-button-kube.png")}
                text="Upload Kubeconfig File"
                onPress={() =>
                  navigation.navigate("KubeconfigUpload")
                }
              />
              <CustomButton
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

const IClusterAuthProviderGoogle = Interface('IClusterAuthProviderGoogle') ({
  accessToken: type('string'),
  expires: type('number'),
  idToken: type('string'),
  refreshToken: type('string'),
  clusterID?: type('string'),
},{
  strict: true
})

export const saveTemporaryCredentials = (
  credentials: IClusterAuthProviderGoogle
): void => {
  localStorage.setItem(STORAGE_TEMPORARY_CREDENTIALS, JSON.stringify(credentials));
};

