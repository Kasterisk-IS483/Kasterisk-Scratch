import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from "react-native"
import { TextInput } from "react-native-paper";

import ActionButton from "../components/ActionButton";
import { commonStyles } from "../utils/styles.js";

export default function KubeconfigContentScreen({ navigation }) {

    const [data, setData] = useState({
        name: '',
        server: '',
        certificate: '',
        username: '',
        password: '',
        token: '',
    });

    const ContentUpload = () => {
        var missingData = '';

        if (data.name == '') {
          missingData += "\tname\n";
        }
        if (data.server == '') {
            missingData += "\tserver\n";
        }
        if (data.certificate == '') {
            missingData += "\tcertificate\n";
        }

        if (data.username == '') {
        missingData += "\tusername\n";
        }
        if (data.password == '') {
            missingData += "\tpassword\n";
        }
        if (data.token == '') {
            missingData += "\ttoken\n";
        }
        
        if (missingData == '') {
            alert(data.name);
        } else {
            Alert.alert(
                "Submission Failed",
                "The following data fields are missing:\n" +
                missingData +
                "\nPlease try again."
            );      
        }

    };

    return (
        <View style={commonStyles.whiteContainer}>
            <ScrollView contentContainerStyle={commonStyles.scrollView}>

                <Text style={commonStyles.heading}>Add Kubeconfig Content</Text>

                <View>
                    <TextInput 
                        onChangeText={text => setData({ ...data, name: text })                }
                        style={commonStyles.textInput}
                        label="Name (required)"
                    />
                    <TextInput
                        onChangeText={text => setData({ ...data, server: text })                }
                        style={commonStyles.textInput}
                        label="Server (required)"
                    />
                    <TextInput
                        onChangeText={text => setData({ ...data, certificate: text })                }
                        style={commonStyles.textInput}
                        label="Certificate (required)"
                    />

                    <TextInput
                        onChangeText={text => setData({ ...data, username: text })                }
                        style={commonStyles.textInput}
                        label="Username (if using UN and PW)"
                    />
                    <TextInput
                        onChangeText={text => setData({ ...data, password: text })                }
                        style={commonStyles.textInput}
                        label="Password (if using UN and PW)"
                    />
                    <TextInput
                        onChangeText={text => setData({ ...data, token: text })                }
                        style={commonStyles.textInput}
                        label="Token (if using Token)"
                    />
                </View>

                <ActionButton
                    text="Submit"
                    onPress={() => ContentUpload()}
                />

            </ScrollView>
        </View>
    );
}
