import React from "react";
import { View, Text, Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import styles from "../styles.js";

let filecontent = "upload file first";

class FileUpload extends React.Component {
  state = {
    isUploaded: false,
    text: "File contents will be shown here",
  };

  updateState(uploadStatus, uploadFileContent) {
    this.setState({ isUploaded: uploadStatus, text: uploadFileContent });
  }


  uploadFile = async () => {
    try {
        const res = await DocumentPicker.getDocumentAsync();
        console.log(res.uri, res.type, res.name, res.size);
        if (res.type == "success") {
            filecontent = await FileSystem.readAsStringAsync(res.uri);
            console.log(filecontent);
            this.updateState(true, filecontent);
            console.log(this.state.isUploaded);
        }
    } catch (err) {
        throw err;
    }
  };

  render() {
    return (
      <View>
            <Text>kubeconfig page</Text>
            <Button title="Upload File" onPress={this.uploadFile} />
            <Text>{this.state.text}</Text>
      </View>
    );
  }
}

export default function KubeconfigUploadScreen({ navigation }) {
  return (
      <FileUpload></FileUpload>
  );
}


