import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import KubeconfigUploadScreen from "./app/screens/KubeconfigUploadScreen";
import KubeconfigContentScreen from "./app/screens/KubeconfigContentScreen";
import AWSLoginScreen from "./app/screens/AWSLoginScreen";
import WorkloadSummaryScreen from "./app/screens/WorkloadSummaryScreen";
import TestScreen from "./app/screens/TestScreen";
import { colours } from "./app/utils/styles.js";
import ActionButton from "./app/components/ActionButton";

import { Appbar } from "react-native-paper";

const Stack = createStackNavigator();

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colours.primary
          },
          headerTintColor: 'white'
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AWS Login" component={AWSLoginScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="Workload Summary" component={WorkloadSummaryScreen} />
        <Stack.Screen
          name="KubeconfigUpload"
          component={KubeconfigUploadScreen}
          options={{
            title: 'Upload Kubeconfig File',
            headerRight: () => <Appbar.Action icon="check" color="white" onPress={() => {}} />,
          }}
        />
        <Stack.Screen
          name="KubeconfigContent"
          component={KubeconfigContentScreen}
          options={{
            title: "Add Kubeconfig Content",
            headerRight: () => <Appbar.Action icon="check" color="white" onPress={() => {}} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

