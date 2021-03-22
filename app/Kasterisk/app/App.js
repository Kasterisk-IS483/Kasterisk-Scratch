import React, { Component } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Image, SafeAreaView, Alert, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";
import ModalDropdown from "react-native-modal-dropdown";
// API 
import { checkServerStatus } from "./api/KubeApi";
import WorkloadSummaryApi from "./api/WorkloadSummaryApi";
// styling
import { spacings, colours, fonts, commonStyles } from "./utils/styles.js";
// authentication 
import WelcomeScreen from "./screens/authentication/WelcomeScreen";
import KubeconfigUploadScreen from "./screens/authentication/KubeconfigUploadScreen";
import KubeconfigContentScreen from "./screens/authentication/KubeconfigContentScreen";
import AWSLoginScreen from "./screens/authentication/AWSLoginScreen";
// workload 
import WorkloadSummaryScreen from "./screens/workload/WorkloadSummaryScreen";
import WorkloadDeploymentScreen from "./screens/workload/WorkloadDeploymentScreen";
import WorkloadReplicasetScreen from "./screens/workload/WorkloadReplicasetScreen";
import WorkloadPodsScreen from "./screens/workload/WorkloadPodsScreen";
import WorkloadNodeScreen from "./screens/workload/WorkloadNodeScreen";
// list 
import NodesListScreen from "./screens/list/NodesListScreen";
import DeploymentListScreen from "./screens/list/DeploymentListScreen.js";
import ReplicasetListScreen from "./screens/list/ReplicasetListScreen.js";
import PodsListScreen from "./screens/list/PodsListScreen.js";
// multicuster
import ChangeClusterScreen from "./screens/authentication/ChangeClusterScreen";


// const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const screenOptions = {
  headerTintColor: "white",
  headerStyle: { backgroundColor: colours.primary },
  headerShown: true,
};

export default class App extends Component {
  constructor(props) {
    console.log("App.js constructor");
    super(props);
    this.state = {
      spinner: false,
      namespaceLabels: ["All Namespaces"],
      selectedNamespace: "All Namespaces",
      selectedValue: "",
    };
    console.log("/App.js constructor");
  }

  // workloadDeploymentTab = () => {
  //   return <WorkloadSummaryScreen index={1} />;
  // };
  // workloadReplicasetTab = () => {
  //   return <WorkloadSummaryScreen index={2} />;
  // };
  // workloadPodTab = () => {
  //   return <WorkloadSummaryScreen index={3} />;
  // };

