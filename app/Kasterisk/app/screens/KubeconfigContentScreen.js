import React from "react"
import { View, Text, ImageBackground, ScrollView } from "react-native"
import FormBuilder from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import styles from "../styles.js";

export default function KubeconfigContentScreen({ navigation }) {
    const form = useForm({
        defaultValues: {
            content: "",
        },
        mode: "onSubmit",
    });

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <ImageBackground
                    style={styles.container}
                    source={require("../assets/welcome-title-landscape.png")}
                    imageStyle={{ resizeMode: "cover" }}
                />
            </View>

            <View style={styles.rightContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                    <Text style={styles.headingStyle}>Add Kubeconfig content below</Text>

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
        </View>
    );
}
