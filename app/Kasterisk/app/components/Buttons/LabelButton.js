import React from "react"
import { Button } from "react-native-paper";

import { colours, spacings } from "../../utils/styles.js";

export default function LabelButton({ text="" }) {

  return (
    <Button 
      mode="outlined" 
      // compact={true}
      uppercase={false}
      color={colours.cta}
      style={{ 
        borderRadius: 40,
        borderColor: colours.cta,
        marginBottom: spacings.xxs,
        marginHorizontal: spacings.sm,
      }}
    >
        {text}
    </Button>
  )
}