import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'

import DeploymentApi from "../api/DeploymentApi.js";
import { commonStyles } from "../utils/styles.js";
import ActionButton from "../components/Buttons/ActionButton";

export default function TestScreen() {

  // const [namespaceState, setNamespaceState] = useState({
  // namespace: ''
  // });

  // const [podState, setPodState] = useState({
  //   pod: ''
  // });

  // const getCert1 = async () => {
  //   cert1 = await SecureStore.getItemAsync("certificate-authority-data");
  // }

  // const getCert2 = async () => {
  //   cert2 = await SecureStore.getItemAsync("client-key-data");
  // }

  // works
  const listAllNamespaceTest = async () => {
    try {
      let namespace1 = await (
        DeploymentApi.readDeploymentScale('default', 'nginx-deployment')
      );
      namespace1 = JSON.stringify(namespace1);
      alert(namespace1)

      setNamespaceState({ ...namespaceState, namespace: namespace1 });
      Alert.alert(namespace1, namespaceState.namespace);
    } catch (err) {
      console.log(err);
      Alert.alert('Invalid Credentials', err.message);
    }
  }


  return (
    <View style={commonStyles.whiteContainer} >
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
        <Text style={commonStyles.heading}>test</Text>

        <ActionButton
          text="Show All Namespaces"
          onPress={() => listAllNamespaceTest()}
        />

        <Text style={commonStyles.heading}>
          Welcome, {namespaceState.namespace}
        </Text>

      </ScrollView>
    </View>
  );

}

