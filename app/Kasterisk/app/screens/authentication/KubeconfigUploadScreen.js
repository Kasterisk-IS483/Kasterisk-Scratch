import React, { Component } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import * as RNFS from "react-native-fs";
import * as DocumentPicker from "react-native-document-picker";

import { Kubeconfig } from "../../api/KubeApi/config";
import { saveKubeconfigFileToLocal } from "../../api/KubeApi/config_types";
import { colours, fonts, spacings, commonStyles } from "../../utils/styles";
import CustomButton from "../../components/Buttons/CustomButton";
import ActionButton from "../../components/Buttons/ActionButton";
import SubmitButton from "../../components/Buttons/SubmitButton";
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

const uncheckedIcon = require("../../assets/checkbox-cross.png");
const checkedIcon = require("../../assets/checkbox-tick.png");

/** Kubeconfig Upload Screen to add cluster via kubeconfig file **/
export default class KubeconfigUploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploaded: false,
      text: "Contents of file will be shown here upon successful upload",
      isCertAccepted: false,
      CertImg: uncheckedIcon,
      spinner: false,
    };
    this.updateState = this.updateState.bind(this);
    this.KubeconfigFile = null;
    this.k8s = new Kubeconfig();
  }

  updateState(stateKey, stateStatus) {
    if (stateKey == "clusterCheck") {
      this.setState({ isCertAccepted: stateStatus });
      this.setState({ CertImg: checkedIcon });
    } else if (stateKey == "isUploaded") {
      this.setState({ isUploaded: stateStatus });
    } else if (stateKey == "text") {
      this.setState({ text: stateStatus });
    }
  }

  uploadFile = async () => {
    try {
      const res = await DocumentPicker.default.pick();
      let filecontent = await RNFS.readFile(res.uri);
      // let k8s = new Kubeconfig();
      try {
        this.k8s.loadFromFile(filecontent);
      } catch (e) {
        Alert.alert("File Upload Failed", e.message);
        return;
      }

      this.updateState("clusterCheck", true);
      this.updateState("isUploaded", true);
      this.updateState("text", this.k8s.getKubeconfigContent());
    } catch (e) {
      if (DocumentPicker.default.isCancel(e)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        Alert.alert("File Upload Failed", e.message);
      }
    }
  };

  submit = async () => {
    this.setState({
      spinner: true,
    });
    try {
      await saveKubeconfigFileToLocal(this.k8s.getClusters(), this.k8s.getUsers(), this.k8s.getContexts());
      this.props.navigation.navigate("ChooseCluster");
    } catch (err) {
      Alert.alert("File Submission Failed", err.message);
    }
    this.setState({
      spinner: false,
    });
  };

  render() {
    return (
      <View style={commonStyles.whiteContainer}>
        <SpinnerOverlay showSpinner={this.state.spinner} />
        <Text style={{
          textAlign: "center",
          fontSize: fonts.md,
          paddingTop: spacings.md,
          paddingBottom: spacings.md,
          marginHorizontal: spacings.lg,
        }}>
          Choose a kubeconfig with 'certificate-authority-data' or 'insecure-skip-tls-verify' set to true to proceed
        </Text>
        <ActionButton text="Select File" onPress={this.uploadFile} />
        <View style={[commonStyles.formContentContainer, { flex: 1 }]}>
          <Text style={[
            commonStyles.formSectionHeader, {
              paddingTop: spacings.lg,
            }]}>
            Fields required:
          </Text>
          <CustomButton image={this.state.CertImg} text="certificate-authority-data or insecure-skip-tls-verify: true" type="checkbox" align="flex-start" disabled={true} />
          <Text style={[
            commonStyles.formSectionHeader, {
              paddingTop: spacings.xl,
            }]}>
            File preview:
          </Text>
          <ScrollView style={{
            marginVertical: spacings.sm,
            backgroundColor: colours.grey,
          }}>
            <Text style={{
              padding: spacings.lg,
              fontSize: fonts.sm,
            }}>
              {this.state.text}
            </Text>
          </ScrollView>
          {this.state.isCertAccepted ? <SubmitButton text="Submit" onPress={this.submit} /> : null}
        </View>
      </View>
    );
  }
}
