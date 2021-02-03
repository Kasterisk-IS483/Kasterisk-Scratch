import React from "react"
import { View, Text } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ProgressCircle from 'react-native-progress-circle'

import {
    commonStyles,
    colours
} from "../utils/styles.js";
export default function DeploymentCard({healthReady = "1", healthTotal = "1", name = "cluster", label = "label", age = "0", container = "container" }) {
   
    const deloymentDisplay = healthReady + "/" + healthTotal
    const percentage = healthReady / healthTotal * 100
    const statusColorCode = percentage==100 ? colours.green : colours.orange

    return (
        <View>
            <Card style={{
                borderLeftColor: statusColorCode,
                borderLeftWidth: 5,
                width: 600,
            }}>
                <Card.Content style={commonStyles.card}>
                    <View style={commonStyles.circle}>
                        <ProgressCircle
                            percent={percentage}
                            radius={60}
                            borderWidth={8}
                            color={colours.green}
                            shadowColor={colours.orange}
                            bgColor={colours.secondary}
                        >
                            <Text style={{ fontSize: 18 }}>{deloymentDisplay}</Text>
                        </ProgressCircle>
                    </View>


                    <View style = {commonStyles.cardInfo}>
                        <Title style={commonStyles.cardInfoText}>{name}</Title>
                        <Title style={commonStyles.cardInfoText}>Label:</Title>
                        <Title style={commonStyles.cardInfoText}>{label}</Title>
                        <Title style={commonStyles.cardInfoText}>Age: {age}</Title>
                        <Title style={commonStyles.cardInfoText}>Containers: {container}</Title>
                    </View>

                </Card.Content>
            </Card>
        </View>

    )

}