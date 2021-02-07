import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";

import { 
    Cluster,
    User
} from "../api/KubeApi/config_types";

import SubmitButton from "../components/Buttons/SubmitButton";
import { colours, fonts, spacings, commonStyles } from "../utils/styles.js";

export default function KubeconfigContentScreen() {

    const [checked, setChecked] = React.useState('auth-unpw');

    const [data, setData] = useState({
        name: '',
        server: '',
        certificate: '',
        username: '',
        password: '',
        token: '',
        clientCert: '',
        clientKey: '',
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
        
        Alert.alert("Success");
        // this.props.navigation.navigate('Loading');
    };

    return (
        <View style={commonStyles.whiteContainer}>
            <ScrollView contentContainerStyle={commonStyles.scrollView}>

                <Text style={commonStyles.subheading}>General Information:</Text>

                <TextInput 
                    onChangeText={text => setData({ ...data, name: text })}
                    style={commonStyles.textInput}
                    label="Cluster Name"
                    placeholder="Enter Cluster Name Here"
                />
                <TextInput
                    onChangeText={text => setData({ ...data, server: text })}
                    style={commonStyles.textInput}
                    label="Server"
                    placeholder="Enter Server Address Here"
                />
                <TextInput
                    onChangeText={text => setData({ ...data, certificate: text })}
                    style={commonStyles.textInput}
                    label="Certificate Authority Data"
                    placeholder="Enter Certificate Here"
                />


                <Text style={[ {paddingTop: spacings.xl}, commonStyles.subheading ]}>
                    Authentication Mode:
                </Text>

                <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                    <View style={{marginLeft: spacings.lg, marginBottom: spacings.xxs}}>

                        <View style={{flexDirection: 'row'}}>
                            <RadioButton value="auth-unpw" color={colours.primary}/>
                            <Text style={{marginTop: spacings.xs, fontSize: fonts.sm}}>
                                Username and Password
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <RadioButton value="auth-token" color={colours.primary}/>
                            <Text style={{marginTop: spacings.xs, fontSize: fonts.sm}}>
                                Token
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <RadioButton value="auth-cert" color={colours.primary}/>
                            <Text style={{marginTop: spacings.xs, fontSize: fonts.sm}}>
                                Client Certificate and Key
                            </Text>
                        </View>

                    </View>
                </RadioButton.Group>

                <View>
                    { checked === 'auth-unpw' ?
                        <View>
                            <TextInput
                                onChangeText={text => setData({ ...data, username: text })}
                                style={commonStyles.textInput}
                                label="Username"
                                placeholder="Enter Username Here"
                            />
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={text => setData({ ...data, password: text })}
                                style={commonStyles.textInput}
                                label="Password"
                                placeholder="Enter Password Here"
                            />
                        </View>
                        : checked === 'auth-token' ? 
                        <View>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={text => setData({ ...data, token: text })}
                                style={commonStyles.textInput}
                                label="Token"
                                placeholder="Enter Token Here"
                            />                                
                        </View>
                        : 
                        <View>
                            <TextInput
                                onChangeText={text => setData({ ...data, clientCert: text })}
                                style={commonStyles.textInput}
                                label="Client Certificate"
                                placeholder="Enter Client Certificate Here"
                            />
                            <TextInput
                                onChangeText={text => setData({ ...data, clientKey: text })}
                                style={commonStyles.textInput}
                                label="Client Key"
                                placeholder="Enter Client Key Here"
                            />         
                        </View>
                    }
                </View>

                <SubmitButton 
                    text="Submit" 
                    onPress={() => ContentUpload()}
                />

            </ScrollView>
        </View>
    );
}
