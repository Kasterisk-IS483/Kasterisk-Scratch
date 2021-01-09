import React from 'react'
import { View, Text } from 'react-native'
import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify from '@aws-amplify/core'
import config from '../../aws-exports'
Amplify.configure(config)

// var AWS = require('aws-sdk/dist/aws-sdk-react-native');

class AWSLoginScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>AWS Login</Text>
            </View>
        )
    }
}

export default withAuthenticator(AWSLoginScreen, { includeGreetings: true })