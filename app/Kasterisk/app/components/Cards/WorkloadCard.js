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
import LabelButton from "../Buttons/LabelButton";

export default function WorkloadCard({
    name = "",
    label = "",
    age = "0",
    status = "0",
    total = null,
    variableField = "",
    variableFieldVal = "0",
    onPress = null,
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
        <View style={{ padding: cardsOuterPadding }} onPress={onPress}>
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
                        radius={60}
                        percent={percent}
                        progressColor={progressColor}
                        progressShadowColor={progressShadowColor}
                        progressBgColor={progressBgColor}
                        fontColor={fontColor}
                        text={statusDisplay}
                    />

                    <View style={commonStyles.workloadCardInfo}>
                        <Title style={{ paddingBottom: spacings.sm, fontSize: fonts.lg, fontWeight: 'bold' }}>{name}</Title>

                        <View style={commonStyles.fieldsContainer}>
                            <Title style={commonStyles.workloadCardInfoLeftText}>Age:</Title>
                            <Text style={commonStyles.workloadCardInfoRightText}>
                                {age} {age <= 1 ? "Day" : "Days"}
                            </Text>
                        </View>

                        <View style={commonStyles.fieldsContainer}>
                            <Title style={commonStyles.workloadCardInfoLeftText}>{variableField}:</Title>
                            <Text style={commonStyles.workloadCardInfoRightText}>{variableFieldVal}</Text>
                        </View>


                    </View>

                </Card.Content>

                <Card.Content style={[commonStyles.centralise, {
                    paddingLeft: spacings.md,
                    flexDirection: 'row',
                }]}>

                    <View style={commonStyles.workloadCardLabelContainer}>
                        <View style={commonStyles.workloadCardLabelOuter}>
                            <View style={commonStyles.workloadCardLabel}>
                                <LabelButton text="test" />
                            </View>

                            <View style={commonStyles.workloadCardLabel}>
                                <LabelButton text="testinglongnameabcde" />
                            </View>
                        </View>

                        <View style={commonStyles.workloadCardLabelOuter}>
                            <View style={commonStyles.workloadCardLabel}>
                                <LabelButton text={label} />
                            </View>

                            <View style={commonStyles.workloadCardLabel}>
                                <LabelButton text="ab" />
                            </View>
                        </View>

                    </View>

                </Card.Content>
            </Card>
        </View>
    )

}