import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Spinner from "react-native-loading-spinner-overlay";

import SubmitButton from "../components/Buttons/SubmitButton";
import { commonStyles } from "../utils/styles.js";

import AwsApi from "../api/AwsApi";
import { AWSRegions } from "../utils/constants";

const AWSLoginScreen = ({ navigation }) => {
    const [loginState, setLoginState] = useState({
        accessKeyId: "",
        secretAccessKey: "",
    });
    const [region, setRegion] = useState();
    const [spinner, setSpinner] = useState(false);

    let awsApi = new AwsApi();

    const AwsLogin = async () => {
        if (
            loginState.accessKeyId !== "" &&
            loginState.secretAccessKey !== ""
        ) {
            setSpinner(true)
            try {
                const isValidCredentials = await AwsApi.checkAwsCredentials(
                    loginState, region
                );
                if (isValidCredentials) {
                    
                    let allClusters = await (AwsApi.describeAllEksClusters(region, loginState));
                    console.log("url : " + allClusters[0].url);
                    const authToken = AwsApi.getAuthToken(allClusters[0].name,loginState, region);
                    console.log("authToken : " + authToken);

                    navigation.navigate("WorkloadSummary");
                } else {
                    alert("1");
                    Alert.alert(
                        "Invalid Credentials",
                        "Please enter valid access keys and ensure you have correct permissions."
                    );
                }
            } catch (err) {
                alert(err);
                Alert.alert(
                    "Invalid Credentials",
                    "Please enter valid access keys and ensure you have correct permissions."
                );
            }
        } else {
            Alert.alert(
                "Invalid Entry",
                "Please enter Access Key ID and Secret Access Key."
            );
        }
        setSpinner(false)
    };

    const AWSRegionList = () => {
        return (
            <Picker
                selectedValue={region}
                style={{ height: 50, width: 500 }}
                onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
            >
                {AWSRegions.map((_item, _index) => (
                    <Picker.Item
                        label={_item.label}
                        value={_item.value}
                        key={_item.value}
                    />
                ))}
            </Picker>
        );
    };

    return (
        <View style={commonStyles.whiteContainer}>
            <Spinner
                    visible={spinner}
                    textContent={"Loading..."}
                    textStyle={{color: '#FFF'}}
                />
            <ScrollView contentContainerStyle={commonStyles.scrollView}>
                <Text style={commonStyles.heading}>AWS Login</Text>
                <View>
                    <TextInput
                        onChangeText={(text) =>
                            setLoginState({ ...loginState, accessKeyId: text })
                        }
                        style={commonStyles.textInput}
                        label="Access Key ID"
                        placeholder="Enter Access Key ID Here"
                    />
                    <TextInput
                        onChangeText={(text) =>
                            setLoginState({
                                ...loginState,
                                secretAccessKey: text,
                            })
                        }
                        label="Secret Access Key"
                        style={commonStyles.textInput}
                        placeholder="Enter Secret Access Key Here"
                    />
                    {AWSRegionList()}
                </View>
                <SubmitButton text="Sign In" onPress={() => AwsLogin()} />
            </ScrollView>
        </View>
    );
};

export default React.memo(AWSLoginScreen);
