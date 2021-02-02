import React, { Component } from "react";
import { Text, Image, View, ScrollView, Dimensions } from "react-native";

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
                <Text>deployment</Text>
            </View>
        );
    }
}
