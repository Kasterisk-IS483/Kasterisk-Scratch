import React from "react";
import { Text } from "react-native";
import { Tooltip } from 'react-native-elements';

import { colours } from "../../utils/styles";

export default function TooltipOverlay(props) {

  return (
    <Tooltip 
      height={80}
      width={350}
      backgroundColor={colours.secondary} 
      popover={<Text>{props.text}</Text>}
    >
      {props.children}
    </Tooltip>
  );

}