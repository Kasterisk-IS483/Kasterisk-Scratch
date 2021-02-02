import React from "react"
import { View, Text } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
    commonStyles,
} from "../utils/styles.js";
export default function OverviewCard({ image, type = 'Deployments', screen = "Deployment", ready = 0, notReady = 0 }) {
    const navigation = useNavigation();
    return (
        <View>
            <Card button={true} onPress={() => navigation.navigate(screen)}>
                <Card.Cover source={image} />

                <Text style={commonStyles.workloadType}>
                    {type}
                </Text>


                <Card.Content>
                    <Title>{ready} Ready</Title>
                </Card.Content>
                <Card.Content>
                    <Title>{notReady} Not Ready</Title>
                </Card.Content>

            </Card>
        </View>

    )

}