import React from "react"
import { View, StyleSheet, ImageBackground, ScrollView, Text } from "react-native"
import FormBuilder from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";

function BasicExample() {
    const form = useForm({
        defaultValues: {
            content: "",
        },
        mode: "onChange",
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
                    <Text style={styles.headingStyle}>Kubeconfig</Text>

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
                            onPress={form.handleSubmit((data: any) => {
                                console.log("form data", data);
                            })}>
                            Submit
                        </Button>
                    </FormBuilder>
                </ScrollView>

            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },

    scrollViewStyle: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
    },

    headingStyle: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 40,
        color: "white",
    },
    container: {
        flex: 1,
        flexDirection: "row",
    },
    leftContainer: {
        flex: 1.5,
    },
    rightContainer: {
        flex: 1,
        backgroundColor: "#265395",
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    buttonContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    addButton: {
        width: 200,
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: "#FFFFFF",
        width: "90%",
        margin: 10,
    },
});

export default BasicExample;
