import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import ModalSelector from 'react-native-modal-selector';
import AsyncStorage from "@react-native-async-storage/async-storage";

import GoogleCloudApi from "../../api/GoogleCloudApi";
import { checkClusterIdentifier, addToClusterList, getMergeData } from "../../utils/constants";
import { commonStyles } from "../../utils/styles";
import SubmitButton from "../../components/Buttons/SubmitButton";
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

const GoogleLoginScreen = ({ navigation }) => {
  const [refreshToken, setRefreshToken] = useState();
  const [projectsList, setProjectsList] = useState();
  const [projectId, setProjectId] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  const GoogleLogin = async () => {
    if (projectId !== "") {
      try {
        let allClusters = await GoogleCloudApi.fetchGkeClusters(projectId, refreshToken);
        if (allClusters.length){
          let userData = {
            name: projectId,
            user: {
              gcpCredentials: refreshToken,
            },
          };
          let newClusters = [];
          for (const aCluster of allClusters) {
            let clusterName = aCluster.name;
            let clusterIdentifier = clusterName + "::" + userData.name + "::google";
            let clusterData = {
              name: aCluster.name,
              cluster: {
                server: aCluster.url,
                skipTLSVerify: false,
              },
            };
            // let mergeData = {
            //   clusterIdentifier: clusterIdentifier,
            //   clusterData: clusterData,
            //   userData: userData,
            //   authType: "google",
            //   serviceProvider: "google"
            // };
            let mergeData = getMergeData(clusterIdentifier, clusterData, userData, "google", "google");
            let result = await checkClusterIdentifier(clusterIdentifier, clusterName, userData.name, mergeData);
            if (result){
              newClusters.push(clusterIdentifier);
            }
          }
          await addToClusterList(newClusters);
        } else {
          Alert.alert("Invalid Cluster", "There is no cluster in selected project.");
          return;
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      Alert.alert("Invalid Entry", "Please select a project.");
      return;
    }
    setShowSpinner(false);
    navigation.navigate("ChooseCluster");
  };

  const getProjects = async () => {
    let credentials = await AsyncStorage.getItem("@googleCredentials")
    let refreshToken = JSON.parse(credentials).refreshToken
    setRefreshToken(refreshToken);
    let fetchedProjects = await GoogleCloudApi.fetchProjects({refreshToken});
    let projectsList = []
    for (const aProject of fetchedProjects.projects){
      projectsList.push({
        label: aProject.projectId,
        value: aProject.projectId,
      })
    }
    setProjectsList(projectsList)
  }

  useEffect(() => {
    getProjects();
  }, []);

  const GoogleProjectList = () => {
    return (
      <ModalSelector
        data={projectsList}
        keyExtractor={item => item.value}
        labelExtractor={item => item.label}
        initValue={"Select a project"}
        animationType={"fade"}
        onChange={(option) => setProjectId(option.value)}
      />
    );
  };

  return (
    <View style={commonStyles.whiteContainer}>
      <SpinnerOverlay showSpinner={showSpinner} />
      <ScrollView contentContainerStyle={commonStyles.scrollContainer, commonStyles.formContentContainer}>

        <View style={commonStyles.formSectionContainer}>
          <Text style={commonStyles.formSectionHeader}>Project:</Text>
          <View style={commonStyles.formContent}>{ GoogleProjectList() }</View>
        </View>

        <SubmitButton text="Select" onPress={() => {
          try {
            GoogleLogin();
          } catch (e) {
            Alert.alert("Error", e.message);
          }
        }} />

      </ScrollView>
    </View>
  );
};

export default React.memo(GoogleLoginScreen);
