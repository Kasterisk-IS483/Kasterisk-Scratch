import React from "react"
import { View } from "react-native"
import { Button } from "react-native-paper";

import { spacings, colours, commonStyles } from "../../utils/styles.js";

export default function ActionButton({ text="", onPress=null }) {

  return (
    <View style={commonStyles.centralise}>
      <Button
        mode="contained"
        color={colours.primary} 
        style={{ marginVertical: spacings.md }}
        onPress={onPress}
      >
        {text}
      </Button>  
    </View>
  )
}