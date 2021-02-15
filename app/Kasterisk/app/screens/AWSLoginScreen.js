import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AwsApi from "../api/AwsApi";
import { AWSRegions } from "../utils/constants";
import { saveCredentials } from "./../utils/constants";
import { colours, spacings, commonStyles } from "../utils/styles.js";
import SubmitButton from "../components/Buttons/SubmitButton";

const AWSLoginScreen = ({ navigation }) => {
  const [loginState, setLoginState] = useState({
    accessKeyId: "",
    secretAccessKey: "",
  });
  const [region, setRegion] = useState();
  const [spinner, setSpinner] = useState(false);

  const AwsLogin = async () => {
    if (loginState.accessKeyId !== "" && loginState.secretAccessKey !== "") {
      setSpinner(true);
    } else {
      Alert.alert("Invalid Entry", "Please enter Access Key ID and Secret Access Key.");
      return;
    }
    let isValidCredentials = false;
    try {
      isValidCredentials = await AwsApi.checkAwsCredentials(loginState, region);
    } catch (err) {
      Alert.alert("Invalid Credentials", "Please enter valid access keys and ensure you have correct permissions.");
      return;
    }
    if (!isValidCredentials) {
      setSpinner(false);
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
      let clusterData = {
        name: aCluster.name,
        cluster: {
          server: aCluster.url,
          skipTLSVerify: false,
        },
      };
      let mergeData = {
        clusterData: clusterData,
        userData: userData,
        authType: "aws",
      };
      let clusterName = aCluster.name;
      try {
        let check = await AsyncStorage.getItem("@" + clusterName);
        if (check != null) {
          Alert.alert('Storage Error', "Cluster with name " + clusterName + " already exists in storage, skipping.");
          continue;
        }
        await AsyncStorage.setItem('@' + clusterName, JSON.stringify(mergeData));
      } catch (e) {
        Alert.alert('Storage Error', "Failed to save cluster with name " + clusterName + " to storage");
      }
      newClusters.push('@' + clusterName)
    }
    let storedClusters = await AsyncStorage.getItem("@clusters");
    if (storedClusters != null) {
      let clusterArray = JSON.parse(storedClusters);
      newClusters.concat(clusterArray);
    }
    await Promise.all([
      await saveCredentials("@clusters", JSON.stringify(newClusters))
    ]);
    setSpinner(false);
    navigation.navigate("Cluster");
    }
    

  const AWSRegionList = () => {
    return (
      <Picker selectedValue={region} onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}>
        {AWSRegions.map((_item, _index) => (
          <Picker.Item label={_item.label} value={_item.value} key={_item.value} />
        ))}
      </Picker>
    );
  };

  return (
    <View style={commonStyles.whiteContainer}>
      <Spinner visible={spinner} textContent="Loading..." textStyle={{ color: "#FFF" }} />
      <ScrollView contentContainerStyle={commonStyles.scrollView}>
        <Text style={commonStyles.formSectionHeaader}>Access Key Information:</Text>
        <TextInput onChangeText={(text) => setLoginState({ ...loginState, accessKeyId: text })} style={commonStyles.formContent} label="Access Key ID" placeholder="Enter Access Key ID Here" />
        <TextInput
          onChangeText={(text) => setLoginState({ ...loginState, secretAccessKey: text })}
          label="Secret Access Key"
          style={commonStyles.formContent}
          placeholder="Enter Secret Access Key Here"
        />
        <Text
          style={[
            commonStyles.formSectionHeaader,
            {
              marginHorizontal: spacings.lg,
              paddingTop: spacings.lg,
            },
          ]}
        >
          Region Information:
        </Text>
        <View
          style={[
            commonStyles.formContent,
            {
              borderWidth: 1,
              borderColor: colours.grey,
              marginTop: spacings.md,
            },
          ]}
        >
          {AWSRegionList()}
        </View>
        <SubmitButton text="Sign In" onPress={() => {
          try {
            AwsLogin()
        } catch (e) {
          Alert.alert("Error", e.message)
        }}} />
      </ScrollView>
    </View>
  );
};

export default React.memo(AWSLoginScreen);
