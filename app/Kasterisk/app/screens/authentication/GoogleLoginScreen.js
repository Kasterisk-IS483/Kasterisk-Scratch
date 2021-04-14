import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import ModalSelector from 'react-native-modal-selector';

import { AWSRegions } from "../../utils/constants";
import { commonStyles } from "../../utils/styles";
import SubmitButton from "../../components/Buttons/SubmitButton";
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

const GoogleLoginScreen = ({ navigation }) => {
  const [region, setRegion] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  const GoogleLogin = async () => {
    setShowSpinner(false);
    navigation.navigate("ChooseCluster");
  };

  const GoogleProjectLiat = () => {
    return (
      <ModalSelector
        data={AWSRegions}
        keyExtractor={item => item.value}
        labelExtractor={item => item.label}
        initValue={"Select a project"}
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
          <Text style={commonStyles.formSectionHeader}>Project:</Text>
          <View style={commonStyles.formContent}>{GoogleProjectLiat()}</View>
        </View>

        <SubmitButton text="Sign In" onPress={() => {
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
