import React from "react";
import { View } from "react-native";
import { Card, Title } from "react-native-paper";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import DeploymentApi from "../../api/DeploymentApi";
import ReplicasetApi from "../../api/ReplicasetApi";
import DetailPageApi from "../../api/DetailPageApi";
import PodApi from "../../api/PodApi";
import NodeApi from "../../api/NodeApi";
import { getLabelButtons } from "../../utils/constants";
import { commonStyles } from "../../utils/styles.js";
import TooltipOverlay from "../components/Elements/TooltipOverlay";

export default function TableCard(props) {
  const navigation = useNavigation();

  let headers;

  if (props.header == "Pods") {
    headers = ["Name", "Ready", "Phase", "Restarts", "Node", "Age", "Namespace"];
  } else if (props.header == "Conditions") {
    if (props.type == "Deployment") {
      headers = ["Type", "Reason", "Status", "Message", "Last Update", "Last Transition"];
    } else if (props.type == "Node") {
      headers = ["Type", "Reason", "Status", "Message", "Last Heartbeat", "Last Transition"];
    }
  } else if (props.header == "Pod Conditions") {
    headers = ["Type", "Status", "Last Transition", "Message", "Reason"];
  } else if (props.header == "Nodes") {
    headers = ["Name", "Labels", "Status", "Roles", "Age", "Version"];
  } else if (["Deployments List", "Replicasets List"].includes(props.header)) {
    headers = ["Name", "Age", "Labels", "Containers", "Status", "Selector"];
  } else if (props.header == "Pods List") {
    headers = ["Name", "Age", "Phase", "Ready", "Restarts", "Labels", "namespace"];
  } else if (props.header == "Addresses") {
    headers = ["Type", "Address"];
  } else if (props.header == "Resources") {
    headers = ["Key", "Capacity", "Allocatable"];
  } else if (props.header == "Images") {
    headers = ["Names", "Size"];
  }

  const navigationToDetail = (rowIndex) => {
    if (["Conditions", "Pod Conditions", "Resources", "Addresses", "Images"].includes(props.header)) {
      return null;
    }
    if (props.header == "Deployments List") {
      return (async () => navigation.navigate("WorkloadDeployment", {
        deployment: await DeploymentApi.readDeployment(
          props.table[rowIndex][5],
          props.table[rowIndex][0]
        ),
        pods: await PodApi.listPod(props.table[rowIndex][5]),
      }))
    }
    if (props.header == "Replicasets List") {
      return (async () => navigation.navigate("WorkloadReplicaset", {
        replicaset: await ReplicasetApi.readReplicaSet(
          props.table[rowIndex][5],
          props.table[rowIndex][0]
        ),
        podstatus: await DetailPageApi.PodsStatuses(
          props.table[rowIndex][5],
          props.table[rowIndex][2]),
      }))
    }
    if (props.header.includes("Pods")) {
      return (async () => navigation.navigate("WorkloadPod", {
        pod: await PodApi.readPod(
          props.table[rowIndex][6],
          props.table[rowIndex][0]
        ),
      }))
    }
    if (props.header == "Nodes") {
      return (async () => navigation.navigate("WorkloadNode", {
        node: await NodeApi.readNode(
          props.table[rowIndex][0]
        ),
      }))
    }
  }

  const headerStyle = (col) => {
    if (col === "Labels") {
      return { flex: 3 };
    }
    if (props.header === "Pods List" && col === "Name") {
      return { flex: 2 };
    }
    // Nodes 
    if (props.header === "Resources" && col === "Key") {
      return { flex: 2 };
    }
    if (props.header === "Addresses" && col === "Address") {
      return { flex: 3 };
    }
    if (props.header === "Images" && col === "Names") {
      return { flex: 14 };
    }

    return { flex: 1 };
  }

  const cellStyle = (cols, colIndex) => {
    if (typeof cols === "object") {
      return { flex: 3 };
    }
    if (props.header === "Pods List" && colIndex === 0) {
      return { flex: 2 };
    }
    // Nodes 
    if (props.header === "Resources" && colIndex === 0) {
      return { flex: 2 };
    }
    if (props.header === "Addresses" && colIndex === 1) {
      return { flex: 3 };
    }
    if (props.header === "Images" && colIndex === 0) {
      return { flex: 14 };
    }

    return { flex: 1 };
  }

  return (
    <View style={commonStyles.wrapCard}>
      <Card elevation={10}>
        <Card.Content style={commonStyles.cardContent}>
          <Title style={commonStyles.cardTitle}>{props.header}</Title>
        </Card.Content>

        <Card.Content style={commonStyles.cardContent}>
          <DataTable>
            <DataTable.Header>
              {headers.map((col, colIndex) => (
                <DataTable.Title key={colIndex} style={headerStyle(col)}>{col}</DataTable.Title>
              ))}
            </DataTable.Header>

            {props.table === undefined
              ? null
              : props.table.map((rows, rowIndex) => (
                <DataTable.Row key={rowIndex} onPress={navigationToDetail(rowIndex)}>
                  {rows === undefined
                    ? null
                    : rows.map((cols, colIndex) => (
                      <DataTable.Cell key={colIndex} style={cellStyle(cols, colIndex)}>
                        {typeof cols !== "object"
                          ? 
                          cols
                          // <TooltipOverlay text={cols}>
                          //   <Text>{cols}</Text>
                          // </TooltipOverlay>
                          : <View style={commonStyles.labelContainer}>{getLabelButtons(cols, 1, false)}</View>}
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
