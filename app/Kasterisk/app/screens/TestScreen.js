import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { TextInput } from "react-native-paper";

import ActionButton from "../components/ActionButton";
import { commonStyles } from "../utils/styles.js";
import PodApi from "../api/PodApi.js";
import * as SecureStore from 'expo-secure-store';




export default function TestScreen({ navigation }) {

    const [namespaceState, setNamespaceState] = useState({
        namespace: ''
    });

    const getCert1 = async () => {
        cert1 = await SecureStore.getItemAsync("certificate-authority-data");
    }

    const getCert2 = async () => {
        cert2 = await SecureStore.getItemAsync("client-key-data");
    }

    const test = async () => {
        try {

            const namespace1 = await (
                PodApi.listAllNamespace()
            );

            // namespace1 = JSON.parse(namespace1);
            //Alert.alert(response);


            //console.log(response);
            setNamespaceState({ ...namespaceState, namespace: namespace1 });
            Alert.alert(namespace1, namespaceState.namespace);

        } catch (err) {
            console.log(err);
            Alert.alert('Invalid Credentials', 'didd not nav - catch.');
        }

    }




        return (
            <View style={commonStyles.whiteContainer} >
                <ScrollView contentContainerStyle={commonStyles.scrollView}>
                    <Text style={commonStyles.heading}>test</Text>

                    <ActionButton
                        text="test"
                        onPress={() => test()}
                    />

                    <Text style={commonStyles.heading}>
                        Welcome, {namespaceState.namespace}, {getCert1()}, {getCert2()}
                    </Text>

                </ScrollView>
            </View>
        );

}
