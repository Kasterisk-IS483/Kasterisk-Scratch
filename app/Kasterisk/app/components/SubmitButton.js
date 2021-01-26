import React from "react"
import { Button } from "react-native-paper";

import { spacings, colours } from "../utils/styles.js";

export default function SubmitButton({ text, onPress }) {

  return (
    <Button
        style={{ 
          marginVertical: spacings.md,
          marginHorizontal: spacings.lg,
        }}
        color={colours.secondary}
        mode={"contained"}
        onPress={onPress}>
        {text}
    </Button>  
  )
}