import React from "react";
import { View, Text, ScrollView } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ProgressBar, Colors, Button, ActivityIndicator} from 'react-native-paper';
import * as FileSystem from "expo-file-system";
import { landscapeStyles, portraitStyles } from "../styles.js";

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
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView contentContainerStyle={landscapeStyles.scrollViewStyle}>
          <Text style={landscapeStyles.headingStyle}>Upload Kubeconfig file below</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin:15}}>
            <Button style={{ width: "40%" }} mode="contained" color={Colors.blue800} onPress={this.uploadFile} >Upload File</Button>
          </View>
          <Text>Certificate</Text><ProgressBar style={landscapeStyles.progressbar} progress={0.7} color={Colors.blue800} />
          <Text>Certificate</Text><ProgressBar style={landscapeStyles.progressbar} progress={0.7} color={Colors.blue800} />
          <Text>Certificate</Text><ProgressBar style={landscapeStyles.progressbar} progress={0.4} color={Colors.blue800} />
          <Text>Certificate</Text><ProgressBar style={landscapeStyles.progressbar} progress={1} color={Colors.red800} />
          <Text> Status </Text><ActivityIndicator animating={true} color={Colors.blue800} />
          <Text style={{ marginTop: 20, padding: 10, backgroundColor: "white" }}>{this.state.text}</Text>
          
        </ScrollView>
      </View>
    );
  }
}

export default function KubeconfigUploadScreen({ navigation }) {
  return (
    <FileUpload></FileUpload>
  );
}


