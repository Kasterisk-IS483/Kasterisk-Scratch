import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import KubeconfigUploadScreen from "./screens/KubeconfigUploadScreen";
import KubeconfigContentScreen from "./screens/KubeconfigContentScreen";
import AWSLoginScreen from "./screens/AWSLoginScreen";
import WorkloadSummaryScreen from "./screens/WorkloadSummaryScreen";
import TestScreen from "./screens/TestScreen";
import LoadingScreen from "./screens/LoadingScreen";

import { colours } from "./utils/styles";

const Stack = createStackNavigator();

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colours.primary },
          headerTintColor: "white"
      }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AWS Login" component={AWSLoginScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Workload Summary" component={WorkloadSummaryScreen} />
        <Stack.Screen name="KubeconfigUpload" component={KubeconfigUploadScreen} options={{title: "Upload Kubeconfig File"}} />
        <Stack.Screen name="KubeconfigContent" component={KubeconfigContentScreen} options={{title: "Add Kubeconfig Content"}} />
        <Stack.Screen name="Loading" component={LoadingScreen} options={{title: "Loading"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};