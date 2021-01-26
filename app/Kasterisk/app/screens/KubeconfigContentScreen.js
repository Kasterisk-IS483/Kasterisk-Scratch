import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";

import { 
    Cluster,
    User
} from "../api/KubeApi/config_types";

import ActionButton from "../components/ActionButton";
import { colours, fonts, spacings, commonStyles } from "../utils/styles.js";

export default function KubeconfigContentScreen({ navigation }) {

    const [checked, setChecked] = React.useState('auth-unpw');

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
          missingData += "\tName\n";
        }
        if (data.server == '') {
            missingData += "\tServer\n";
        }
        if (data.certificate == '') {
            missingData += "\tCertificate Authority Data\n";
        }

        if (checked === 'auth-unpw') {
            if (data.username == '') {
                missingData += "\tUsername\n";
            }
            if (data.password == '') {
                missingData += "\tPassword\n";
            }
        } 
        if (checked === 'auth-token') {
            if (data.token == '') {
                missingData += "\tToken\n";
            }            
        }
        if (checked === 'auth-cert') {
            if (data.clientCert == '') {
                missingData += "\tClient Certificate\n";
            }
            if (data.clientKey == '') {
                missingData += "\tClient Key\n";
            }
        }
        
        if (missingData != '') {
            Alert.alert(
                "Submission Failed",
                "The following data fields are missing:\n" +
                missingData +
                "\nPlease try again."
            );
            return;
        }
        let clusterInfo = {
            name: data.name,
            caData: data.certificate,
            server: data.server,
            skipTLSVerify: data.tls
            }
        let userInfo = {
            name: data.name,
            certData: data.clientCert === "" ? null : data.clientCert,
            keyData: data.clientKey === "" ? null : data.clientKey,
            authProvider: any,
            token: data.token === "" ? null : data.token,
            username: data.username === "" ? null : data.username,
            password: data.password === "" ? null : data.password,
        }
        
    };

    return (
        <View style={commonStyles.whiteContainer}>
            <ScrollView contentContainerStyle={commonStyles.scrollView}>

                <Text style={commonStyles.heading}>Add Kubeconfig Content</Text>

                <View>
                    <Text style={commonStyles.subheading}>General Information:</Text>

                    <TextInput 
                        onChangeText={text => setData({ ...data, name: text })}
                        style={commonStyles.textInput}
                        label="Cluster Name"
                        placeholder="Enter Cluster Name"
                    />
                    <TextInput
                        onChangeText={text => setData({ ...data, server: text })}
                        style={commonStyles.textInput}
                        label="Server"
                        placeholder="Enter Server Address"
                    />
                    <TextInput
                        onChangeText={text => setData({ ...data, certificate: text })}
                        style={commonStyles.textInput}
                        label="Certificate Authority Data"
                        placeholder="Enter Certificate Here"
                    />

                    {/* //TODO: add skip tls insecure switch */}

                    <Text style={[ {paddingTop: spacings.xl}, commonStyles.subheading ]}>Authentication Mode:</Text>
                    <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                        <View style={{marginLeft: spacings.lg, marginBottom: spacings.xs}}>
                            <View style={{flexDirection: 'row'}}>
                                {/* //TODO: THe colour abit light, choose something else */}
                                <RadioButton value="auth-unpw" color={colours.secondary}/>
                                <Text style={{marginTop: spacings.s, fontSize: fonts.sm}}>Username and Password</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <RadioButton value="auth-token" color={colours.secondary}/>
                                <Text style={{marginTop: spacings.s, fontSize: fonts.sm}}>Token</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <RadioButton value="auth-cert" color={colours.secondary}/>
                                <Text style={{marginTop: spacings.s, fontSize: fonts.sm}}>Client Certificate and Key</Text>
                            </View>
                        </View>
                    </RadioButton.Group>

                    <View>
                        {/* //TODO: add input field for client cert and key */}
                        {
                            checked === 'auth-unpw' ?
                            <View>
                                <TextInput
                                    onChangeText={text => setData({ ...data, username: text })}
                                    style={commonStyles.textInput}
                                    label="Username"
                                    placeholder="Enter Username Here"
                                />
                                <TextInput
                                    onChangeText={text => setData({ ...data, password: text })}
                                    style={commonStyles.textInput}
                                    label="Password"
                                    placeholder="Enter Password Here"
                                />
                            </View>
                            : <View>
                                <TextInput
                                    onChangeText={text => setData({ ...data, token: text })}
                                    style={commonStyles.textInput}
                                    label="Token"
                                    placeholder="Enter Token Here"
                                />                                
                            </View>
                        }
                    </View>

                </View>
                        {/* //TODO: submit / confirm button to be on navbar, right side */}
                <ActionButton 
                    text="Submit" 
                    onPress={() => ContentUpload()}
                />
            </ScrollView>
        </View>
    );
}
