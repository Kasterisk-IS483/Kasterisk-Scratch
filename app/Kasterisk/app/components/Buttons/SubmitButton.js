import React from "react"
import { Button } from "react-native-paper";

import { spacings, colours } from "../../utils/styles.js";

export default function SubmitButton({ text="", onPress=null }) {

  return (
    <Button
      mode="contained"
      color={colours.cta}
      style={{ marginVertical: spacings.lg }}
      onPress={onPress}
    >
      {text}
    </Button>  
  )
}