import React from "react"
import { View, Text, ScrollView } from "react-native"
import FormBuilder from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Colors, Button } from "react-native-paper";

import { commonStyles } from "../utils/styles.js";

export default function KubeconfigContentScreen({ navigation }) {
    const form = useForm({
        defaultValues: {
            name: "",
            server: "",
            certificate: "",
            username: "",
            password: "",
            token: "",
        },
        mode: "onSubmit",
    });

    return (
        <View style={commonStyles.whiteContainer}>
            <ScrollView contentContainerStyle={commonStyles.scrollView}>

                <Text style={commonStyles.heading}>Add Kubeconfig Content</Text>

                <FormBuilder
                    form={form}
                    formConfigArray={[
                        {
                            type: "input",
                            name: "name",
                            label: "Name (required)",
                            rules: {
                                required: {
                                    value: true,
                                    message: "Kubeconfig name is required",
                                },
                            },
                            textInputProps: {
                                autoCapitalize: "none",
                            },
                        },
                        {
                            type: "input",
                            name: "server",
                            label: "Server (required)",
                            rules: {
                                required: {
                                    value: true,
                                    message: "Kubeconfig server is required",
                                },
                            },
                            textInputProps: {
                                autoCapitalize: "none",
                            },
                        },
                        {
                            type: "input",
                            name: "certificate",
                            label: "Certificate (required)",
                            rules: {
                                required: {
                                    value: true,
                                    message: "Kubeconfig certificate is required",
                                },
                            },
                            textInputProps: {
                                autoCapitalize: "none",
                            },
                        },
                        {
                            type: "input",
                            name: "username",
                            label: "Username (if using UN & PW)",
                            rules: {
                                required: {
                                    value: false,
                                    message: "Kubeconfig username is required",
                                },
                            },
                            textInputProps: {
                                autoCapitalize: "none",
                            },
                        },
                        {
                            type: "input",
                            name: "password",
                            label: "Password (if using UN & PW)",
                            rules: {
                                required: {
                                    value: false,
                                    message: "Kubeconfig password is required",
                                },
                            },
                            textInputProps: {
                                autoCapitalize: "none",
                                secureTextEntry: true,
                            },
                        },
                        {
                            type: "input",
                            name: "token",
                            label: "Token (if using Token)",
                            rules: {
                                required: {
                                    value: false,
                                    message: "Kubeconfig token is required",
                                },
                            },
                            textInputProps: {
                                autoCapitalize: "none",
                            },
                        },
                    ]}>
                    
                    <View style={commonStyles.centralise}>
                        <Button
                            style={commonStyles.actionButton}
                            mode={"contained"}
                            color={Colors.blue500} 
                            onPress={form.handleSubmit((data) => {
                                alert(data.name);
                            })}>
                            Submit
                        </Button>  
                    </View>

                </FormBuilder>

            </ScrollView>
        </View>
    );
}
