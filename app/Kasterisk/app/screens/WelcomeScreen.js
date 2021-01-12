import React, { Component, useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    Image,
    Dimensions,
    StyleSheet,
    AsyncStorage
} from "react-native";
import * as Google from "expo-google-app-auth";

import CustomButton from "../components/CustomButton";
import {
    commonStyles,
    landscapeStyles,
    portraitStyles,
    whiteCol
} from "../styles.js";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "../utils/constants";

import * as AuthSession from 'expo-auth-session';
import { openAuthSession } from 'azure-ad-graph-expo';

const azureAdAppProps = {
        clientId        :   "047ad4bd-b216-4efd-9f44-6093ec72eef6",
        tenantId        :   "f8cdef31-a31e-4b4a-93e4-5f571e91255a",
        scope           :   'User.Read',
        redirectUrl     :   AuthSession.makeRedirectUri(),
        clientSecret    :   "K0Hsw1-jnPb5iQ7~5S9V.q3zID7fg5~.lB",
        // domainHint      :   AZURE_DOMAIN_HINT,
        prompt          :   'login'
};

export default class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        orientation: "",
        };
        Dimensions.addEventListener("change", (e) => {
        this.setState(e.window);
        });
    }

    getOrientation() {
        if (Dimensions.get("window").width > Dimensions.get("window").height) {
            return "LANDSCAPE";
        } else {
            return "PORTRAIT";
        }
    }

    getStyle() {
        if (this.getOrientation() === "LANDSCAPE") {
            return landscapeStyles;
        } else {
            return portraitStyles;
        }
    }

    onLayout() {
        this.setState({ orientation: this.getOrientation() });
    }

    async saveTemporaryCredentials(toSave, credentials) {
        try {
          await AsyncStorage.setItem(toSave, JSON.stringify(credentials));
        } catch (e) {
          console.log(e)
        }
      }


  signInWithGoogle = async () => {
    try {
        const result = await Google.logInAsync({
            iosClientId: IOS_CLIENT_ID,
            androidClientId: ANDROID_CLIENT_ID,
            scopes: ["profile", "email"],
        });

        if (result.type === "success") {
            console.log("WelcomeScreen.js.js 21 | ", result.user.givenName);

            // set credentials for google after logged in
            ClusterAuthProviderGoogle["accessToken"] = result.accessToken;
            ClusterAuthProviderGoogle["idToken"] = result.idToken;
            ClusterAuthProviderGoogle["refreshToken"] = result.refreshToken;

            // save credentials into localStorage
            this.saveTemporaryCredentials(
            "ClusterAuthProviderGoogle",
            ClusterAuthProviderGoogle
            );
            // console.log(
            // JSON.parse(await AsyncStorage.getItem("ClusterAuthProviderGoogle"))
            // );

            this.props.navigation.navigate("Home", {
            idToken: result.idToken,
            }); //after Google login redirect to Home
            console.log(result);
            return result.accessToken;
        } else {
            return { cancelled: true };
        }
    } catch (e) {
        console.log("WelcomeScreen.js.js 30 | Error with login", e);
        return { error: true };
    }
  };

  _handlePressAsync = async () => {
    let result = await openAuthSession(azureAdAppProps);
    this.setState({ result });
  }

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
                    source={require("../assets/kasterisk-logo.png")}
                />
                <Text style={this.getStyle().description}>
                    Access, manage and monitor your Kubernetes clusters.
                </Text>
                </View>

                <View style={this.getStyle().primaryContainer}>
                    <ScrollView>
                        <View style={commonStyles.centredContainer}>
                            <View
                            style={{
                                padding: 35,
                                width: '100%',
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                                >
                                <CustomButton
                                    image={require("../assets/welcome-button-google.png")}
                                    text="Log in With Google"
                                    onPress={this.signInWithGoogle}
                                />
                                <CustomButton
                                    image={require("../assets/welcome-button-aws.png")}
                                    text="Log in With Amazon"
                                    onPress={() => navigation.navigate("AWS Login")}
                                />
                                <CustomButton
                                    image={require("../assets/welcome-button-azure.png")}
                                    text="Log in With Azure AD"
                                    onPress={this._handlePressAsync}
                                />
                                <View style={commonStyles.divider} />
                                <CustomButton
                                    image={require("../assets/welcome-button-kube.png")}
                                    text="Upload Kubeconfig File"
                                    onPress={() => navigation.navigate("KubeconfigUpload")}
                                />
                                <CustomButton
                                    image={require("../assets/welcome-button-kube.png")}
                                    text="Add Kubeconfig Content"
                                    onPress={() => navigation.navigate("KubeconfigContent")}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>

            
        );
    }
}



var ClusterAuthProviderGoogle = {
    accessToken: "",
    expires: 0,
    idToken: "",
    refreshToken: "",
};
