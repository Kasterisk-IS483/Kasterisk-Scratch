import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen'
import { View, Image, SafeAreaView } from "react-native";

import { DrawerItemList } from '@react-navigation/drawer';
import WelcomeScreen from "./screens/WelcomeScreen";
import KubeconfigUploadScreen from "./screens/KubeconfigUploadScreen";
import KubeconfigContentScreen from "./screens/KubeconfigContentScreen";
import AWSLoginScreen from "./screens/AWSLoginScreen";
import WorkloadSummaryScreen from "./screens/WorkloadSummaryScreen";
import LoadingScreen from "./screens/LoadingScreen";
import TestScreen from "./screens/TestScreen";

import {
  spacings,
  colours,
  fonts,
  commonStyles,
} from "./utils/styles.js";

const AuthContext = React.createContext();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const screenOptions = {
  headerTintColor: "white",
  headerStyle: { backgroundColor: colours.primary },
  headerShown: true,
}

function Home() {


  return (
    <Drawer.Navigator initialRouteName="Welcome" screenOptions={screenOptions}
      drawerStyle={{ backgroundColor: "white" }}
      drawerContentOptions={{
        activeTintColor: colours.primary, /* font color for active screen label */
        activeBackgroundColor: colours.secondary, /* bg color for active screen */
        inactiveTintColor: 'black', /* Font color for inactive screens' labels */
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
                  height: '40%',
                  width: '100%'
                }}

              />
            </View>
            <DrawerItemList {...props} labelStyle={{ fontSize: fonts.md }} />
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen name="Home" component={WelcomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="WorkloadSummary" component={WorkloadSummaryScreen} options={{ title: "Workloads" }} />
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
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        {/* Welcome Screen Buttons */}
        <Stack.Screen name="AWS Login" component={AWSLoginScreen} />
        <Stack.Screen name="KubeconfigUpload" component={KubeconfigUploadScreen} options={{ title: "Upload Kubeconfig File" }} />
        <Stack.Screen name="KubeconfigContent" component={KubeconfigContentScreen} options={{ title: "Add Kubeconfig Content" }} />

        {/* Misc */}
        {/* <Stack.Screen name="Loading" component={LoadingScreen} options={{ title: "Loading" }} /> */}
        {/* <Stack.Screen name="Test" component={TestScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};