  filter = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <ModalDropdown
          options={this.state.namespaceLabels}
          dropdownStyle={{
            height: 40 * this.state.namespaceLabels.length,
            alignItems: "center",
          }}
          dropdownTextStyle={{ fontSize: fonts.sm, color: "black" }}
          textStyle={{
            fontSize: fonts.sm,
            color: "white",
            marginRight: spacings.xxs,
          }}
          customButton="⋮"
          defaultValue={this.state.selectedNamespace}
          onSelect={async (index) =>
            this.updateState(this.state.namespaceLabels[index])
          }
        />
        <Text style={{ color: "white", marginRight: spacings.sm }}>▼</Text>
      </View>
    );
  };

  async updateState(selectedNamespace) {
    let selectedValue = "";
    if (selectedNamespace != "All Namespaces") {
      selectedValue = selectedNamespace;
    }
    await AsyncStorage.setItem("@selectedValue", selectedValue);
    this.setState({
      selectedNamespace: selectedNamespace,
      selectedValue: selectedValue,
    });
  }

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
          await AsyncStorage.setItem("@selectedValue", "");
          //Not working
          this.setState({
            namespaceLabels: await WorkloadSummaryApi.namespaceLabels(),
          });
        } else {
          Alert.alert("Error", "Failed to contact cluster");
        }
      }
      console.log("App.js mounted");
    } catch (err) {
      Alert.alert("Server Check Failed", err.message);
    }
    this.setState({
      spinner: false,
    });
  }

  HomeDrawer = ({ route, navigation }) => {
    const { namespaceLabels } = route.params;
    console.log(namespaceLabels);
    return (
      <Drawer.Navigator
        {...console.log("App.js HomeDrawer")}
        initialRouteName="WorkloadSummary"
        screenOptions={screenOptions}
        drawerStyle={{ backgroundColor: "white" }}
        drawerContentOptions={{
          activeTintColor:
            colours.primary /* font color for active screen label */,
          activeBackgroundColor:
            colours.secondary /* bg color for active screen */,
          inactiveTintColor:
            "black" /* Font color for inactive screens" labels */,
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
                  let previousCluster = await AsyncStorage.getItem(
                    "@defaultCluster"
                  );
                  await AsyncStorage.removeItem("@defaultCluster");
                  props.navigation.replace("ChooseCluster", {
                    previous: previousCluster,
                  });
                }}
                icon={() => (
                  <Image
                    source={require("./assets/DrawerIcons/cluster_icon.png")}
                    style={commonStyles.icon}
                  />
                )}
                options={{ headerRight: this.filter }}
              />

              {/* <Text style={{ fontSize: fonts.md, paddingLeft: spacings.md, spacingVertical: spacing.md }}>Workloads</Text>*/}
              {/* <View style={commonStyles.centralise}><View style={{ borderWidth: 1, color: "black", width: "90%" }}></View></View> */}

              <DrawerItemList {...props} labelStyle={{ fontSize: fonts.md }} />
            </SafeAreaView>
          );
        }}
      >
        <Drawer.Screen
          name="WorkloadSummary"
          component={WorkloadSummaryScreen}
          options={{
            drawerLabel: "Workload Overview",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/cluster_icon.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Workloads",
            headerRight: this.filter,
          }}
        />
        <Drawer.Screen
          name="DeploymentList"
          component={DeploymentListScreen}
          options={{
            drawerLabel: "Deployments",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/deployment_icon.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Deployment List",
            headerRight: this.filter,
          }}
        />
        <Drawer.Screen
          name="ReplicasetList"
          component={ReplicasetListScreen}
          options={{
            drawerLabel: "Replicasets",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/replicaset_icon.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Replicaset List",
            headerRight: this.filter,
          }}
        />
        <Drawer.Screen
          name="PodsList"
          component={PodsListScreen}
          options={{
            drawerLabel: "Pods",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/pod_icon.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Pods List",
            headerRight: this.filter,
          }}
        />
        <Drawer.Screen
          name="NodesList"
          component={NodesListScreen}
          options={{
            drawerLabel: "Nodes",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/nodes_icon.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Nodes",
            headerRight: this.filter,
          }}
        />
      </Drawer.Navigator>
    );
  };

  render() {
    console.log("App.js render");
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ChooseCluster"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="ChooseCluster"
            component={ChangeClusterScreen}
            options={{ title: "Change Cluster", headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="HomeDrawer"
            component={this.HomeDrawer.bind(this)}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AddCluster"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AWSLogin"
            component={AWSLoginScreen}
            options={{ title: "AWS Login" }}
          />
          <Stack.Screen
            name="KubeconfigUpload"
            component={KubeconfigUploadScreen}
            options={{ title: "Upload Kubeconfig File" }}
          />
          <Stack.Screen
            name="KubeconfigContent"
            component={KubeconfigContentScreen}
            options={{ title: "Add Kubeconfig Content" }}
          />

          <Stack.Screen
            name="WorkloadSummary"
            component={WorkloadSummaryScreen}
            options={{ title: "Workloads" }}
          />
          <Stack.Screen
            name="WorkloadDeployment"
            component={WorkloadDeploymentScreen}
            options={{ title: "Deployment" }}
          />
          <Stack.Screen
            name="WorkloadReplicaset"
            component={WorkloadReplicasetScreen}
            options={{ title: "Replicaset" }}
          />
          <Stack.Screen
            name="WorkloadPod"
            component={WorkloadPodsScreen}
            options={{ title: "Pod" }}
          />
          <Stack.Screen
            name="WorkloadNode"
            component={WorkloadNodeScreen}
            options={{ title: "Node" }}
          />

          <Stack.Screen
            name="Nodes"
            component={NodesListScreen}
            options={{ title: "Nodes" }}
          />
          <Stack.Screen
            name="DeploymentList"
            component={DeploymentListScreen}
            options={{ title: "DeploymentList" }}
          />
          <Stack.Screen
            name="ReplicasetList"
            component={ReplicasetListScreen}
            options={{ title: "ReplicasetList" }}
          />
          <Stack.Screen
            name="PodsList"
            component={PodsListScreen}
            options={{ title: "PodsList" }}
          />
        </Stack.Navigator>
        {console.log("/App.js render")}
      </NavigationContainer>
    );
  }
}
