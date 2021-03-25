import React from "react";
import { View, ScrollView, Title } from "react-native";

import { commonStyles, dashboardStyles } from "../../utils/styles.js";
import TableCard from "../Cards/TableCard";
import SpinnerOverlay from "../Elements/SpinnerOverlay";

export default function WorkloadTemplate(props) {
  return (
    <ScrollView style={dashboardStyles.scrollContainer}>
      <SpinnerOverlay showSpinner={props.showSpinner} />
      <View style={commonStyles.detailsContainer}>
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
