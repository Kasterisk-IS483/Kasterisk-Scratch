import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

import GoogleCloudApi from "../../api/GoogleCloudApi";
import AzureApi from "../../api/AzureApi";
import { commonStyles, commonPortraitStyles } from "../../utils/styles";
import CustomButton from "../../components/Buttons/CustomButton";

const assetsPath = "../../assets/";

/** Welcome Screen - when no cluster is added **/
export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      result: null,
    };
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
      return commonStyles;
    } else {
      return commonPortraitStyles;
    }
  }

  onLayout() {
    this.setState({ orientation: this.getOrientation() });
  }

  GoogleLogin = async () => {
    try {
      let googleLoginResult = await GoogleCloudApi.checkGoogleCredentials();
      if (googleLoginResult) {
          this.props.navigation.navigate("GoogleLogin");
      } else {
        Alert.alert("Login Failed", "Please try again.");
      }
    } catch (e) {
      // Alert.alert(e.message);
      Alert.alert(
        "Invalid Credentials",
        "Please enter valid email and password for your google account."
      );
    }
  };

  // errorCheck = async () => {
  //   try {
  //     this.props.navigation.navigate("Home");
  //   } catch (e) {
  //     Alert.alert(e.message);  
  //   }
  // };

  AzureLogin = async () => {
    try {
      let azureLoginResult = await AzureApi.checkAzureCredentials();
      if (azureLoginResult) {
          let a = await AsyncStorage.getItem("@azureCredentials")
          alert(a)
        this.props.navigation.navigate("WorkloadSummary");
      } else {
        Alert.alert("Login Failed", "Please try again.");
      }
    } catch (e) {
      alert(e.message);
      Alert.alert(
        "Invalid Credentials",
        "Please enter valid email and password for your azure account."
      );
    }
  };

  setWindow = () => {
    this.setState(Dimensions.get("window"));
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.setWindow);

    this.props.navigation.dispatch(state => {
      // Remove the home route from the stack
      const routes = state.routes.filter(r => r.name !== 'ChooseCluster');

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.setWindow);
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={this.getStyle().rowContainer}>
        <View style={this.getStyle().columnContainer}>
          <ImageBackground
            style={this.getStyle().columnContainer}
            source={require(assetsPath + "welcome-bg.png")}
            imageStyle={{ resizeMode: "cover" }}
          />
          <Image
            style={this.getStyle().bannerLogo}
            source={require(assetsPath + "kasterisk-logo.png")}
          />
          <Text style={this.getStyle().bannerDescription}>
            Access, manage and monitor your Kubernetes clusters.
          </Text>
        </View>

        <View style={this.getStyle().primaryContainer}>
          <ScrollView contentContainerStyle={[commonStyles.scrollContainer, commonStyles.centralise]}>
            <CustomButton
              image={require(assetsPath + "welcome-button-google.png")}
              text="Log in With Google"
              size="small"
              onPress={this.GoogleLogin}
            />
            <CustomButton
              image={require(assetsPath + "welcome-button-aws.png")}
              text="Log in With Amazon"
              size="small"
              onPress={() => navigation.navigate("AWSLogin")}
            />
            {/* <CustomButton
              image={require(assetsPath + "welcome-button-azure.png")}
              text="Log in With Azure AD"
              size="small"
              onPress={this.AzureLogin}
            /> */}
            {/* {this.state.result ? (
              <Text>{JSON.stringify(this.state.result)}</Text>
            ) : (
              <Text>Nothing to see here.</Text>
            )} */}

            <View style={commonStyles.divider} />

            <CustomButton
              image={require(assetsPath + "welcome-button-kube.png")}
              text="Upload Kubeconfig File"
              size="small"
              onPress={() => navigation.navigate("KubeconfigUpload")}
            />
            <CustomButton
              image={require(assetsPath + "welcome-button-kube.png")}
              text="Add Kubeconfig Content"
              size="small"
              onPress={() => navigation.navigate("KubeconfigContent")}
            />

            {/* <View style={commonStyles.divider} /> */}

            {/* <CustomButton
              image={require(assetsPath + "welcome-button-kube.png")}
              text="Choose Cluster"
              size="small"
              onPress={() => navigation.navigate("ChooseCluster")}
            /> */}
            {/* <CustomButton
              image={require(assetsPath + "welcome-button-kube.png")}
              text="Workload Summary"
              size="small"
              onPress={() => navigation.navigate("WorkloadSummary")}
              // onPress={this.errorCheck}
            /> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}
