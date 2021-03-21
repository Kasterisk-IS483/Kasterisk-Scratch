import React from "react";
import { Button } from "react-native-paper";

import { colours, spacings } from "../../utils/styles.js";

export default function LabelButton({ text = "", displayMore = false, full = true }) {

  let icon = "label";
  let mode = "outlined";
  let maxWidth = "auto";

  if (displayMore) {
    icon = "";
    mode = "contained";
  }

  if (!full) {
    maxWidth = 200;
  }

  return (
    <Button
      mode={mode}
      uppercase={false}
      color={colours.cta}
      icon={icon}
      style={{
        maxWidth: maxWidth,
        borderRadius: 40,
        borderColor: colours.cta,
        marginBottom: spacings.md,
        marginHorizontal: spacings.sm,
        paddingHorizontal: spacings.sm,
      }}
    >
      {text}
    </Button>
  );
}
