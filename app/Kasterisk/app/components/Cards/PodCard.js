import React from "react"
import { View, Text } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ProgressCircle from 'react-native-progress-circle'

import {
    commonStyles,
    colours
} from "../../utils/styles.js";
export default function PodCard({status= "Running", name = "cluster", label = "label", age = "1", restart = "0" }) {
   
    const statusColorCode = status.toLowerCase()=="running" ? colours.green : colours.orange
    const statusDisplay = status.toLowerCase()=="running" ? "Running" : "Pending"
    const days = age<=1 ? "Day" : "Days"

    return (
        <View>
            <Card style={{
                borderLeftColor: statusColorCode,
                borderLeftWidth: 5,
                width: 380,
            }}>
                <Card.Content style={commonStyles.card}>
                    <View style={commonStyles.circle}>
                        <ProgressCircle
                            percent={100}
                            radius={60}
                            borderWidth={8}
                            color={statusColorCode}
                            shadowColor={statusColorCode}
                            bgColor={statusColorCode}
                        >
                            <Text style={{ fontSize: 18, color:"white", fontWeight:"bold"}}>{statusDisplay}</Text>
                        </ProgressCircle>
                    </View>


                    <View style = {commonStyles.cardInfo}>
                        <Title style={commonStyles.cardInfoText}>{name}</Title>
                        <Title style={commonStyles.cardInfoText}>Label:</Title>
                        <Title style={commonStyles.cardInfoText}>{label}</Title>
                        <Title style={commonStyles.cardInfoText}>Age: {age} {days}</Title>
                        <Title style={commonStyles.cardInfoText}>Restarts: {restart} </Title>
                    </View>

                </Card.Content>
            </Card>
        </View>

    )

}