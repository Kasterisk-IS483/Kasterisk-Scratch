import React from "react"
import { View, Text } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper';

import {
    commonStyles,
} from "../utils/styles.js";
export default function CustomCard({ image, type = 'Deployments', ready = 0, notReady = 0 }) {
    return (
        <View>
            <Card>
                <Card.Cover source={image} />
                <Text style={commonStyles.workloadType}>
                    {type}
                </Text>
                <View>
                    <Card.Content>
                        {/* <Title>{ready} Ready</Title> */}
                        <Title>Ready</Title>
                    </Card.Content>
                    <Card.Content>
                        <Title>{notReady} Not Ready</Title>
                    </Card.Content>
                </View>

            </Card>
        </View>

    )

}