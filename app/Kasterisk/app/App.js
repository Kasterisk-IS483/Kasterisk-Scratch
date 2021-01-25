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

import { colours } from "./utils/styles";
import ActionButton from "./components/ActionButton";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colours.primary },
          headerTintColor: 'white'
      }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AWS Login" component={AWSLoginScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="Workload Summary" component={WorkloadSummaryScreen} />
        <Stack.Screen
          name="KubeconfigUpload"
          component={KubeconfigUploadScreen}
          options={{
            title: 'Upload Kubeconfig File',
            headerRight: () => <ActionButton
              text="Submit"
              onPress={() => alert('test!')}
            />,
          }}
        />
        <Stack.Screen
          name="KubeconfigContent"
          component={KubeconfigContentScreen}
          options={{
            title: "Add Kubeconfig Content",
            headerRight: () => <ActionButton
              text="Submit"
              onPress={() => this.KubeconfigContentScreen.ContentUpload()}
            />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};