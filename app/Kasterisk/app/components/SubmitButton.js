import React from "react"
import { Button, Colors } from "react-native-paper";

import { spacings, colours } from "../utils/styles.js";

export default function SubmitButton({ text, onPress }) {

  return (
    <Button
        style={{ 
          marginVertical: spacings.lg,
          marginHorizontal: spacings.lg,
        }}
        color={Colors.blue600}
        mode={"contained"}
        onPress={onPress}>
        {text}
    </Button>  
  )
}