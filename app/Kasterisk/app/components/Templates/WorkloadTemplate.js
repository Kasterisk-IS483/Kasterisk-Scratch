import React from "react";
import { View, ScrollView } from "react-native";

import { commonStyles, dashboardStyles } from "../../utils/styles";
import TableCard from "../Cards/TableCard";
import SpinnerOverlay from "../Elements/SpinnerOverlay";

export default function WorkloadTemplate(props) {
  const getAllTables = () => {
    return(
      <View>
        <TableCard header={"Deployments List"} table={props.deployment} />
        <TableCard header={"Pods List"} table={props.pods} />
        <TableCard header={"Replicasets List"} table={props.replicasets} />
        <TableCard header={"Nodes"} table={props.nodes} />
      </View>
    );
  }
  return (
    <ScrollView style={dashboardStyles.scrollContainer}>
      <SpinnerOverlay showSpinner={props.showSpinner} />
      <View style={commonStyles.detailsContainer}>

        {props.type == "filter" && 
          getAllTables()
        }
        {props.type == "list" &&
          <TableCard header={props.header} table={props.children} />
        }
        {props.type == "details" &&
          <View>{props.children}</View>
        }

      </View>
    </ScrollView>
  );
}
