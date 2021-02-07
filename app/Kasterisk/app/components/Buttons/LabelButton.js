import React from "react"
import { Button } from "react-native-paper";

import { colours } from "../../utils/styles.js";

export default function LabelButton({ text="" }) {

  return (
    <Button 
      mode="outlined" 
      compact={true}
      uppercase={false}
      color={colours.green}
      style={{ borderRadius: 40 }}
  >
      {text}
  </Button>
  )
}