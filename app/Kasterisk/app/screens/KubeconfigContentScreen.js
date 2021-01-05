import React from "react"
import { View, Text, ScrollView } from "react-native"
import FormBuilder from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Colors, Button } from "react-native-paper";
import { commonStyles } from "../styles.js";

export default function KubeconfigContentScreen({ navigation }) {
    const form = useForm({
        defaultValues: {
            name: "",
            server: "",
            certificate: "",
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
                            label: "Name",
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
                            label: "Server",
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
                            label: "Certificate",
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
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin:15}}>
                        <Button
                            style={commonStyles.actionButton}
                            mode={"contained"}
                            color={Colors.blue500} 
                            onPress={form.handleSubmit((data) => {
                                alert(data.content);
                            })}>
                            Submit
                        </Button>  
                    </View>    
                </FormBuilder>

            </ScrollView>
        </View>
    );
}
