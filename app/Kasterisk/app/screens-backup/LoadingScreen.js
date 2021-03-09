import React from "react";
import { View, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { colours, commonStyles } from "../utils/styles.js";

export default function LoadingScreen({ navigation }) {
    return (
        <View style={commonStyles.secondaryContainer}>
            <ScrollView
                contentContainerStyle={[
                    commonStyles.scrollContainer,
                    { ...commonStyles.centralise },
                ]}
            >
                <ActivityIndicator animating={true} color={colours.primary} />
            </ScrollView>
        </View>
    );
}
