import React from "react";
import { View, Text } from "react-native";
import ProgressCircle from 'react-native-progress-circle';

import {
    fonts,
    spacings,
    commonStyles,
} from "../../utils/styles.js";

export default function StatusCircle({ 
    percent = 100,
    borderWidth,
    radius,
    progressColor,
    progressShadowColor = "white",
    progressBgColor = "white",
    fontColor = "black",
    text = "",
}) {

    return (
        <View style={{
            ...commonStyles.centralise,
            paddingVertical: spacings.sm,
            paddingRight: spacings.md,
        }}>
            <ProgressCircle
                borderWidth={borderWidth}
                percent={percent}
                radius={radius}
                color={progressColor}
                shadowColor={progressShadowColor}
                bgColor={progressBgColor}
            >
                <Text style={{ 
                    fontSize: fonts.lg, 
                    fontWeight: "bold", 
                    color: fontColor, 
                }}>
                    {text}
                </Text>
            </ProgressCircle>
        </View>
    )

}