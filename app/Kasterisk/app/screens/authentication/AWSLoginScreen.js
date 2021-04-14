import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import ModalSelector from 'react-native-modal-selector';
import AsyncStorage from "@react-native-async-storage/async-storage";

import AwsApi from "../../api/AwsApi";
import { AWSRegions } from "../../utils/constants";
import { commonStyles } from "../../utils/styles";
import SubmitButton from "../../components/Buttons/SubmitButton";
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

const AWSLoginScreen = ({ navigation }) => {
  const [loginState, setLoginState] = useState({
    accessKeyId: "",
    secretAccessKey: "",
  });
  const [region, setRegion] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  const AwsLogin = async () => {
    if (loginState.accessKeyId !== "" && loginState.secretAccessKey !== "") {
      // setShowSpinner(true);
    } else {
      Alert.alert("Invalid Entry", "Please enter Access Key ID and Secret Access Key.");
      return;
    }
    let isValidCredentials = false;
    try {
      isValidCredentials = await AwsApi.checkAwsCredentials(loginState, region);
    } catch (err) {
      Alert.alert("Invalid Credentials", "Please enter valid access keys and ensure you have correct permissions.");
      Alert.alert("Error Message", JSON.stringify(err));
      return;
    }
    if (!isValidCredentials) {
      setShowSpinner(false);
      Alert.alert("Invalid Credentials", "Please enter valid access keys and ensure you have correct permissions.");
      return;
    }
    let allClusters = await AwsApi.describeAllEksClusters(region, loginState);
    let userData = {
      name: loginState.accessKeyId,
      user: {
        awsCredentials: loginState,
        region: region,
      },
    };
    let newClusters = [];
    for (const aCluster of allClusters) {
      let clusterName = aCluster.name;
      let clusterIdentifier = clusterName + "::" + userData.name + "::aws";
      let clusterData = {
        name: aCluster.name,
        cluster: {
          server: aCluster.url,
          skipTLSVerify: false,
        },
      };
      let mergeData = {
        clusterIdentifier: clusterIdentifier,
        clusterData: clusterData,
        userData: userData,
        authType: "aws",
        serviceProvider: "aws"
      };

      try {
        let check = await AsyncStorage.getItem("@" + clusterIdentifier);
        if (check != null) {
          Alert.alert("Storage Error", "Cluster with name " + clusterName + " belonging to user " + userData.name + " already exists in storage, skipping.");
          continue;
        }
        await AsyncStorage.setItem("@" + clusterIdentifier, JSON.stringify(mergeData));
        newClusters.push(clusterIdentifier);
      } catch (e) {
        Alert.alert("Storage Error", "Failed to save cluster with name " + clusterName + " to storage");
      }
    }
    if (newClusters.length > 0) {
      let storedClusters = await AsyncStorage.getItem("@clusters");
      if (storedClusters != null) {
        let clusterArray = JSON.parse(storedClusters);
        newClusters = newClusters.concat(clusterArray);
      }
      await AsyncStorage.setItem("@clusters", JSON.stringify(newClusters));
    }
    setShowSpinner(false);
    navigation.navigate("ChooseCluster");
  };

  const AWSRegionList = () => {
    return (
      <ModalSelector
        data={AWSRegions}
        keyExtractor={item => item.value}
        labelExtractor={item => item.label}
        initValue={"Select a region"}
        animationType={"fade"}
        onChange={(option) => setRegion(option.value)}
      />
    );
  };

  return (
    <View style={commonStyles.whiteContainer}>
      <SpinnerOverlay showSpinner={showSpinner} />
      <ScrollView contentContainerStyle={commonStyles.scrollContainer, commonStyles.formContentContainer}>

        <View style={commonStyles.formSectionContainer}>
          <Text style={commonStyles.formSectionHeader}>Access Key Information:</Text>
          <TextInput 
            onChangeText={(text) => setLoginState({ ...loginState, accessKeyId: text })} 
            style={commonStyles.formContent} 
            label="Access Key ID" 
            placeholder="Enter Access Key ID Here" 
          />
          <TextInput
            onChangeText={(text) => setLoginState({ ...loginState, secretAccessKey: text })}
            style={commonStyles.formContent}
            label="Secret Access Key"
            placeholder="Enter Secret Access Key Here"
          />          
        </View>

        <View style={commonStyles.formSectionContainer}>
          <Text style={commonStyles.formSectionHeader}>Region Information:</Text>
          <View style={commonStyles.formContent}>{AWSRegionList()}</View>
        </View>

        <SubmitButton text="Sign In" onPress={() => {
          try {
            AwsLogin();
          } catch (e) {
            Alert.alert("Error", e.message);
          }
        }} />

      </ScrollView>
    </View>
  );
};

export default React.memo(AWSLoginScreen);
