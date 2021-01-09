import React from "react";
import { View, Text, ScrollView, AsyncStorage } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ProgressBar, Colors, Button } from "react-native-paper";
import * as FileSystem from "expo-file-system";

import { commonStyles } from "../styles.js";
import CustomButton from "../components/CustomButton";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

let filecontent = "File contents will be shown here";

class FileAcceptStatus extends React.Component {
  constructor(props) {
      super(props)
    this.state = {
      isCAAccepted: false,
      isCCAccepted: false,
      isCKAccepted: false,
    };
  };

  updateState(stateKey, stateStatus) {
    if (stateKey == "CA") {
      this.setState({ isCAAccepted: stateStatus });
    } else if (stateKey == "CC") {
      this.setState({ isCCAccepted: stateStatus });
    } else if (stateKey == "CK") {
      this.setState({ isCKAccepted: stateStatus });
    }
  }

  render() {
    return (
      <View>
        <AntDesign name="checkcircleo" size={24} color="black" />
        <MaterialIcons name="check-circle-outline" size={24} color="black" />
        <Text>{this.state.isCAAccepted}</Text>
        <Text>{this.state.isCCAccepted}</Text>
        <Text>{this.state.isCKAccepted}</Text>
      </View>
    );
  }
}

class FileUpload extends React.Component {
  state = {
    isUploaded: false,
    text: filecontent,
  };

  updateState(uploadStatus, uploadFileContent) {
    this.setState({ isUploaded: uploadStatus, text: uploadFileContent });
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

  checkFileContent(filecontent) {
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
        checkCAData = this.storeData(
          "@certificate-authority-data",
          requiredLineData
        );
        FileAcceptStatus.updateState("CA", checkCAData);
      } else if (trimLine.startsWith("client-certificate-data")) {
        requiredLineData = trimLine.substring(25).trim();
        checkCCData = this.storeData(
          "@client-certificate-data",
          requiredLineData
        );
        this.props.FileAcceptStatus.updateState("CC", checkCAData);
      } else if (trimLine.startsWith("client-key-data")) {
        requiredLineData = trimLine.substring(16).trim();
        checkCKData = this.storeData("@client-key-data", requiredLineData);
        FileAcceptStatus.updateState("CK", checkCAData);
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
        if (fileResult) {
          this.updateState(true, filecontent);
        } else {
          alert(
            "File upload was successful but data extraction failed, please try again"
          );
        }
      } else {
        alert("File upload failed, please try again");
      }
    } catch (err) {
      alert("File upload failed, please try again");
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
              margin: 15,
            }}
          >
            <Button
              style={commonStyles.actionButton}
              mode="contained"
              color={Colors.blue500}
              onPress={this.uploadFile}
            >
              Upload File
            </Button>
          </View>

          <ProgressBar
            style={commonStyles.progressBar}
            progress={0.7}
            color={Colors.blue800}
          />

          <FileAcceptStatus></FileAcceptStatus>

          <CustomButton
            image={{
              uri:
                "https://upload.wikimedia.org/wikipedia/donate/thumb/8/89/Ooui-checkbox-selected.svg/1024px-Ooui-checkbox-selected.svg.png",
            }}
            text="certificate-authority-data"
            type="outlined"
            size="small"
          />

          <View
            style={{ marginTop: 20, padding: 10, backgroundColor: "#D3D3D3" }}
          >
            <Text>{this.state.text}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default function KubeconfigUploadScreen({ navigation }) {
  return <FileUpload></FileUpload>;
}
