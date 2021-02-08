import React from "react"
import { View, Text } from "react-native"
import { Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
    colours,
    fonts,
    spacings,
    cardsOuterPadding,
    commonStyles,
} from "../../utils/styles.js";

import StatusCircle from "../Elements/StatusCircle";

export default function OverviewCard({
    image,
    name = "",
    text1 = "Ready",
    text2 = "Not Ready",
    no1 = "0",
    no2 = "0",
    onPress = null,
}) {

    let col2;

    if (text2 == "Not Ready") {
        col2 = colours.grey;
    } else if (text2 == "Pending") {
        col2 = colours.orange;
    }

    const statusCircleBorderWidth = 4;
    const statusCircleRadius = 30;

    return (
        <View style={{ paddingVertical: cardsOuterPadding }}>
            {/* <Card button={true} onPress={() => navigation.navigate(screen)}> */}
            <Card elevation={10} onPress={onPress}>
                <Card.Cover source={image} />

                <Text style={{
                    position: "absolute",
                    left: "5%",
                    top: "36%",
                    textAlign: "left",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: fonts.xxl,
                }}>
                    {name}
                </Text>

                <View style={{ paddingVertical: spacings.lg }}>

                    <Card.Content style={commonStyles.overviewCardContent}>
                        <StatusCircle
                            borderWidth={statusCircleBorderWidth}
                            radius={statusCircleRadius}
                            progressColor={colours.green}
                            fontColor={colours.green}
                            text={no1}
                        />
                        <Title style={commonStyles.overviewCardLabel}>{text1}</Title>
                    </Card.Content>

                    <Card.Content style={commonStyles.overviewCardContent}>

                        <StatusCircle
                            borderWidth={statusCircleBorderWidth}
                            radius={statusCircleRadius}
                            progressColor={col2}
                            fontColor={col2}
                            text={no2}
                        />
                        <Title style={commonStyles.overviewCardLabel}>{text2}</Title>


                    </Card.Content>

                </View>

            </Card>
        </View>
    )

}