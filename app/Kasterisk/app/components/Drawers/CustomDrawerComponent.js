import React, { Component } from "react";
import { createDrawerNavigator, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { View, Image, SafeAreaView, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalDropdown from "react-native-modal-dropdown";
import SplashScreen from "react-native-splash-screen";

import { spacings, colours, fonts, commonStyles } from "../../utils/styles.js";
import { checkServerStatus } from "../../api/KubeApi";
import WorkloadSummaryScreen from "../../screens/WorkloadSummaryScreen";
import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";
const Drawer = createDrawerNavigator();
const screenOptions = {
    headerTintColor: "white",
    headerStyle: { backgroundColor: colours.primary },
    headerShown: true,
};
export default class CustomDrawerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            namespaceLabels: ["All Namespaces"],
            selectedNamespace: "All Namespaces",
            selectedValue: ""
        };
        this.updateState = this.updateState.bind(this);
    };


    workloadDeploymentScreen = () => {
        return (
            <WorkloadSummaryScreen index={1} />
        );
    };
    workloadReplicasetScreen = () => {
        return (
            <WorkloadSummaryScreen index={2} />
        );
    };
    workloadPodScreen = () => {
        return (
            <WorkloadSummaryScreen index={3} />
        );
    };
    filter = () => {
        return (
            <View style={{ flexDirection: "row" }}>
                <ModalDropdown
                    options={this.state.namespaceLabels}
                    dropdownStyle={{ height: 40 * this.state.namespaceLabels.length, alignItems: "center" }}
                    dropdownTextStyle={{ fontSize: fonts.sm, color: "black" }}
                    textStyle={{ fontSize: fonts.sm, color: "white", marginRight: spacings.xxs }}
                    customButton="⋮"
                    defaultValue={this.state.selectedNamespace}
                    onSelect={async (index) => this.updateState(this.state.namespaceLabels[index])}
                />
                <Text style={{ color: "white", marginRight: spacings.sm }}>▼</Text>
            </View>
        );
    };

    async updateState(selectedNamespace) {
        let selectedValue = "";
        if (selectedNamespace != "All Namespaces") {
            selectedValue = selectedNamespace;
        }
        await AsyncStorage.setItem("@selectedValue", selectedValue);
        this.setState({
            selectedNamespace: selectedNamespace,
            selectedValue: selectedValue,
        })
    }

    async componentDidMount() {
        SplashScreen.hide();
        this.setState({
            spinner: true,
        });
        try {
            let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
            if (defaultCluster != null) {
                let serverStatus = await checkServerStatus(defaultCluster);
                if (serverStatus[0] == 200) {
                    this.setState({
                        namespaceLabels: await WorkloadSummaryApi.namespaceLabels2(),
                    });
                    await AsyncStorage.setItem("@selectedValue", "")
                } else {
                    Alert.alert("Error", "Failed to contact cluster");
                }
            }
            console.log("componentDidMount");
        } catch (err) {
            Alert.alert("Server Check Failed", err.message);
        }
        this.setState({
            spinner: false,
        });
    }

    render() {
        return (
            <Drawer.Navigator
                initialRouteName="WorkloadSummary"
                screenOptions={screenOptions}
                drawerStyle={{ backgroundColor: "white" }}
                drawerContentOptions={{
                    activeTintColor: colours.primary /* font color for active screen label */,
                    activeBackgroundColor: colours.secondary /* bg color for active screen */,
                    inactiveTintColor: "black" /* Font color for inactive screens" labels */,
                }}
                contentOptions={{ labelStyle: fonts.md }}
                drawerContent={(props) => {
                    return (
                        <SafeAreaView style={{ flex: 1 }}>
                            <View style={{
                                height: 150,
                                margin: spacings.sm,
                                ...commonStyles.centralise,
                            }}>
                                <Image
                                    source={require("../../assets/kasterisk-logo.png")}
                                    style={{ height: "40%", width: "100%" }}
                                />

                            </View>
                            <DrawerItem
                                labelStyle={{ fontSize: fonts.md, color: "black" }}
                                label="Change Cluster"
                                onPress={async () => {
                                    let previousCluster = await AsyncStorage.getItem("@defaultCluster");
                                    await AsyncStorage.removeItem("@defaultCluster");
                                    props.navigation.replace("ChooseCluster", { previous: previousCluster });
                                }}
                            />
                            {/* <View style={commonStyles.centralise}><View style={{ borderWidth: 1, color: "black", width: "90%" }}></View></View> */}
                            <DrawerItemList {...props} labelStyle={{ fontSize: fonts.md }} />
                        </SafeAreaView>
                    );
                }}
            >
                <Drawer.Screen
                    name="WorkloadSummary"
                    component={WorkloadSummaryScreen}
                    options={{ drawerLabel: "Workload Overview", title: "Workloads", headerRight: this.filter }}
                />
                {/* <View style={commonStyles.centralise}><View style={{ borderWidth: 1, color: "black", width: "90%" }}></View></View> */}
                <Drawer.Screen
                    name="WorkloadDeployments"
                    component={this.workloadDeploymentScreen}
                    options={{ drawerLabel: "Deployments", title: "Workloads", headerRight: this.filter }}
                />
                <Drawer.Screen
                    name="WorkloadReplicasets"
                    component={this.workloadReplicasetScreen}
                    options={{ drawerLabel: "Replicasets", title: "Workloads", headerRight: this.filter }}
                />
                <Drawer.Screen
                    name="WorkloadPods"
                    component={this.workloadPodScreen}
                    options={{ drawerLabel: "Pods", title: "Workloads", headerRight: this.filter }}
                />
            </Drawer.Navigator >
        );
    }
}