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

  let title1;
  let title2;
  let title3;
  let title4;
  let title5;
  let title6;

  if (props.header == 'Pods') {
    title1 = 'Name';
    title2 = 'Ready';
    title3 = 'Phase';
    title4 = 'Restarts';
    title5 = 'Node';
    title6 = 'Age';
  } else if (props.header == 'Conditions') {
    title1 = 'Type';
    title2 = 'Reason';
    title3 = 'Status';
    title4 = 'Message';
    title5 = 'Last Update';
    title6 = 'Last Transition';
  }

  return (
    <View style={{
      padding: cardsOuterPadding,
    }} onPress={props.onPress}>
      <Card elevation={10}>

        <Card.Content style={commonStyles.cardContent}>
          <Title style={commonStyles.title}>
            {props.header}
          </Title>
        </Card.Content>

        <Card.Content style={commonStyles.cardContent}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>{title1}</DataTable.Title>
              <DataTable.Title>{title2}</DataTable.Title>
              <DataTable.Title>{title3}</DataTable.Title>
              <DataTable.Title>{title4}</DataTable.Title>
              <DataTable.Title>{title5}</DataTable.Title>
              <DataTable.Title>{title6}</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>A</DataTable.Cell>
              <DataTable.Cell>A</DataTable.Cell>
              <DataTable.Cell>A</DataTable.Cell>
              <DataTable.Cell>A</DataTable.Cell>
              <DataTable.Cell>A</DataTable.Cell>
              <DataTable.Cell>A</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>B</DataTable.Cell>
              <DataTable.Cell>B</DataTable.Cell>
              <DataTable.Cell>B</DataTable.Cell>
              <DataTable.Cell>B</DataTable.Cell>
              <DataTable.Cell>B</DataTable.Cell>
              <DataTable.Cell>B</DataTable.Cell>
            </DataTable.Row>
          </DataTable>

        </Card.Content>

      </Card>
    </View>
  )
}