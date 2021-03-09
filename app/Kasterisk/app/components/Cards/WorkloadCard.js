import React from "react"
import { View, Text } from "react-native"
import { Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
    fonts,
    colours,
    spacings,
    cardsOuterPadding,
    commonStyles,
} from "../../utils/styles.js";

import StatusCircle from "../Elements/StatusCircle";

export default function WorkloadCard(props) {

    let percent;
    let statusCondition;
    let statusColorCode;
    let statusDisplay;
    let progressColor;
    let progressShadowColor;
    let progressBgColor;
    let fontColor;

    if (props.variableField == "Containers") {
        percent = props.status / props.total * 100;    // healthReady / healthTotal * 100
        statusCondition = percent == 100;
        statusDisplay = props.status + "/" + props.total;
        statusColorCode = statusCondition ? colours.green : colours.orange;

        progressColor = colours.green;
        progressShadowColor = colours.orange;
        progressBgColor = "white";
        fontColor = "black"

    } else if (props.variableField == "Restarts") {
        percent = 100;
        statusCondition = props.status.toLowerCase() == "running";
        statusDisplay = statusCondition ? "Running" : "Pending";
        statusColorCode = statusCondition ? colours.green : colours.orange;

        progressColor = statusColorCode;
        progressShadowColor = statusColorCode;
        progressBgColor = statusColorCode;
        fontColor = "white"
    }

    return (
        <View style={{ 
                flexDirection: 'row', 
                padding: cardsOuterPadding, 
            }}>
            <Card elevation={10} style={{
                borderLeftColor: statusColorCode,
                borderLeftWidth: 5,
                width: 380,
            }}>
                <Card.Content style={commonStyles.cardContent}>
                    <StatusCircle
                        borderWidth={8}
                        radius={60}
                        percent={percent}
                        progressColor={progressColor}
                        progressShadowColor={progressShadowColor}
                        progressBgColor={progressBgColor}
                        fontColor={fontColor}
                        text={statusDisplay}
                    />

                    <View style={{    
                        flex: 1,
                        marginLeft: spacings.sm,
                        marginBottom: spacings.sm,
                        justifyContent: 'center',
                    }}>
                        <Title style={commonStyles.cardTitle}>
                            {props.name}
                        </Title>

                        <View style={commonStyles.fieldsContainer}>
                            <Title style={commonStyles.workloadCardInfoLeftText}>Age:</Title>
                            <Text style={commonStyles.workloadCardInfoRightText}>
                                {props.age} {props.age <= 1 ? "Day" : "Days"}
                            </Text>
                        </View>

                        <View style={commonStyles.fieldsContainer}>
                            <Title style={commonStyles.workloadCardInfoLeftText}>{props.variableField}:</Title>
                            <Text style={commonStyles.workloadCardInfoRightText}>{props.variableFieldVal}</Text>
                        </View>

                    </View>

                </Card.Content>

                <Card.Content style={commonStyles.workloadCardLabelContainer}>
                    {props.children}
                </Card.Content>
            </Card>
        </View>
    )

}