import React, { Component, useEffect, createContext } from "react";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import { View, Image, SafeAreaView, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalDropdown from "react-native-modal-dropdown";

import { spacings, colours, fonts, commonStyles } from "./utils/styles.js";
import { checkServerStatus } from "./api/KubeApi";
import WelcomeScreen from "./screens/WelcomeScreen";
import KubeconfigUploadScreen from "./screens/KubeconfigUploadScreen";
import KubeconfigContentScreen from "./screens/KubeconfigContentScreen";
import AWSLoginScreen from "./screens/AWSLoginScreen";
import WorkloadSummaryScreen from "./screens/WorkloadSummaryScreen";
import ClusterScreen from "./screens/ClusterScreen";
import WorkloadDeploymentScreen from "./screens/WorkloadDeploymentScreen";
import WorkloadReplicasetScreen from "./screens/WorkloadReplicasetScreen";
import WorkloadPodsScreen from "./screens/WorkloadPodsScreen";
import WorkloadSummaryApi from "./api/WorkloadSummaryApi";
import DeploymentScreen from "./screens/DeploymentScreen";
import PodsScreen from "./screens/PodScreen";
import ReplicasetScreen from "./screens/ReplicasetScreen";

import LoadingScreen from "./screens-backup/LoadingScreen";
import TestScreen from "./screens-backup/TestScreen";
import { render } from "react-dom";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const screenOptions = {
  headerTintColor: "white",
  headerStyle: { backgroundColor: colours.primary },
  headerShown: true,
};

export default class App extends Component {
  //1
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      // checked: true,
      namespaceLabels: ["All Namespaces"],
    };
    this.HomeDrawer = this.HomeDrawer.bind(this);
    // this.updateLabels = this.updateLabels.bind(this);
  };

  //Create function that updates labels in async storage
  // async updateLabels(namespaceLabels) {
  //   await AsyncStorage.setItem("@labelArray", namespaceLabels)
  // }


  //3 //6
  HomeDrawer = ({ navigation }) => {
    // console.log("HomeDrawer Rendered")
    return (
      <Drawer.Navigator
        initialRouteName="WorkloadSummary"
        screenOptions={screenOptions}
        drawerStyle={{ backgroundColor: "white" }}
        drawerContentOptions={{
          activeTintColor: colours.primary /* font color for active screen label */,
          activeBackgroundColor: colours.secondary /* bg color for active screen */,
          inactiveTintColor: "black" /* Font color for inactive screens' labels */,
        }}
        contentOptions={{
          labelStyle: fonts.md,
        }}
        drawerContent={(props) => {
          return (
            <SafeAreaView style={{ flex: 1 }}>
              <View
                style={{
                  height: 150,
                  margin: spacings.sm,
                  ...commonStyles.centralise,
                }}
              >
                <Image
                  source={require("./assets/kasterisk-logo.png")}
                  style={{
                    height: "40%",
                    width: "100%",
                  }}
                />
              </View>
              <DrawerItem
                labelStyle={{ fontSize: fonts.md, color: "black" }}
                label="Change Cluster"
                onPress={async () => {
                  let previousCluster = await AsyncStorage.getItem("@defaultCluster");
                  await AsyncStorage.removeItem("@defaultCluster");
                  navigation.replace("Cluster", { previous: previousCluster });
                }}
              />
              <DrawerItemList {...props} labelStyle={{ fontSize: fonts.md }} />
            </SafeAreaView>
          );
        }}
      >
        <Drawer.Screen
          name="WorkloadSummary"
          component={WorkloadSummaryScreen}
          options={{
            title: "Workloads",
            headerRight: () => (
              <ModalDropdown
                options={this.state.namespaceLabels}
                dropdownStyle={{ height: 40 * this.state.namespaceLabels.length, alignItems: "center" }}
                dropdownTextStyle={{ fontSize: 16, color: "black" }}
                textStyle={{ fontSize: fonts.sm, marginRight: spacings.sm, color: "white" }}
                customButton="⋮"
                defaultValue="All Namespaces▼"
                onSelect={async (index) =>
                  await AsyncStorage.setItem("@selectedNamespace", this.state.namespaceLabels[index])
                }
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Deployment"
          component={DeploymentScreen}
          options={{
            title: "Deployment",
            headerRight: () => (
              <ModalDropdown
                options={this.state.namespaceLabels}
                dropdownStyle={{ height: 40 * this.state.namespaceLabels.length, alignItems: "center" }}
                dropdownTextStyle={{ fontSize: 16, color: "black" }}
                textStyle={{ fontSize: fonts.sm, marginRight: spacings.sm, color: "white" }}
                customButton="⋮"
                defaultValue="All Namespaces▼"
                onSelect={async (index) =>
                  await AsyncStorage.setItem("@selectedNamespace", this.state.namespaceLabels[index])
                }
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Pods"
          component={PodsScreen}
          options={{
            title: "Pods",
            headerRight: () => (
              <ModalDropdown
                options={this.state.namespaceLabels}
                dropdownStyle={{ height: 40 * this.state.namespaceLabels.length, alignItems: "center" }}
                dropdownTextStyle={{ fontSize: 16, color: "black" }}
                textStyle={{ fontSize: fonts.sm, marginRight: spacings.sm, color: "white" }}
                customButton="⋮"
                defaultValue="All Namespaces▼"
                onSelect={async (index) =>
                  await AsyncStorage.setItem("@selectedNamespace", this.state.namespaceLabels[index])
                }
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Replicaset"
          component={ReplicasetScreen}
          options={{
            title: "Replicaset",
            headerRight: () => (
              <ModalDropdown
                options={this.state.namespaceLabels}
                dropdownStyle={{ height: 40 * this.state.namespaceLabels.length, alignItems: "center" }}
                dropdownTextStyle={{ fontSize: 16, color: "black" }}
                textStyle={{ fontSize: fonts.sm, marginRight: spacings.sm, color: "white" }}
                customButton="⋮"
                defaultValue="All Namespaces▼"
                onSelect={async (index) =>
                  await AsyncStorage.setItem("@selectedNamespace", this.state.namespaceLabels[index])
                }
              />
            ),
          }}
        />
        <Drawer.Screen name="Namespaces" component={LoadingScreen} options={{ title: "Namespaces" }} />
      </Drawer.Navigator>
    );
  }

  //4
  async componentDidMount() {
    SplashScreen.hide();
    this.setState({
      spinner: true,
    });
    try {
      let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
      console.log(defaultCluster);
      if (defaultCluster != null) {
        let serverStatus = await checkServerStatus(defaultCluster);
        console.log(serverStatus);
        if (serverStatus[0] == 200) {
          this.setState({
            // checked: false,
            namespaceLabels: await WorkloadSummaryApi.namespaceLabels2(),
          });
        } else {
          Alert.alert("Error", "Failed to contact cluster");
        }
      }
      console.log("componentDidMount");
    } catch (err) {
      Alert.alert("Server Check Failed", err.message);
    }
    this.setState({
      spinner: false,
    });
  }

  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  //2 //5
  render() {
    // if (this.state.checked) return null;
    // else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Cluster" screenOptions={screenOptions}>
            <Stack.Screen name="Cluster" component={ClusterScreen} options={{ headerShown: false }} />

          <Stack.Screen name="HomeDrawer" component={this.HomeDrawer} options={{ headerShown: false }} />
          <Stack.Screen name="Add Cluster" component={WelcomeScreen} options={{ headerShown: false }} />
          {/* Welcome Screen Buttons */}
          <Stack.Screen name="AWS Login" component={AWSLoginScreen} />
          <Stack.Screen name="KubeconfigUpload" component={KubeconfigUploadScreen} options={{ title: "Upload Kubeconfig File" }} />
          <Stack.Screen name="KubeconfigContent" component={KubeconfigContentScreen} options={{ title: "Add Kubeconfig Content" }} />

          {/* Misc */}
          <Stack.Screen name="WorkloadSummary" component={WorkloadSummaryScreen} />
          <Stack.Screen name="WorkloadDeployment" component={WorkloadDeploymentScreen} options={{ title: "Deployment" }} />
          <Stack.Screen name="WorkloadReplicaset" component={WorkloadReplicasetScreen} options={{ title: "Replicaset" }} />
          <Stack.Screen name="WorkloadPods" component={WorkloadPodsScreen} options={{ title: "Pod" }} />

          <Stack.Screen name="Deployment" component={DeploymentScreen} options={{ title: "Deployment" }} />
          <Stack.Screen name="Replicaset" component={ReplicasetScreen} options={{ title: "Replicaset" }} />
          <Stack.Screen name="Pods" component={PodsScreen} options={{ title: "Pods" }} />

        </Stack.Navigator>
      </NavigationContainer>
    );
    // }
  }
}
