import React from "react"
import { View, Text } from "react-native"
import { Card, Title } from 'react-native-paper';
import { DataTable } from 'react-native-paper';

import {
    fonts,
    spacings,
    cardsOuterPadding,
} from "../../utils/styles.js";

export default function TableCard(props) {
  
    return (
        <View style={{
            padding: cardsOuterPadding,
        }} onPress={props.onPress}>
          <Card elevation={10}>
            <Card.Content style={{
                paddingLeft: spacings.md,
            }}>
              {/* <Title style={{
                  paddingBottom: spacings.sm,
                  fontSize: fonts.lg,
                  fontWeight: 'bold',
              }}>
                  {props.header}
              </Title> */}

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Type</DataTable.Title>
                  <DataTable.Title>Reason</DataTable.Title>
                  <DataTable.Title>Status</DataTable.Title>
                  <DataTable.Title>Message</DataTable.Title>
                  <DataTable.Title>Last Update</DataTable.Title>
                  <DataTable.Title>Last Transition</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Available</DataTable.Cell>
                  <DataTable.Cell>A</DataTable.Cell>
                  <DataTable.Cell>A</DataTable.Cell>
                  <DataTable.Cell>A</DataTable.Cell> 
                  <DataTable.Cell>A</DataTable.Cell>
                  <DataTable.Cell>A</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Progressing</DataTable.Cell>
                  <DataTable.Cell>P</DataTable.Cell>
                  <DataTable.Cell>P</DataTable.Cell>
                  <DataTable.Cell>P</DataTable.Cell> 
                  <DataTable.Cell>P</DataTable.Cell>
                  <DataTable.Cell>P</DataTable.Cell>
                </DataTable.Row>

              </DataTable>

            </Card.Content>
          </Card> 
        </View>
    )
}