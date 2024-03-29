import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Card, Title } from 'react-native-paper';

import {
  colours,
  spacings,
  commonStyles,
} from "../../utils/styles";

import StatusCircle from "../Elements/StatusCircle";

export default function WorkloadCard(props) {

  let percent;
  let statusCondition;
  let statusColorCode;
  let statusDisplay;
  let progressColor;
  let progressShadowColor;
  let progressBgColor;
  let fontColor;
  let cardWidth;
  //pods
  let statusConditionRunning;
  let statusConditionSucceeded;
  let statusConditionPending;
  let statusConditionFailed;

  if (props.variableField == "Containers") {
    percent = props.status / props.total * 100;    // healthReady / healthTotal * 100
    statusCondition = percent == 100;
    statusDisplay = props.status + "/" + props.total;
    statusColorCode = statusCondition ? colours.green : colours.orange;

    progressColor = colours.green;
    progressShadowColor = colours.orange;
    progressBgColor = "white";
    fontColor = "black"

  } else if (props.variableField == "Restarts") {
    percent = 100;
    statusConditionRunning = props.status.toLowerCase() == "running" 
    statusConditionSucceeded= props.status.toLowerCase() == "succeeded" 
    statusConditionFailed= props.status.toLowerCase() == "failed" 
    statusConditionPending= props.status.toLowerCase() == "pending" 
    if(statusConditionRunning){
      statusDisplay = "Running" 
      statusColorCode=colours.green
    }else if (statusConditionPending){
      statusDisplay = "Pending";
      statusColorCode = colours.orange;
    }else if(statusConditionSucceeded){
      statusDisplay = "Succeeded";
      statusColorCode = colours.cta;
    }else if (statusConditionFailed){
      statusDisplay = "Failed";
      statusColorCode = colours.red;
    }

    progressColor = statusColorCode;
    progressShadowColor = statusColorCode;
    progressBgColor = statusColorCode;
    fontColor = "white";

  } else if (props.variableField == "Roles"){
    percent = 100;
    statusCondition = props.status.toLowerCase() == "ready";
    statusDisplay = statusCondition ? "Ready" : "Not Ready";
    statusColorCode = statusCondition ? colours.green : colours.orange;

    progressColor = statusColorCode;
    progressShadowColor = statusColorCode;
    progressBgColor = statusColorCode;
    fontColor = "white";
  }

  cardWidth = Dimensions.get("window").width/3 - 50
  if(cardWidth<340){
    cardWidth = Dimensions.get("window").width/2 - 60
    if(cardWidth<340){
      cardWidth= 350
    }
  }

  const fieldsContainerTemplate = (leftText, rightText) => {
    return (
      <View style={commonStyles.fieldsContainer}>
        <Title style={commonStyles.workloadCardInfoLeftText}>{leftText}</Title>
        <Text style={commonStyles.workloadCardInfoRightText}>{rightText}</Text>
      </View>
    )
  }

  return (
    <View style={commonStyles.wrapCard}>
      <Card elevation={10} style={{
        borderLeftColor: statusColorCode,
        borderLeftWidth: 5,
        width: cardWidth,
      }}>
        <Card.Content style={commonStyles.cardContent}>
          <StatusCircle
            borderWidth={8}
            radius={60}
            percent={percent}
            progressColor={progressColor}
            progressShadowColor={progressShadowColor}
            progressBgColor={progressBgColor}
            fontColor={fontColor}
            text={statusDisplay}
          />

          <View style={{
            flex: 1,
            marginLeft: spacings.sm,
            marginBottom: spacings.sm,
            justifyContent: 'center',
          }}>
            <Title style={commonStyles.cardTitle}>{props.name}</Title>
            {fieldsContainerTemplate("Age:", props.age)}
            {props.variableField!="Roles"?fieldsContainerTemplate(props.variableField + ":", props.variableFieldVal):<></>}
          </View>

        </Card.Content>
        <Card.Content style={commonStyles.workloadCardLabelContainer}>{props.children}</Card.Content>
      </Card>
    </View>
  )

}