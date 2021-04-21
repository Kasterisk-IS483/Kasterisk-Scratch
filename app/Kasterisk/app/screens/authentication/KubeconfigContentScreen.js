import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";

import { TextInput, RadioButton, Switch } from "react-native-paper";

import { saveKubeconfigContentToLocal } from "../../api/KubeApi/config_types";
import { colours, spacings, commonStyles } from "../../utils/styles";
import SubmitButton from "../../components/Buttons/SubmitButton";
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

/** Kubeconfig Content Screen to add cluster via manual inputs of kubeconfig file **/
export default function KubeconfigContentScreen({ navigation }) {
  const [checked, setChecked] = useState("token");
  const [isTLSVerify, setIsTLSVerify] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [data, setData] = useState({
    name: "",
    server: "",
    certificate: "",
    token: "",
    clientCert: "",
    clientKey: "",
  });

  const onToggleTls = () => setIsTLSVerify(!isTLSVerify);

  const ContentUpload = async () => {
    setShowSpinner(true);
    var missingData = "";

    if (data.name == "") {
      missingData += "\tName\n";
    }
    if (data.server == "") {
      missingData += "\tServer\n";
    }
    if (data.certificate == "") {
      missingData += "\tCertificate Authority Data\n";
    }

    if (checked === "token") {
      if (data.token == "") {
        missingData += "\tToken\n";
      }
    }
    if (checked === "cert") {
      if (data.clientCert == "") {
        missingData += "\tClient Certificate\n";
      }
      if (data.clientKey == "") {
        missingData += "\tClient Key\n";
      }
    }

    if (missingData != "") {
      Alert.alert("Submission Failed", "The following data fields are missing:\n" + missingData + "\nPlease try again.");
      return;
    }

    let clusterInfo = {
      name: data.name,
      caData: data.certificate,
      server: data.server,
      skipTLSVerify: isTLSVerify,
    };
    let userInfo = {
      name: data.name,
      certData: data.clientCert === "" ? null : data.clientCert,
      keyData: data.clientKey === "" ? null : data.clientKey,
      token: data.token === "" ? null : data.token,
      // authProvider: any,
    };
    try {
      await saveKubeconfigContentToLocal(clusterInfo, userInfo, checked);
      navigation.navigate('ChooseCluster');
    } catch (err) {
      Alert.alert("Error", err.message);
    }
    setShowSpinner(false);
  };

  return (
    <View style={commonStyles.whiteContainer}>
      <SpinnerOverlay showSpinner={showSpinner} />
      <ScrollView contentContainerStyle={commonStyles.scrollContainer, commonStyles.formContentContainer}>

        <View style={commonStyles.formSectionContainer}>
          <Text style={commonStyles.formSectionHeader}>General Information:</Text>
          <TextInput onChangeText={(text) => setData({ ...data, name: text })} style={commonStyles.formContent} label="Cluster Name" placeholder="Enter Cluster Name Here" />
          <TextInput onChangeText={(text) => setData({ ...data, server: text })} style={commonStyles.formContent} label="Server" placeholder="Enter Server Address Here" />
          <TextInput onChangeText={(text) => setData({ ...data, certificate: text })} style={commonStyles.formContent} label="Certificate Authority Data" placeholder="Enter Certificate Here" />
          <View style={commonStyles.fieldsContainer}>
            <Switch value={isTLSVerify} onValueChange={onToggleTls} color={colours.primary} style={commonStyles.switchContainer} />
            <Text style={commonStyles.switchText}>Skip TLS Verification</Text>
          </View>
        </View>

        <View style={commonStyles.formSectionContainer}>
          <Text style={commonStyles.formSectionHeader}>Authentication Mode:</Text>
          <RadioButton.Group onValueChange={(newValue) => setChecked(newValue)} value={checked}>
            <View>
              <View style={commonStyles.fieldsContainer}>
                <RadioButton value="token" color={colours.primary} />
                <Text style={commonStyles.radioText}>Token</Text>
              </View>
              <View style={commonStyles.fieldsContainer}>
                <RadioButton value="cert" color={colours.primary} />
                <Text style={commonStyles.radioText}>Client Certificate and Key</Text>
              </View>
            </View>
          </RadioButton.Group>
          <View style={{ marginTop: spacings.xxs }}>
            {checked === "token" ? (
              <View>
                <TextInput onChangeText={(text) => setData({ ...data, token: text })} style={commonStyles.formContent} label="Token" placeholder="Enter Token Here" />
              </View>
            ) : (
              <View>
                <TextInput onChangeText={(text) => setData({ ...data, clientCert: text })} style={commonStyles.formContent} label="Client Certificate" placeholder="Enter Client Certificate Here" />
                <TextInput onChangeText={(text) => setData({ ...data, clientKey: text })} style={commonStyles.formContent} label="Client Key" placeholder="Enter Client Key Here" />
              </View>
            )}
          </View>
        </View>

        <SubmitButton text="Submit" onPress={() => ContentUpload()} />

      </ScrollView>
    </View>
  );
}
