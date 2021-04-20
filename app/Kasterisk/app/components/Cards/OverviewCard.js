import React from "react";
import { View, Text } from "react-native";
import { Card, Title } from 'react-native-paper';

import {
  colours,
  fonts,
  spacings,
  cardsOuterPadding,
  commonStyles,
} from "../../utils/styles";

import StatusCircle from "../Elements/StatusCircle";

export default function OverviewCard({
  image,
  name = "",
  text1 = "Ready",
  text2 = "Not Ready",
  text3 = "Succeeded",
  text4 = "Failed",
  no1 = "0",
  no2 = "0",
  no3 = "0",
  no4 = "0",
}) {

  let col1 = colours.green;
  let col2 = colours.grey;
  let col3 =  colours.grey;
  let col4 =  colours.grey;

  if (no1 == "0") {
    col1 = colours.grey;
  }

  if (no2 != "0") {
    col2 = colours.orange;
  }

  if (no3 != "0") {
    col3 = colours.cta;
  }

  if (no4 != "0") {
    col4 = colours.red;
  }

  const statusCircleBorderWidth = 4;
  const statusCircleRadius = 30;

  return (
    <View style={{
      paddingVertical: cardsOuterPadding,
      borderColor: 'grey',
      minWidth: 250,
    }}>
      <Card elevation={10}>
        <Card.Cover source={image} />

        <Text style={{
          position: "absolute",
          left: "5%",
          top:"26%",
          textAlign: "left",
          color: "white",
          fontWeight: "bold",
          fontSize: fonts.xl,
        }}>
          {name}
        </Text>

        <View style={{ paddingVertical: spacings.lg }}>

          <Card.Content style={commonStyles.overviewCardContent}>
            <StatusCircle
              borderWidth={statusCircleBorderWidth}
              radius={statusCircleRadius}
              progressColor={col1}
              fontColor={col1}
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

          {name=="Pods"? 
          <><Card.Content style={commonStyles.overviewCardContent}>
            <StatusCircle
              borderWidth={statusCircleBorderWidth}
              radius={statusCircleRadius}
              progressColor={col3}
              fontColor={col3}
              text={no3}
            />
            <Title style={commonStyles.overviewCardLabel}>{text3}</Title>

          </Card.Content>

          <Card.Content style={commonStyles.overviewCardContent}>

            <StatusCircle
              borderWidth={statusCircleBorderWidth}
              radius={statusCircleRadius}
              progressColor={col4}
              fontColor={col4}
              text={no4}
            />
            <Title style={commonStyles.overviewCardLabel}>{text4}</Title>

          </Card.Content></>:  
          <><Card.Content style={[commonStyles.overviewCardContent, {height:160}]}>
          </Card.Content></>
          }

        </View>

      </Card>
    </View>
  )

}