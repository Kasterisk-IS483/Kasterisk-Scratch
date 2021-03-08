import React from "react"
import { Button } from "react-native-paper";

import { colours, spacings } from "../../utils/styles.js";

export default function LabelButton({ text="" }) {

  return (
    <Button 
      mode="outlined" 
      uppercase={false}
      color={colours.cta}
      icon="label"
      style={{ 
        borderRadius: 40,
        borderColor: colours.cta,
        marginBottom: spacings.md,
        marginHorizontal: spacings.sm,
      }}
    >
        {text}
    </Button>
  )
}