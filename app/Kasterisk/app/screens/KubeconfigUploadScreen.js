import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as SecureStore from 'expo-secure-store';

import { fonts, spacings, commonStyles, colours } from "../utils/styles.js";
import CustomButton from "../components/CustomButton";
import ActionButton from "../components/ActionButton";
// import * as KubeApi from "../api/KubeApi"

let filecontent;

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
    if (stateKey == "CA") {
      this.setState({ isCAAccepted: stateStatus });
      this.setState({ CAAImg: checkedIcon });
    } else if (stateKey == "CC") {
      this.setState({ isCCAccepted: stateStatus });
      this.setState({ CCAImg: checkedIcon });
    } else if (stateKey == "CK") {
      this.setState({ isCKAccepted: stateStatus });
      this.setState({ CKImg: checkedIcon });
    } else if (stateKey == "isUploaded") {
      this.setState({ isUploaded: stateStatus });
    } else if (stateKey == "text") {
      this.setState({ text: stateStatus });
    }
  }

  async storeData(dataKey, dataValue) {
    try {
      const jsonValue = JSON.stringify(dataValue);
      await SecureStore.setItemAsync(dataKey, jsonValue);
      return true;
    } catch (e) {
      return false;
    }
  }

  async checkFileContent(filecontent) {
    var fileContentLines = filecontent.split("\n");
    var checkCAData,
      checkCCData,
      checkCKData = false;
    var requiredLineData,
      trimLine = "";
    for (const aLine of fileContentLines) {
      trimLine = aLine.trim();
      if (trimLine.startsWith("certificate-authority-data")) {
        requiredLineData = trimLine.substring(28).trim();
        checkCAData = await this.storeData(
          "certificate-authority-data",
          requiredLineData
        );
        this.updateState("CA", checkCAData);
      } else if (trimLine.startsWith("client-certificate-data")) {
        requiredLineData = trimLine.substring(25).trim();
        checkCCData = await this.storeData(
          "client-certificate-data",
          requiredLineData
        );
        this.updateState("CC", checkCCData);
      } else if (trimLine.startsWith("client-key-data")) {
        requiredLineData = trimLine.substring(16).trim();
        checkCKData = await this.storeData("client-key-data", requiredLineData);
        this.updateState("CK", checkCKData);
      } else if (trimLine.startsWith("server")) {
        requiredLineData = trimLine.substring(8).trim();
        await this.storeData("server-url", requiredLineData);
      }
    }
    if (checkCAData && checkCCData && checkCKData) {
      return true;
    }
    return false;
  }

  uploadFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      console.log(res.uri, res.type, res.name, res.size);
      if (res.type == "success") {
        filecontent = await FileSystem.readAsStringAsync(res.uri);
        var fileResult = await this.checkFileContent(filecontent);
        // let test = await KubeApi.checkServerStatus()
        // alert(test)
        this.updateState("isUploaded", fileResult);
        this.updateState("text", filecontent);
        if (!fileResult) {
          var missingData = "";
          if (!this.state.isCAAccepted) {
            missingData += "\tcertificate-authority-data\n";
          }
          if (!this.state.isCCAccepted) {
            missingData += "\tclient-certificate-data\n";
          }
          if (!this.state.isCKAccepted) {
            missingData += "\tclient-key-data\n";
          }
          Alert.alert(
            "File Upload Failed",
            "The following data fields are missing:\n" +
            missingData +
            "\nPlease try again."
          );
        }
      } else {
        Alert.alert("File Upload Failed", "Please try again.");
      }
    } catch (err) {
      Alert.alert("File Upload Failed", "Please try again.");
      alert(err);
    }
  };

  render() {
    return (
      <View style={commonStyles.whiteContainer}>
        <ScrollView contentContainerStyle={commonStyles.scrollView}>

          <Text style={commonStyles.heading}>Upload Kubeconfig File Below</Text>

          <ActionButton
              text="Select File"
              onPress={this.uploadFile}
          />

          <View>
            <Text style={commonStyles.subheading}>Fields required:</Text>

            <CustomButton
              image={this.state.CAAImg}
              text="certificate-authority-data"
              type="checkbox"
              align="flex-start"
              disabled={true}
            />

            <CustomButton
              image={this.state.CCAImg}
              text="client-certificate"
              type="checkbox"
              align="flex-start"
              disabled={true}
            />

            <CustomButton
              image={this.state.CKImg}
              text="client-key"
              type="checkbox"
              align="flex-start"
              disabled={true}
            />
          </View>

          <Text style={[ {paddingTop: spacings.xl}, commonStyles.subheading ]}>File preview:</Text>
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
