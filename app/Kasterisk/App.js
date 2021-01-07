import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import KubeconfigUploadScreen from "./app/screens/KubeconfigUploadScreen";
import KubeconfigContentScreen from "./app/screens/KubeconfigContentScreen";
import AWSLoginScreen from "./app/screens/AWSLoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import { primaryCol, whiteCol } from "./app/styles.js";
import 'localstorage-polyfill';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { 
            backgroundColor: primaryCol
          }, 
          headerTintColor: whiteCol
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="KubeconfigUpload" component={KubeconfigUploadScreen} options={{ title: "Upload Kubeconfig File" }} />
        <Stack.Screen name="KubeconfigContent" component={KubeconfigContentScreen} options={{ title: "Add Kubeconfig Content" }} />
        <Stack.Screen name="AWS Login" component={AWSLoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};