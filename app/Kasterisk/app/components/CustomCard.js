import React from "react"
import { View } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper';

export default function CustomCard({ image }) {
    return (
        <View>
            <Card>
                <Card.Cover source={image} />
                <Card.Content>
                    <Title>Ready</Title>
                </Card.Content>
                <Card.Content>
                    <Title>Not Ready</Title>
                </Card.Content>
            </Card>
        </View>

    )

}