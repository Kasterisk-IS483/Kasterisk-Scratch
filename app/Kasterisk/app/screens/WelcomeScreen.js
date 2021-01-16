import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    Image,
    Dimensions
} from "react-native";

import CustomButton from "../components/CustomButton";
import {
    commonStyles,
    landscapeStyles,
    portraitStyles
} from "../utils/styles.js";

import * as AuthSession from 'expo-auth-session';
import { openAuthSession } from 'azure-ad-graph-expo';
// import {AzureInstance, AzureLoginView} from 'react-native-azure-ad-2'
import GoogleCloudApi from '../api/GoogleCloudApi';

const azureAdAppProps = {
        clientId        :   '047ad4bd-b216-4efd-9f44-6093ec72eef6',
        tenantId        :   'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
        scope           :   'user.read',
        redirectUrl     :   'msal047ad4bd-b216-4efd-9f44-6093ec72eef6://auth',
        clientSecret    :   'K0Hsw1-jnPb5iQ7~5S9V.q3zID7fg5~.lB',
        domainHint      :   '',
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

    GoogleLogin = async () => {
        try{
            const isValidCredentials = await (
                GoogleCloudApi.checkGoogleCredentials()
            );
            if (isValidCredentials) {
                this.props.navigation.navigate('Home'); //after Google login redirect to Home
            } else {
                Alert.alert('Login Cancelled', 'Please enter your email and password to sign in.');
            }
        }
        catch (e){
            Alert.alert('Invalid Credentials', 'Please enter valid email and password for your google account.');;
        }
    }

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
                        source={require("../assets/welcome-bg.png")}
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
                    <ScrollView contentContainerStyle={[commonStyles.scrollView, commonStyles.centralise]}>
                        <CustomButton
                            image={require("../assets/welcome-button-google.png")}
                            text="Log in With Google"
                            size="small"
                            onPress={this.GoogleLogin}
                        />
                        <CustomButton
                            image={require("../assets/welcome-button-aws.png")}
                            text="Log in With Amazon"
                            size="small"
                            onPress={() => navigation.navigate("AWS Login")}
                        />
                        <CustomButton
                            image={require("../assets/welcome-button-azure.png")}
                            text="Log in With Azure AD"
                            size="small"
                            onPress={this._handlePressAsync}
                        />

                        <View style={commonStyles.divider} />

                        <CustomButton
                            image={require("../assets/welcome-button-kube.png")}
                            text="Upload Kubeconfig File"
                            size="small"
                            onPress={() => navigation.navigate("KubeconfigUpload")}
                        />
                        <CustomButton
                            image={require("../assets/welcome-button-kube.png")}
                            text="Add Kubeconfig Content"
                            size="small"
                            onPress={() => navigation.navigate("KubeconfigContent")}
                        />
                    </ScrollView>
                </View>
            </View>

            
        );
    }
}



