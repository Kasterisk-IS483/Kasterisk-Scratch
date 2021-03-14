import React, { Component } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { spacings, colours, fonts, commonStyles } from "./utils/styles.js";
import WelcomeScreen from "./screens/WelcomeScreen";
import KubeconfigUploadScreen from "./screens/KubeconfigUploadScreen";
import KubeconfigContentScreen from "./screens/KubeconfigContentScreen";
import AWSLoginScreen from "./screens/AWSLoginScreen";
import WorkloadSummaryScreen from "./screens/WorkloadSummaryScreen";
import ChangeClusterScreen from "./screens/ChangeClusterScreen";
import WorkloadDeploymentScreen from "./screens/WorkloadDeploymentScreen";
import WorkloadReplicasetScreen from "./screens/WorkloadReplicasetScreen";
import WorkloadPodsScreen from "./screens/WorkloadPodsScreen";
import CustomDrawerComponent from "./components/Drawers/CustomDrawerComponent"

// const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
const Stack = createStackNavigator();
const screenOptions = {
  headerTintColor: "white",
  headerStyle: { backgroundColor: colours.primary },
  headerShown: true,
};
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
    };
  };

  workloadDeploymentScreen = () => {
    return (
      <WorkloadSummaryScreen index={1} />
    );
  };
  workloadReplicasetScreen = () => {
    return (
      <WorkloadSummaryScreen index={2} />
    );
  };
  workloadPodScreen = () => {
    return (
      <WorkloadSummaryScreen index={3} />
    );
  };

  HomeDrawer = ({ navigation }) => {
    return (<CustomDrawerComponent navigation={navigation} />)
  }

  render() {
    // if (this.state.checked) return null;
    // else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ChooseCluster" screenOptions={screenOptions}>
          <Stack.Screen name="ChooseCluster" component={ChangeClusterScreen} options={{ title: "Change Cluster", headerBackTitleVisible: false }} />
          <Stack.Screen name="HomeDrawer" component={this.HomeDrawer.bind(this)} options={{ headerShown: false }} />

          <Stack.Screen name="AddCluster" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AWSLogin" component={AWSLoginScreen} />
          <Stack.Screen name="KubeconfigUpload" component={KubeconfigUploadScreen} options={{ title: "Upload Kubeconfig File" }} />
          <Stack.Screen name="KubeconfigContent" component={KubeconfigContentScreen} options={{ title: "Add Kubeconfig Content" }} />

          <Stack.Screen name="WorkloadSummary" component={WorkloadSummaryScreen} options={{ title: "Workloads" }} />
          <Stack.Screen name="WorkloadDeployment" component={WorkloadDeploymentScreen} options={{ title: "Deployment" }} />
          <Stack.Screen name="WorkloadReplicaset" component={WorkloadReplicasetScreen} options={{ title: "Replicaset" }} />
          <Stack.Screen name="WorkloadPod" component={WorkloadPodsScreen} options={{ title: "Pod" }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    // }
  }
}
