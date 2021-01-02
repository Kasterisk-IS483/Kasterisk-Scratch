import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import KubeconfigUploadScreen from "./app/screens/KubeconfigUploadScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="KubeconfigUpload" component={KubeconfigUploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;