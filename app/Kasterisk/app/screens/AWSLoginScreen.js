import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { TextInput, Button, Colors } from "react-native-paper";
import { commonStyles } from "../styles.js";
import { checkAwsCredentials } from "../api/AwsApi.js"


const AWSLoginScreen = ({ navigation }) => {

    const [loginState, setLoginState] = useState({
        accessKeyId: '',
        secretAccessKey: '',
    });

    const AwsLogin = async () => {
        if (loginState.accessKeyId !== '' && loginState.secretAccessKey !== '') {
            try {
                const isValidCredentials = await (
                    checkAwsCredentials(loginState)
                );
                if (isValidCredentials) {
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Invalid Credentials', 'Please enter valid access keys and ensure you have correct permissions.');
                }
            } catch (err) {
                Alert.alert('Invalid Credentials', 'Please enter valid access keys and ensure you have correct permissions.');
            }
        } else {
            Alert.alert('Invalid Entry', 'Please enter Access Key ID and Secret Access Key.');
        }
    };

    return (
        <View style={commonStyles.whiteContainer}>
            <ScrollView contentContainerStyle={commonStyles.scrollView}>
                <Text style={commonStyles.heading}>AWS Login</Text>
                <View>
                    <View>
                        <TextInput
                            onChangeText={text =>
                                setLoginState({ ...loginState, accessKeyId: text })
                            }
                            label="Access Key ID"
                            placeholder="Enter Access Key ID Here"
                        />
                    </View>
                    <View >
                        <TextInput
                            onChangeText={text =>
                                setLoginState({ ...loginState, secretAccessKey: text })
                            }
                            label="Secret Access Key"
                            placeholder="Enter Secret Access Key Here"
                        />
                    </View>
                </View>
                <View style={{ ...commonStyles.centralise, margin: 15 }}>
                    <Button
                        style={commonStyles.actionButton}
                        mode={"contained"}
                        color={Colors.blue500}
                        onPress={() => AwsLogin()}>
                        AWS Sign In
                        </Button>
                </View>
            </ScrollView>
        </View>
    );
};

export default React.memo(AWSLoginScreen);