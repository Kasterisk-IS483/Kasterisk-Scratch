import React from 'react'
import { View } from 'react-native'
import { Card, Title } from 'react-native-paper';
import { DataTable } from 'react-native-paper';

import {
  fonts,
  spacings,
  cardsOuterPadding,
  commonStyles,
} from '../../utils/styles.js';

export default function TableCard(props) {

  let headers;

  if (props.header == 'Pods') {
    headers = ["Name", "Ready", "Phase", "Restarts", "Node", "Age"];
  } else if (props.header == 'Conditions') {
    headers = ["Type", "Reason", "Status", "Message", "Last Update", "Last Transition"];
  } else if (props.header == 'Pod Conditions') {
    headers = ["Type", "Status","Last Transition", "Message", "Reason"];
  }

  return (
    <View style={{
      padding: cardsOuterPadding,
    }} onPress={props.onPress}>
      <Card elevation={10}>

        <Card.Content style={commonStyles.cardContent}>
          <Title style={commonStyles.cardTitle}>
            {props.header}
          </Title>
        </Card.Content>

        <Card.Content style={commonStyles.cardContent}>
          <DataTable>
            <DataTable.Header>
            {headers.map((item2, colIndex) => (
                <DataTable.Title key={colIndex}> {item2} </DataTable.Title>
                ))}
            </DataTable.Header>
            
            {props.table === undefined ? null : props.table.map((rows, rowIndex) => ( 
            <DataTable.Row key={rowIndex}>
              {rows === undefined ? null : rows.map((cols, colIndex) => (
                <DataTable.Cell key={colIndex}> {cols} </DataTable.Cell>
                ))}
            </DataTable.Row>
            ))}
          </DataTable>

        </Card.Content>

      </Card>
    </View>
  )
}