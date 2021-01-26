import React from "react"
import { View } from "react-native"
import { Button } from "react-native-paper";

import { spacings, colours, commonStyles } from "../utils/styles.js";

export default function ActionButton({ text, onPress }) {

  return (
    <View style={commonStyles.centralise}>
      <Button
          style={{ 
            marginVertical: spacings.md 
          }}
          color={colours.primary} 
          mode={"contained"}
          onPress={onPress}>
          {text}
      </Button>  
    </View>
  )
}