import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import ModalSelector from 'react-native-modal-selector';
import AsyncStorage from "@react-native-async-storage/async-storage";

import GoogleCloudApi from "../../api/GoogleCloudApi";
import { commonStyles } from "../../utils/styles";
import SubmitButton from "../../components/Buttons/SubmitButton";
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

const GoogleLoginScreen = ({ navigation }) => {
  const [refreshToken, setRefreshToken] = useState();
  const [projectsList, setProjectsList] = useState();
  const [project, setProject] = useState("Select a project");
  const [showSpinner, setShowSpinner] = useState(false);

  const GoogleLogin = async () => {
    if (project !== "Select a project") {
      try {
        let allClusters = await GoogleCloudApi.fetchGkeClusters(project, refreshToken);
        for (const aCluster of allClusters) {
          console.log(aCluster)
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
        onChange={(option) => setProject(option.value)}
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
