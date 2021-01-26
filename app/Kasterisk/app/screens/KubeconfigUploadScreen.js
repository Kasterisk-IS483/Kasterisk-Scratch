import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import * as RNFS from "react-native-fs";
import * as DocumentPicker from "react-native-document-picker";
import RNFetchBlob from "react-native-fetch-blob";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fonts, spacings, commonStyles, colours } from "../utils/styles.js";
import CustomButton from "../components/CustomButton";
import ActionButton from "../components/ActionButton";
import * as KubeApi from "../api/KubeApi"
import { Kubeconfig } from "../api/KubeApi/config"
import { saveToLocal } from "../api/KubeApi/config_types"

const uncheckedIcon = require("../assets/checkbox-cross.png");
const checkedIcon = require("../assets/checkbox-tick.png");

class FileUpload extends React.Component {
  state = {
    isUploaded: false,
    text: "Contents of file will be shown here upon successful upload",
    isCAAccepted: false,
    isCCAccepted: false,
    isCKAccepted: false,
    CAAImg: uncheckedIcon,
    CCAImg: uncheckedIcon,
    CKImg: uncheckedIcon,
  };

  updateState(stateKey, stateStatus) {
    if (stateKey == "clusterCheck") {
      this.setState({ isCAAccepted: stateStatus });
      this.setState({ CAAImg: checkedIcon });
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
      let k8s = new Kubeconfig();
      try {
        k8s.loadFromFile(filecontent);
      } catch (e) {
        Alert.alert("File Upload Failed", e.message)
        return
      }
      try {
        await saveToLocal(k8s.getClusters())
      } catch (e) {
        Alert.alert("File Upload Failed", e.message)
        return
      }
      this.updateState("clusterCheck", true);
      this.updateState("isUploaded", true);
      this.updateState("text", k8s.getKubeconfigContent());
    } catch (e) {
      if (DocumentPicker.default.isCancel(e)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        Alert.alert("File Upload Failed", e.message);
      }
    }
  };

  render() {
    return (

      <View style={commonStyles.whiteContainer}>
        <ScrollView contentContainerStyle={commonStyles.scrollView}>

          <Text style={{fontSize: fonts.md, textAlign: "center", marginHorizontal: spacings.lg}}>Choose a kubeconfig that contains 'certificate authority data' or 'tls insecure' to proceed</Text>

          <ActionButton
            text="Select File"
            onPress={this.uploadFile}
          />

          <Text style={[commonStyles.subheading, {paddingTop: spacings.lg}]}>Fields required:</Text>

          <CustomButton
            image={this.state.CAAImg}
            text="certificate-authority-data or tls-insecure"
            type="checkbox"
            align="flex-start"
            disabled={true}
          />

          <Text style={[{ paddingTop: spacings.xl }, commonStyles.subheading]}>File preview:</Text>
          <ScrollView style={{ marginVertical: spacings.sm, marginHorizontal: spacings.lg, backgroundColor: colours.grey }}>
            <Text style={{ padding: spacings.lg, fontSize: fonts.sm }}>{this.state.text}</Text>
          </ScrollView>

        </ScrollView>
      </View>
    );
  }
}

export default function KubeconfigUploadScreen({ navigation }) {
  return <FileUpload></FileUpload>;
}
