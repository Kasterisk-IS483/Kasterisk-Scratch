import React from "react"
import { Button } from "react-native-paper";

import { spacings, colours } from "../utils/styles.js";

export default function SubmitButton({ text, onPress }) {

  return (
    <Button
        style={{ 
          marginVertical: spacings.lg,
          marginHorizontal: spacings.lg,
        }}
        color={colours.cta}
        mode={"contained"}
        onPress={onPress}>
        {text}
    </Button>  
  )
}