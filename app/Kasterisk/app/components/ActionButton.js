import React from 'react'
import { View } from 'react-native'
import { Colors, Button } from "react-native-paper";

import {commonStyles } from "../utils/styles.js";

export default function ActionButton({ text, onPress, }) {

  const style = {
    width: "auto",
    marginTop: 15,
    marginBottom: 25,
  }

  return (
    <View style={commonStyles.centralise}>
    <Button
        style={style}
        mode={"contained"}
        color={Colors.blue500} 
        onPress={onPress}>
        {text}
    </Button>  
</View>
  )
}