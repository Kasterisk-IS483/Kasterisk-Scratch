import React from "react"
import { View, Text } from "react-native"
import { Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { 
    colours,
    fonts, 
    spacings, 
    commonStyles 
} from "../../utils/styles.js";

import StatusCircle from "../elements/StatusCircle";

export default function OverviewCard({ 
    image, 
    name, 
    text1 = "Ready", 
    text2 = "Not Ready", 
    no1 = "0", 
    no2 = "0",
}) {

    let col2;

    if (text2 == "Not Ready") {
        col2 = colours.grey;
    } else if (text2 == "Pending") {
        col2 = colours.orange;
    }

    return (
        <View style={{ paddingVertical: spacings.sm }}>
            {/* <Card button={true} onPress={() => navigation.navigate(screen)}> */}
            <Card elevation={10}>
                <Card.Cover source={image} />

                <Text style={{
                    position: "absolute",
                    left: "5%",
                    top: "36%",
                    textAlign: "left",
                    color: "white",
                    fontSize: fonts.xl,
                    fontWeight: "bold",
                }}>
                    {name}
                </Text>

                <View style={[commonStyles.centralise, { paddingVertical: spacings.lg}]}>

                    <Card.Content style={[ commonStyles.centralise, {flexDirection: 'row'}]}>
                        <StatusCircle 
                            borderWidth={4}
                            radius={30}
                            progressColor={colours.green}
                            fontColor={colours.green}
                            text={no1}
                        />
                        <Title style={{fontSize: fonts.lg, textAlign: "center"}}>{text1}</Title>
                    </Card.Content>
                    
                    <Card.Content style={[ commonStyles.centralise, {flexDirection: 'row'}]}>
                        <StatusCircle 
                            borderWidth={4}
                            radius={30}
                            progressColor={col2}
                            fontColor={col2}
                            text={no2}
                        />
                        <Title style={{fontSize: fonts.lg, textAlign: "center"}}>{text2}</Title>
                    </Card.Content>

                </View>

            </Card>
        </View>
    )

}