import React from "react"
import { View, Text } from "react-native"
import { Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
    colours,
    spacings,
    commonStyles,
} from "../../utils/styles.js";

import StatusCircle from "../elements/StatusCircle";
import LabelButton from "../buttons/LabelButton";

export default function Workkladrd({ 
    name, 
    label, 
    age, 
    status,
    total = null,
    variableField, 
    variableFieldVal,
}) {

    let percent;
    let statusCondition;
    let statusColorCode;
    let statusDisplay;
    let progressColor;
    let progressShadowColor;
    let progressBgColor;
    let fontColor;

    if (variableField == "Containers") {
        percent = status / total * 100;    // healthReady / healthTotal * 100
        statusCondition = percent == 100;
        statusDisplay = status + "/" + total;
        statusColorCode = statusCondition ? colours.green : colours.orange;

        progressColor = colours.green;
        progressShadowColor = colours.orange;
        progressBgColor = "white";
        fontColor = "black" 

    } else if (variableField == "Restarts") {
        percent = 100;
        statusCondition = status.toLowerCase() == "running";
        statusDisplay = statusCondition ? "Running" : "Pending";
        statusColorCode = statusCondition ? colours.green : colours.orange;

        progressColor = statusColorCode;
        progressShadowColor = statusColorCode;
        progressBgColor = statusColorCode;
        fontColor = "white" 
    }

    return (
        <View>
            <Card elevation={10} style={{
                borderLeftColor: statusColorCode,
                borderLeftWidth: 5,
                width: 380,
            }}>
                <Card.Content style={{
                    paddingLeft: spacings.md,
                    flexDirection: 'row',
                }}>

                    <StatusCircle
                        borderWidth={8}
                        percent={percent} 
                        radius={60}
                        progressColor={progressColor}
                        progressShadowColor={progressShadowColor}
                        progressBgColor={progressBgColor}
                        fontColor={fontColor}
                        text={statusDisplay}
                    />

                    <View style={commonStyles.cardInfo}>
                        <Title style={commonStyles.cardInfoLeftText}>{name}</Title>

                        <Title style={commonStyles.cardInfoLeftText}>Labels:</Title>
                        <View style={commonStyles.cardInfoLeftText}>
                            <LabelButton text={label} />
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Title style={commonStyles.cardInfoLeftText}>Age:</Title>
                            <Text style={commonStyles.cardInfoRightText}>
                                {age} {age<=1 ? "Day" : "Days"}
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Title style={commonStyles.cardInfoLeftText}>{variableField}:</Title>
                            <Text style={commonStyles.cardInfoRightText}>{variableFieldVal}</Text>
                        </View>
                    </View>

                </Card.Content>
            </Card>
        </View>

    )

}