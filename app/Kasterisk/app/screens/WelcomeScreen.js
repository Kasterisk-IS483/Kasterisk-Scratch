import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  Alert,
  Linking,
} from "react-native";

import GoogleCloudApi from "../api/GoogleCloudApi";
import AzureApi from "../api/AzureApi";
import {
  commonStyles,
  landscapeStyles,
  portraitStyles,
} from "../utils/styles.js";
import CustomButton from "../components/Buttons/CustomButton";
import { useNavigation, CommonActions } from "@react-navigation/native";


export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      result: null,
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

  // GoogleLogin = async () => {
  //   try {
  //     let googleLoginResult = await GoogleCloudApi.checkGoogleCredentials();
  //     if (googleLoginResult) {
  //         let a = await AsyncStorage.getItem("@googleCredentials")
  //         alert(a)
  //       this.props.navigation.navigate("WorkloadSummary");
  //     } else {
  //       Alert.alert("Login Failed", "Please try again.");
  //     }
  //   } catch (e) {
  //     Alert.alert(e.message);
  //     // Alert.alert(
  //     //   "Invalid Credentials",
  //     //   "Please enter valid email and password for your google account."
  //     // );
  //   }
  // };

  // errorCheck = async () => {
  //   try {
  //     this.props.navigation.navigate("Home");
  //   } catch (e) {
  //     Alert.alert(e.message);  
  //   }
  // };

  // AzureLogin = async () => {
  //   try {
  //     let azureLoginResult = await AzureApi.checkAzureCredentials();
  //     if (azureLoginResult) {
  //         let a = await AsyncStorage.getItem("@azureCredentials")
  //         alert(a)
  //       this.props.navigation.navigate("WorkloadSummary");
  //     } else {
  //       Alert.alert("Login Failed", "Please try again.");
  //     }
  //   } catch (e) {
  //     alert(e.message);
  //     Alert.alert(
  //       "Invalid Credentials",
  //       "Please enter valid email and password for your azure account."
  //     );
  //   }
  // };

  componentDidMount() {
    this.props.navigation.dispatch(state => {
      // Remove the home route from the stack
      const routes = state.routes.filter(r => r.name !== 'Cluster');
    
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }


  render() {
    const { navigation } = this.props;

    return (
      <View style={this.getStyle().panelContainer}>
        <View style={this.getStyle().welcomeBannerContainer}>
          <ImageBackground
            style={this.getStyle().welcomeBannerContainer}
            source={require("../assets/welcome-bg.png")}
            imageStyle={{ resizeMode: "cover" }}
          />
          <Image
            style={this.getStyle().welcomeBannerLogo}
            source={require("../assets/kasterisk-logo.png")}
          />
          <Text style={this.getStyle().welcomeBannerDescription}>
            Access, manage and monitor your Kubernetes clusters.
          </Text>
        </View>

        <View style={this.getStyle().welcomeButtonsContainer}>
          <ScrollView
            contentContainerStyle={[
              commonStyles.scrollView,
              commonStyles.centralise,
            ]}
          >
            {/* <CustomButton
              image={require("../assets/welcome-button-google.png")}
              text="Log in With Google"
              size="small"
              onPress={this.GoogleLogin}
            /> */}
            <CustomButton
              image={require("../assets/welcome-button-aws.png")}
              text="Log in With Amazon"
              size="small"
              onPress={() => navigation.navigate("AWS Login")}
            />
            {/* <CustomButton
              image={require("../assets/welcome-button-azure.png")}
              text="Log in With Azure AD"
              size="small"
              onPress={this.AzureLogin}
            /> */}
            {/* {this.state.result ? (
              <Text>{JSON.stringify(this.state.result)}</Text>
            ) : (
              <Text>Nothing to see here.</Text>
            )} */}

            {/* <View style={commonStyles.divider} /> */}

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

            <View style={commonStyles.divider} />

            <CustomButton
              image={require("../assets/welcome-button-kube.png")}
              text="Cluster"
              size="small"
              onPress={() => navigation.navigate("Cluster")}
            />
            <CustomButton
              image={require("../assets/welcome-button-kube.png")}
              text="Workload Summary"
              size="small"
              onPress={() => navigation.navigate("WorkloadSummary")}
              // onPress={this.errorCheck}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
