import React from "react";
import { View } from "react-native";
import { Card, Title } from "react-native-paper";
import { DataTable } from "react-native-paper";
import LabelButton from "../Buttons/LabelButton";

import {
  fonts,
  spacings,
  cardsOuterPadding,
  commonStyles,
} from "../../utils/styles.js";

import { getLabelButtons } from "../../utils/constants";

export default function TableCard(props) {
  let headers;

  if (props.header == "Pods") {
    headers = ["Name", "Ready", "Phase", "Restarts", "Node", "Age"];
  } else if (props.header == "Conditions") {
    headers = [
      "Type",
      "Reason",
      "Status",
      "Message",
      "Last Update",
      "Last Transition",
    ];
  } else if (props.header == "Pod Conditions") {
    headers = ["Type", "Status", "Last Transition", "Message", "Reason"];
  } else if (props.header == "Nodes") {
    headers = ["Name", "Labels", "Status", "Roles", "Age", "Version"];
  }


  return (
    <View
      style={{
        padding: cardsOuterPadding,
      }}
    >
      <Card elevation={10}>
        <Card.Content style={commonStyles.cardContent}>
          <Title style={commonStyles.cardTitle}>{props.header}</Title>
        </Card.Content>

        <Card.Content style={commonStyles.cardContent}>
          <DataTable>
            <DataTable.Header>
              {headers.map((item2, colIndex) => (
                <DataTable.Title
                  key={colIndex}
                  style={item2 !== "Labels" ? {} : { flex: 3 }}
                >
                  {item2}
                </DataTable.Title>
              ))}
            </DataTable.Header>

            {props.table === undefined
              ? null
              : props.table.map((rows, rowIndex) => (
                  <DataTable.Row key={rowIndex}>
                    {rows === undefined
                      ? null
                      : rows.map((cols, colIndex) => (
                          <DataTable.Cell
                            key={colIndex}
                            style={typeof cols !== "object" ? {} : { flex: 3 }}
                          >
                            {typeof cols !== "object"
                              ? cols
                              : // getLabelButtons(cols)
                                // labels not showing because they are too long - can uncomment below to try
                                getLabelButtons(cols,1)}
                          </DataTable.Cell>
                        ))}
                  </DataTable.Row>
                ))}
          </DataTable>
        </Card.Content>
      </Card>
    </View>
  );
}
