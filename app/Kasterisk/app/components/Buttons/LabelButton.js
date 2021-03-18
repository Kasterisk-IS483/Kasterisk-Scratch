import React from "react";
import { Button } from "react-native-paper";

import { colours, spacings } from "../../utils/styles.js";

export default function LabelButton({ text = "", displayMore = false }) {

  let icon;
  let mode;

  if (displayMore) {
    icon = "";
    mode = "contained";
  } else {
    icon = "label";
    mode = "outlined";
  }

  return (
    <Button
      mode={mode}
      uppercase={false}
      color={colours.cta}
      icon={icon}
      style={{
        borderRadius: 40,
        borderColor: colours.cta,
        marginBottom: spacings.md,
        marginHorizontal: spacings.sm,
        maxWidth: 200,
      }}
    >
      {text}
    </Button>
  );
}
