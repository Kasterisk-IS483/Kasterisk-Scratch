import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from "react-native"
import { TextInput, RadioButton } from "react-native-paper";

import ActionButton from "../components/ActionButton";
import { fonts, colours, commonStyles } from "../utils/styles.js";

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
          missingData += "\tname\n";
        }
        if (data.server == '') {
            missingData += "\tserver\n";
        }
        if (data.certificate == '') {
            missingData += "\tcertificate\n";
        }

        if (checked === 'auth-unpw') {
            if (data.username == '') {
                missingData += "\tusername\n";
            }
            if (data.password == '') {
                missingData += "\tpassword\n";
            }
        } 
        if (checked === 'auth-token') {
            if (data.token == '') {
                missingData += "\ttoken\n";
            }            
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
                    <Text style={{ paddingLeft: 25, paddingBottom: 10, fontSize: fonts.md, fontWeight: 'bold' }}>General Information:</Text>

                    <TextInput 
                        onChangeText={text => setData({ ...data, name: text })                }
                        style={commonStyles.textInput}
                        label="Name"
                    />
                    <TextInput
                        onChangeText={text => setData({ ...data, server: text })                }
                        style={commonStyles.textInput}
                        label="Server"
                    />
                    <TextInput
                        onChangeText={text => setData({ ...data, certificate: text })                }
                        style={commonStyles.textInput}
                        label="Certificate Authority Data"
                    />


                    <Text style={{ paddingLeft: 25, paddingTop: 25, paddingBottom: 10, fontSize: fonts.md, fontWeight: 'bold' }}>Authentication Mode:</Text>
                    <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                        <View style={{marginLeft: 20, marginBottom: 5}}>
                            <View style={{flexDirection: 'row'}}>
                                <RadioButton value="auth-unpw" color={colours.secondary}/>
                                <Text style={{marginTop: 8, fontSize: fonts.sm}}>Username and Password</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <RadioButton value="auth-token" color={colours.secondary}/>
                                <Text style={{marginTop: 8, fontSize: fonts.sm}}>Token</Text>
                            </View>
                        </View>
                    </RadioButton.Group>

                    <View>
                        {
                            checked === 'auth-unpw' ?
                            <View>
                                <TextInput
                                    onChangeText={text => setData({ ...data, username: text })}
                                    style={commonStyles.textInput}
                                    label="Username"
                                />
                                <TextInput
                                    onChangeText={text => setData({ ...data, password: text })}
                                    style={commonStyles.textInput}
                                    label="Password"
                                />
                            </View>
                            : <View>
                                <TextInput
                                    onChangeText={text => setData({ ...data, token: text })}
                                    style={commonStyles.textInput}
                                    label="Token"
                                />                                
                            </View>
                        }
                    </View>

                </View>

                <ActionButton text="Submit" onPress={() => ContentUpload()}
                />

            </ScrollView>
        </View>
    );
}
