import React, { Component } from "react";
import { Text, Image, View, ScrollView, Dimensions } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import DeploymentCard from "../components/DeploymentCard";

import {
    commonStyles,
    landscapeStyles,
    portraitStyles,
} from "../utils/styles.js";



export default class Deployment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orientation: "",
            result: null,
        };
        Dimensions.addEventListener("change", (e) => {
            this.setState(e.window);
        });
    }

    getOrientation() {
        if (Dimensions.get("window").width > Dimensions.get("window").height) {
            return "LANDSCAPE";
        } else {
            return "PORTRAIT";
        }
    }

    getStyle() {
        if (this.getOrientation() === "LANDSCAPE") {
            return landscapeStyles;
        } else {
            return portraitStyles;
        }
    }

    onLayout() {
        this.setState({ orientation: this.getOrientation() });
    }

    render() {

        return (
            <View style={this.getStyle().workloadSummaryMainContainer}>

                <View style={this.getStyle().workloadSummaryRowContainer}>
                    <View style={this.getStyle().deploymentCard}>
                        <View>
                            <DeploymentCard healthReady="4" healthTotal="4" label="app:hellonode" name="hello-node" ></DeploymentCard>
                        </View>
                    </View>
                    <View style={this.getStyle().deploymentCard}>
                        <DeploymentCard healthReady="3" healthTotal="4" label="app:hellonode" name="test"></DeploymentCard>
                    </View>
                </View>

                <View style={this.getStyle().workloadSummaryRowContainer}>
                    <View style={this.getStyle().deploymentCard}>
                        <View>
                            <DeploymentCard healthReady="3" healthTotal="3" label="app:hellonode" name="hello-node2" ></DeploymentCard>
                        </View>
                    </View>
                    <View style={this.getStyle().deploymentCard}>
                        <DeploymentCard healthReady="2" healthTotal="4" label="app:hellonode" name="test2"></DeploymentCard>
                    </View>
                </View>

            </View>
        );
    }
}
