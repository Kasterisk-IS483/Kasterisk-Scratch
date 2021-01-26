import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import * as RNFS from "react-native-fs";
import * as DocumentPicker from "react-native-document-picker";
import RNFetchBlob from "react-native-fetch-blob";

import { fonts, spacings, commonStyles, colours } from "../utils/styles.js";
import CustomButton from "../components/CustomButton";
import ActionButton from "../components/ActionButton";
import * as KubeApi from "../api/KubeApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Kubeconfig } from "../api/KubeApi/config";
import { saveToLocal } from "../api/KubeApi/config_types";

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
        if (stateKey == "clusterCheck") {
            this.setState({ isCAAccepted: stateStatus });
            this.setState({ CAAImg: checkedIcon });
        } else if (stateKey == "isUploaded") {
            this.setState({ isUploaded: stateStatus });
        } else if (stateKey == "text") {
            this.setState({ text: stateStatus });
        }
    }

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

    render() {
        return (
            <View style={commonStyles.whiteContainer}>
                {/* //TODO: add confirm button at top right of toolbar */}
                <ScrollView contentContainerStyle={commonStyles.scrollView}>
                    <Text style={commonStyles.heading}>
                        Upload Kubeconfig File Below
                    </Text>
                    <View>
                        <Text style={commonStyles.heading}>
                            Kubeconfig must contain certificate authority data,
                            or insecure-skip-tls-verify set to true
                        </Text>
                    </View>

                    <ActionButton
                        text="Select File"
                        onPress={this.uploadFile}
                    />

                    <View>
                        <Text style={commonStyles.subheading}>
                            Fields required:
                        </Text>

                        <CustomButton
                            image={this.state.CAAImg}
                            //TODO: change this as well
                            text="certificate-authority-data / insecure-skip-tls-verify: true"
                            type="checkbox"
                            align="flex-start"
                            disabled={true}
                        />
                    </View>

                    <Text
                        style={[
                            { paddingTop: spacings.xl },
                            commonStyles.subheading,
                        ]}
                    >
                        File preview:
                    </Text>
                    <ScrollView
                        style={{
                            marginVertical: spacings.sm,
                            marginHorizontal: spacings.lg,
                            backgroundColor: colours.grey,
                        }}
                    >
                        <Text
                            style={{ padding: spacings.lg, fontSize: fonts.sm }}
                        >
                            {this.state.text}
                        </Text>
                    </ScrollView>
                </ScrollView>
            </View>
        );
    }
}

export default function KubeconfigUploadScreen({ navigation }) {
    return <FileUpload></FileUpload>;
}
