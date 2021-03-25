import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Card, Title } from "react-native-paper";
import ModalDropdown from "react-native-modal-dropdown";

import { commonStyles, dashboardStyles, fonts, spacings} from "../../utils/styles.js";
import TableCard from "../Cards/TableCard";
import SpinnerOverlay from "../Elements/SpinnerOverlay";

export default function WorkloadTemplate(props) {
  return (
    <ScrollView style={dashboardStyles.scrollContainer}>
      <SpinnerOverlay showSpinner={props.showSpinner} />
      <View style={commonStyles.detailsContainer}>
        {props.type=="filter"&& <View style={commonStyles.wrapCard}>
        <Card elevation={10} width={"100%"}>
          <Card.Content style={commonStyles.cardContent}>
            <Title style={commonStyles.cardTitle}>Filter</Title>
          </Card.Content>
  
          <Card.Content style={commonStyles.cardContent}>
          <View style={{ flexDirection: "row" }}>
          <ModalDropdown
            // options={namespaceLabels}
            dropdownStyle={{
              // height: 40 * namespaceLabels.length,
              height:40,
              alignItems: "center",
            }}
            dropdownTextStyle={{ fontSize: fonts.sm, color: "black" }}
            textStyle={{
              fontSize: fonts.sm,
              color: "white",
              marginRight: spacings.xxs,
            }}
            customButton="⋮"
            // defaultValue={this.state.selectedNamespace}
            // onSelect={async (index) =>
            //   this.updateState(namespaceLabels[index])
            // }
          />
        <Text style={{ color: "white", marginRight: spacings.sm }}>▼</Text>
      </View>
            
          </Card.Content>
        </Card>
      </View>}
        {props.type=="filter"&& <TableCard header={"Deployments List"} table={props.deployment} />}
        {props.type=="filter"&& <TableCard header={"Pods List"} table={props.pods} />}
        {props.type=="filter"&& <TableCard header={"Replicasets List"} table={props.replicasets} />}
        {props.type=="filter"&& <TableCard header={"Nodes"} table={props.nodes} />}

        {props.type == "list" &&
          <TableCard header={props.header} table={props.children} />
        }
        {props.type == "details" &&
          <View>
            {props.children}
          </View>
        }
      </View>
    </ScrollView>
  );
}
