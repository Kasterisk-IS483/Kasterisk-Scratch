import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import KubeconfigUploadScreen from "./app/screens/KubeconfigUploadScreen";
import KubeconfigContentScreen from "./app/screens/KubeconfigContentScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="KubeconfigUpload" component={KubeconfigUploadScreen} options={ {title: "Upload Kubeconfig File" }} />
        <Stack.Screen name="KubeconfigContent" component={KubeconfigContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;