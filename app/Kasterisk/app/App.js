import React, { Component, useEffect, createContext } from "react";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import { View, Image, SafeAreaView, Alert, Text } from "react-native";
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
import ChangeClusterScreen from "./screens/ChangeClusterScreen";
import WorkloadDeploymentScreen from "./screens/WorkloadDeploymentScreen";
import WorkloadReplicasetScreen from "./screens/WorkloadReplicasetScreen";
import WorkloadPodsScreen from "./screens/WorkloadPodsScreen";
import WorkloadSummaryApi from "./api/WorkloadSummaryApi";

// const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
      // checked: true,
      namespaceLabels: ["All Namespaces"],
      selectedNamespace: "All Namespaces",
      selectedValue:""
    };
    this.updateState = this.updateState.bind(this);
    // this.HomeDrawer = this.HomeDrawer.bind(this);
    // this.updateLabels = this.updateLabels.bind(this);
  };

  workloadDeploymentScreen = () => {
    return (
      <WorkloadSummaryScreen index={1}/>
    );
  };
  workloadReplicasetScreen = () => {
    return (
      <WorkloadSummaryScreen index={2}/>
    );
  };
  workloadPodScreen = () => {
    return (
      <WorkloadSummaryScreen index={3}/>
    );
  };

  filter = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <ModalDropdown
          options={this.state.namespaceLabels}
          dropdownStyle={{ height: 40 * this.state.namespaceLabels.length, alignItems: "center" }}
          dropdownTextStyle={{ fontSize: fonts.sm, color: "black" }}
          textStyle={{ fontSize: fonts.sm, color: "white", marginRight: spacings.xxs }}
          customButton="⋮"
          defaultValue={this.state.selectedNamespace}
          onSelect={async (index) => this.updateState(this.state.namespaceLabels[index])}
        />
        <Text style={{ color: "white", marginRight: spacings.sm }}>▼</Text>
      </View>
    );
  };

  async updateState(selectedNamespace) {
    let selectedValue = "";
    if(selectedNamespace!="All Namespaces"){
      selectedValue = selectedNamespace;
    }
    await AsyncStorage.setItem("@selectedValue", selectedValue);
    this.setState({
      selectedNamespace: selectedNamespace,
      selectedValue: selectedValue,
    })
  }

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
          inactiveTintColor: "black" /* Font color for inactive screens" labels */,
        }}
        contentOptions={{ labelStyle: fonts.md }}
        drawerContent={(props) => {
          return (
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{
                height: 150,
                margin: spacings.sm,
                ...commonStyles.centralise,
              }}>
                <Image
                  source={require("./assets/kasterisk-logo.png")}
                  style={{ height: "40%", width: "100%" }}
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
        {/* <Drawer.Screen 
          name="Cluster" 
          component={ChangeClusterScreen} 
          options={{ title: "Change Cluster" }} 
          onPress={async () => {
            let previousCluster = await AsyncStorage.getItem("@defaultCluster");
            await AsyncStorage.removeItem("@defaultCluster");
            navigation.replace("Cluster", { previous: previousCluster });
          }}
        /> */}
        <Drawer.Screen
          name="WorkloadSummary"
          component={WorkloadSummaryScreen}
          options={{ drawerLabel: "Workload Overview", title: "Workloads", headerRight: this.filter }}
        />
        <Drawer.Screen
          name="WorkloadDeployments"
          component={this.workloadDeploymentScreen}
          options={{ drawerLabel: "Deployment", title: "Workloads", headerRight: this.filter }}
        />
         <Drawer.Screen
          name="WorkloadReplicasets"
          component={this.workloadReplicasetScreen}
          options={{ drawerLabel: "Replicaset", title: "Workloads", headerRight: this.filter }}
        />
         <Drawer.Screen
          name="WorkloadPods"
          component={this.workloadPodScreen}
          options={{ drawerLabel: "Pod", title: "Workloads", headerRight: this.filter }}
          />
      </Drawer.Navigator>
    );
  }


  async componentDidMount() {
    SplashScreen.hide();
    this.setState({
      spinner: true,
    });
    try {
      let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
      if (defaultCluster != null) {
        let serverStatus = await checkServerStatus(defaultCluster);
        if (serverStatus[0] == 200) {
          this.setState({
            // checked: false,
            namespaceLabels: await WorkloadSummaryApi.namespaceLabels2(),
          });
          await AsyncStorage.setItem("@selectedValue", "")
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

  render() {
    // if (this.state.checked) return null;
    // else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Cluster" screenOptions={screenOptions}>
          <Stack.Screen name="Cluster" component={ChangeClusterScreen} options={{ title: "Change Cluster" }} />
          <Stack.Screen name="HomeDrawer" component={this.HomeDrawer.bind(this)} options={{ headerShown: false }} />

          <Stack.Screen name="Add Cluster" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AWS Login" component={AWSLoginScreen} />
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
