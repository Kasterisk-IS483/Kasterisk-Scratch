import React from "react"
import { View, Text, ScrollView } from "react-native"
import FormBuilder from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { commonStyles } from "../styles.js";

export default function KubeconfigContentScreen({ navigation }) {
    const form = useForm({
        defaultValues: {
            content: "",
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
                            name: "content",
                            label: "Content",
                            rules: {
                                required: {
                                    value: true,
                                    message: "Kubeconfig content is required",
                                },
                            },
                            textInputProps: {
                                autoCapitalize: "none",
                            },
                        },
                    ]}>
                    <Button
                        mode={"contained"}
                        onPress={form.handleSubmit((data) => {
                            alert(data.content);
                        })}>
                        Submit
                    </Button>
                </FormBuilder>
            </ScrollView>
        </View>
    );
}
