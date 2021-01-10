import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableHighlight, Alert } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import { commonStyles } from "../styles.js";

// import Amplify from '@aws-amplify/core'
// import config from '../../aws-exports'
// Amplify.configure(config)

// var AWS = require('aws-sdk/dist/aws-sdk-react-native');

export default function AWSLoginScreen({ navigation }) {
    const [loginState, setLoginState] = useState({
        accessKeyId: '',
        secretAccessKey: '',
    });

    const handleAwsLoginPress = async () => {
        if (loginState.accessKeyId !== '' && loginState.secretAccessKey !== '') {
            const isValidCredentials = await AwsApi.fetchEksClusterNames('us-west-2', credentials);
            if (isValidCredentials) {
                navigation.navigate('Home');
            } else {
                Alert.alert('Invalid Credentials', 'Please enter valid access keys and ensure you have correct permissions.');
            }
        } else {
            Alert.alert('Invalid Entry', 'Please enter Access Key ID and Secret Access Key.');
        }
    };
    // state = {
    //     username: '',
    //     password: '',
    //     phone_number: '',
    //     email: '',
    //     authCode: '',
    //     user: {}
    // }
    // async signUp() {
    //     const { username, password, email, phone_number } = this.state
    //     await Auth.signUp({
    //         username,
    //         password,
    //         attributes: { email, phone_number }
    //     })
    //     console.log('sign up successful!')
    // }
    // async confirmSignUp() {
    //     const { username, authCode } = this.state
    //     await Auth.configSignignUp(username, authCode)
    //     console.log('confirm sign up successful!')
    // }
    // async signIn() {
    //     const { username, password } = this.state
    //     const user = await Auth.signIn(username, password)
    //     this.setState({ user })
    //     console.log('sign in successful!')
    // }
    // async confirmSignIn() {
    //     const { user, authCode } = this.state
    //     await Auth.configSignignIn(user, authCode)
    //     console.log('user now successfully signed in to the app!!')
    // }



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
                <View>
                    <Button
                        underlayColor={'#1621CF'}
                        onPress={() => handleAwsLoginPress()}>
                        <Text>Sign in with AWS</Text>
                    </Button>
                </View>



            </ScrollView>
        </View>
    );
}

// export default withAuthenticator(AWSLoginScreen, { includeGreetings: true })