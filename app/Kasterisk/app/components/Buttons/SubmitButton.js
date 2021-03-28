import React from "react";
import { Button } from "react-native-paper";

import { spacings, colours } from "../../utils/styles";

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