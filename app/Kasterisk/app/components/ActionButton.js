import React from 'react'
import { View } from 'react-native'
import { Colors, Button } from "react-native-paper";

import { spacings, commonStyles } from "../utils/styles.js";

export default function ActionButton({ text, onPress, }) {

  return (
    <View style={commonStyles.centralise}>
    <Button
        style={{ marginTop: spacings.md, marginBottom: spacings.lg }}
        mode={"contained"}
        color={Colors.blue500} 
        onPress={onPress}>
        {text}
    </Button>  
</View>
  )
}