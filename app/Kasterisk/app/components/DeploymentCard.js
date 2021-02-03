import React from "react"
import { View, Text } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
    commonStyles,
} from "../utils/styles.js";
export default function DeploymentCard({ status = "ready", name = "cluster", label = "label", age = "0", container = "container" }) {
    const statusColorCode = status === 'ready' ? '#20B408' : '#ED952F'
    
    return (
        <View>
            <Card style={{
                borderLeftColor: statusColorCode,
                borderLeftWidth: 5,
                width: 600,
            }}>
                <Card.Content>
                    <Title>{name}</Title>
                    <Title>Label: {label}</Title>
                    <Title>Age: {age}</Title>
                    <Title>Containers: {container}</Title>
                </Card.Content>
            </Card>
        </View>

    )

}