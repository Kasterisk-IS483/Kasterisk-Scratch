import React from 'react'
import { View } from 'react-native'
import { Button } from "react-native-paper";

import { spacings, commonStyles } from "../utils/styles.js";
import { colours } from "../utils/styles.js";

export default function ActionButton({ text, onPress, }) {

  return (
    <View style={commonStyles.centralise}>
    <Button
        style={{ marginTop: spacings.md, marginBottom: spacings.lg }}
        mode={"contained"}
        color={colours.primary} 
        onPress={onPress}>
        {text}
    </Button>  
</View>
  )
}