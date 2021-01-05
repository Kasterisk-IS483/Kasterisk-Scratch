import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ProgressBar, Colors, Button, ActivityIndicator } from 'react-native-paper';
import * as FileSystem from "expo-file-system";
import { commonStyles } from "../styles.js";

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
      <View style={commonStyles.whiteContainer}>
        <ScrollView contentContainerStyle={commonStyles.scrollView}>
          
          <Text style={commonStyles.heading}>Upload Kubeconfig file below</Text>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin:15}}>
            <Button 
              style={commonStyles.actionButton} 
              mode="contained" 
              color={Colors.blue500} 
              onPress={this.uploadFile} >
                Upload File
            </Button>
          </View>

          <Text>Certificate</Text>
          <ProgressBar 
            style={commonStyles.progressbar} 
            progress={0.7} 
            color={Colors.blue800} 
          />

          <Text>Status</Text>
          <ActivityIndicator 
            style={{alignItems: 'left', padding: 5}} 
            animating={true} 
            color={Colors.blue800} 
          />

          <Text style={{ marginTop: 20, padding: 10, backgroundColor: "#D3D3D3" }}>
            {this.state.text}
          </Text>

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

