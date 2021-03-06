import React, { useEffect, createContext } from "react";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import { View, Image, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalDropdown from 'react-native-modal-dropdown';

import { spacings, colours, fonts, commonStyles } from "./utils/styles.js";
import WelcomeScreen from "./screens/WelcomeScreen";
import KubeconfigUploadScreen from "./screens/KubeconfigUploadScreen";
import KubeconfigContentScreen from "./screens/KubeconfigContentScreen";
import AWSLoginScreen from "./screens/AWSLoginScreen";
import WorkloadSummaryScreen from "./screens/WorkloadSummaryScreen";
import ClusterScreen from "./screens/ClusterScreen";
import WorkloadDeploymentScreen from "./screens/WorkloadDeploymentScreen";
import WorkloadReplicasetScreen from "./screens/WorkloadReplicasetScreen";
import WorkloadPodsScreen from "./screens/WorkloadPodsScreen";

import LoadingScreen from "./screens-backup/LoadingScreen";
import TestScreen from "./screens-backup/TestScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const screenOptions = {
  headerTintColor: "white",
  headerStyle: { backgroundColor: colours.primary },
  headerShown: true,
};

const menuArray = ["test 1", "test 2"]

function HomeDrawer({ navigation }) {
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
        labelStyle: fonts.md
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
              labelStyle={{ fontSize: fonts.md, color:"black" }}
              label="Change Cluster"
              onPress={async () => {
                let previousCluster = await AsyncStorage.getItem('@defaultCluster');
                await AsyncStorage.removeItem("@defaultCluster");
                navigation.replace("Cluster", {previous: previousCluster});
              }}
            />
            <DrawerItemList {...props}  labelStyle={{ fontSize: fonts.md}}/>
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen name="WorkloadSummary" component={WorkloadSummaryScreen} options={{ 
        title: "Workloads" , 
        headerRight:() =>	<ModalDropdown options={menuArray} 
          dropdownStyle={{ height: 40 * menuArray.length, alignItems: 'center' }}
          dropdownTextStyle={{ fontSize: 16, color: 'black' }}
          textStyle={{ fontSize: fonts.sm, marginRight: spacings.sm, color: 'white' }}
          customButton="⋮"
          defaultValue="All Namespaces"
			  />
       }} />
      <Drawer.Screen name="Namespaces" component={LoadingScreen} options={{ title: "Namespaces" }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cluster" screenOptions={screenOptions}>
        <Stack.Screen name="Cluster" component={ClusterScreen} options={{ headerShown: false }} />

        <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="Add Cluster" component={WelcomeScreen} options={{ headerShown: false }} />
        {/* Welcome Screen Buttons */}
        <Stack.Screen name="AWS Login" component={AWSLoginScreen} />
        <Stack.Screen name="KubeconfigUpload" component={KubeconfigUploadScreen} options={{ title: "Upload Kubeconfig File" }} />
        <Stack.Screen name="KubeconfigContent" component={KubeconfigContentScreen} options={{ title: "Add Kubeconfig Content" }} />

        {/* Misc */}
        <Stack.Screen name="WorkloadSummary" component={WorkloadSummaryScreen} />
        <Stack.Screen name="WorkloadDeployment" component={WorkloadDeploymentScreen} options={{ title: "Deployment" }}/>
        <Stack.Screen name="WorkloadReplicaset" component={WorkloadReplicasetScreen} options={{ title: "Replicaset" }}/>
        <Stack.Screen name="WorkloadPods" component={WorkloadPodsScreen} options={{ title: "Pods" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
