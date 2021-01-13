import React from "react";
import { View, Text, ScrollView, AsyncStorage, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ProgressBar, Colors, Button } from "react-native-paper";
import * as FileSystem from "expo-file-system";

import { commonStyles } from "../styles.js";
import CustomButton from "../components/CustomButton";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

let filecontent = "File contents will be shown here";

class FileUpload extends React.Component {
  state = {
    isUploaded: false,
    text: filecontent,
    isCAAccepted: false,
    isCCAccepted: false,
    isCKAccepted: false,
  };

  updateState(stateKey, stateStatus) {
    if (stateKey == "CA") {
      this.setState({ isCAAccepted: stateStatus });
    } else if (stateKey == "CC") {
      this.setState({ isCCAccepted: stateStatus });
    } else if (stateKey == "CK") {
      this.setState({ isCKAccepted: stateStatus });
    } else if (stateKey == "isUploaded") {
      this.setState({ isUploaded: stateStatus });
    } else if (stateKey == "text") {
      this.setState({ text: stateStatus });
    }
  }

  async storeData(dataKey, dataValue) {
    try {
      const jsonValue = JSON.stringify(dataValue);
      await AsyncStorage.setItem(dataKey, jsonValue);
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
          "@certificate-authority-data",
          requiredLineData
        );
        this.updateState("CA", checkCAData);
      } else if (trimLine.startsWith("client-certificate-data")) {
        requiredLineData = trimLine.substring(25).trim();
        checkCCData = await this.storeData(
          "@client-certificate-data",
          requiredLineData
        );
        this.updateState("CC", checkCCData);
      } else if (trimLine.startsWith("client-key-data")) {
        requiredLineData = trimLine.substring(16).trim();
        checkCKData = await this.storeData("@client-key-data", requiredLineData);
        this.updateState("CK", checkCKData);
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
              "Please try again."
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={commonStyles.actionButton}
              mode="contained"
              color={Colors.blue500}
              onPress={this.uploadFile}
            >
              Select File
            </Button>
          </View>

          <ProgressBar
            style={commonStyles.progressBar}
            progress={0.7}
            color={Colors.blue800}
          />

          <AntDesign name="checkcircleo" size={24} color="black" />
          <MaterialIcons name="check-circle-outline" size={24} color="black" />
          <Text>Boolean Value: { String(this.state.isCAAccepted) }</Text>
          <Text>Boolean Value: { String(this.state.isCCAccepted) }</Text>
          <Text>Boolean Value: { String(this.state.isCKAccepted) }</Text>

          <CustomButton
            image={{
              uri:
                "https://upload.wikimedia.org/wikipedia/donate/thumb/8/89/Ooui-checkbox-selected.svg/1024px-Ooui-checkbox-selected.svg.png",
            }}
            text="certificate-authority-data"
            type="outlined"
            size="small"
            disabled={true}
          />

          <CustomButton
            image={{
              uri:
                "https://upload.wikimedia.org/wikipedia/donate/thumb/8/89/Ooui-checkbox-selected.svg/1024px-Ooui-checkbox-selected.svg.png",
            }}
            text="client-certificate"
            type="outlined"
            size="small"
            disabled={true}
          />

          <CustomButton
            image={{
              uri:
                "https://upload.wikimedia.org/wikipedia/donate/thumb/8/89/Ooui-checkbox-selected.svg/1024px-Ooui-checkbox-selected.svg.png",
            }}
            text="client-key"
            type="outlined"
            size="small"
            disabled={true}
          />

          <ScrollView
            style={{ marginTop: 20, padding: 10, backgroundColor: "#DCDCDC" }}
          >
            <Text style={{ fontSize: 18 }}>{this.state.text}</Text>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

export default function KubeconfigUploadScreen({ navigation }) {
  return <FileUpload></FileUpload>;
}
