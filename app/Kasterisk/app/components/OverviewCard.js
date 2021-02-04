import React from "react"
import { View, Text } from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { fonts, spacings } from "../utils/styles.js";

export default function OverviewCard({ image, name, ready = 0, notReady = 0 }) {

    return (
        <View style={{ paddingVertical: spacings.sm }}>
            {/* <Card button={true} onPress={() => navigation.navigate(screen)}> */}
            <Card>
                <Card.Cover source={image} />

                <Text style={{
                    position: "absolute",
                    left: "5%",
                    top: "55%",
                    textAlign: "left",
                    color: "white",
                    fontSize: fonts.xl,
                    fontWeight: "bold",
                }}>
                    {name}
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