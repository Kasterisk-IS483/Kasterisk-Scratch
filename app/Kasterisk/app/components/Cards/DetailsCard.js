import React from "react"
import { View, Text } from "react-native"
import { Card, Title, DataTable } from 'react-native-paper';

import { cardsOuterPadding, commonStyles } from "../../utils/styles.js";

import LabelButton from "../Buttons/LabelButton";

export default function DetailsCard(props) {

    let isDeploymentConfiguration = false;
    let isDeploymentStatus = false;
    let isDeploymentPodTemplate = false;
    let isDeploymentMetadata = false;

    let isReplicasetConfiguration = false;
    let isReplicasetStatus = false;
    let isReplicasetMetadata = false;

    let isPodConfiguration = false;
    let isPodStatus = false;
    let isPodTemplate = false;
    let isPodMetadata = false;

    if (props.type == "Deployment") {
        if (props.header == "Configuration") {
            isDeploymentConfiguration = true;
        } else if (props.header == "Status") {
            isDeploymentStatus = true;
        } else if (props.header == "Pod Template") {
            isDeploymentPodTemplate = true;
        } else if (props.header == "Metadata") {
            isDeploymentMetadata = true;
        }
    } else if (props.type == "Replicaset") {
        if (props.header == "Configuration") {
            isReplicasetConfiguration = true;
        } else if (props.header == "Status") {
            isReplicasetStatus = true;
        } else if (props.header == "Metadata") {
            isReplicasetMetadata = true;
        }
    } else if (props.type == "Pods") {
        if (props.header == "Configuration") {
            isPodConfiguration = true;
        } else if (props.header == "Status") {
            isPodStatus = true;
        } else if (props.header == "Template") {
            isPodTemplate = true;
        } else if (props.header == "Metadata") {
            isPodMetadata = true;
        }
    }

    fieldsContainerTemplate = (style, leftText, rightText) => {
        return (
            <View style={style}>
                <Title style={commonStyles.detailsCardInfoLeftText}>{leftText}</Title>
                <Text style={commonStyles.detailsCardInfoRightText}>{rightText}</Text>
            </View>
        )
    }

    return (
        <View style={{
            flexGrow: 1,
            flexDirection: 'row',
            padding: cardsOuterPadding,
        }}>
            <Card elevation={10} style={{ width: "100%" }}>
                <Card.Content style={commonStyles.cardContent}>
                    <View style={{ flex: 1 }}>
                        <Title style={commonStyles.cardTitle}>
                            {props.header}
                        </Title>

                        {isDeploymentConfiguration &&
                            <View>
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Deployment Strategy", props.deploymentStrategy)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Rolling Update Strategy", props.rollingUpdate)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Selectors", props.selectors)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Min Ready Seconds", props.minReadySec)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Revision History Limit", props.historyLimit)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Replicas", props.replicas)}
                            </View>
                        }
                        {isDeploymentStatus &&
                            <View>
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Available Replicas", props.availableReplicas)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Ready Replicas", props.readyReplicas)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Total Replicas", props.totalReplicas)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Unavailable Replicas", props.unavailableReplicas)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Updated Replicas", props.updatedReplicas)}
                            </View>
                        }
                        {isDeploymentPodTemplate &&
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Title style={[ commonStyles.detailsCardInfoRightText, { textDecorationLine: 'underline' } ]}>
                                        Container{props.container ? " " + props.container : ""}
                                    </Title>
                                    {props.label && 
                                        <View style={commonStyles.detailsCardInfoLeftText}>
                                            <LabelButton text={props.label}></LabelButton>
                                        </View>                                    
                                    }
                                </View>
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Image", props.image)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Container Ports", props.containerPorts)}
                            </View>
                        }
                        {isDeploymentMetadata &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Age</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.age} {props.age <= 1 ? "Day" : "Days"}</Text>
                                </View>
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Labels", props.labels)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Annotations", props.annotations)}
                            </View>
                        }

                        {isPodConfiguration &&
                            <View>
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Priority", props.priority)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Node", props.node)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Service Account", props.serviceAccount)}
                            </View>
                        }
                        {isPodStatus &&
                            <View>
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "QoS", props.qos)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Phase", props.phase)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Pod IP", props.podIP)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Host IP", props.hostIP)}
                            </View>
                        }
                        {isPodTemplate &&
                            <View>
                                <Title style={{ textDecorationLine: 'underline' }}>Container {props.container}</Title>
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Image", props.image)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Image ID", props.imageId)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Current State", props.currentState)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Ready", props.ready)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Restart Count", props.restartCount)}
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Volume Mounts</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>
                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title>Name       </DataTable.Title>
                                                <DataTable.Title>Mount Path     </DataTable.Title>
                                                <DataTable.Title>Propagation    </DataTable.Title>
                                            </DataTable.Header>
                                            <DataTable.Row>
                                                <DataTable.Cell>{props.name}</DataTable.Cell>
                                                <DataTable.Cell>{props.mountPath}</DataTable.Cell>
                                                <DataTable.Cell>{props.propagation}</DataTable.Cell>
                                            </DataTable.Row>
                                        </DataTable>
                                    </Text>
                                </View>
                            </View>
                        }
                        {isPodMetadata &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Age</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.age} {props.age <= 1 ? "Day" : "Days"}</Text>
                                </View>
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Labels", props.labels)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Controlled By", props.control)}
                            </View>
                        }

                        {isReplicasetConfiguration &&
                            <View>
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Controlled By", props.control)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Replica Status", props.replicaStatus)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Replicas", props.numberReplica)}
                            </View>
                        }
                        {isReplicasetStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    {this.fieldsContainerTemplate([commonStyles.centralise, { flexDirection: "column", flex: 1, borderBottomWidth:1, borderRightWidth:1, borderColor: "black" }], "Waiting", props.waiting | 0)}
                                    {this.fieldsContainerTemplate([commonStyles.centralise, { flexDirection: "column", flex: 1, borderBottomWidth: 1,borderColor: "black" }], "Running", props.running | 0)}
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    {this.fieldsContainerTemplate([commonStyles.centralise, { flexDirection: "column", flex: 1, borderColor: "black" }], "Failed", props.failed | 0)}
                                    {this.fieldsContainerTemplate([commonStyles.centralise, { flexDirection: "column", flex: 1, borderColor: "black", borderLeftWidth: 1 }], "Succeeded", props.succeeded | 0)}
                                </View>
                            </View>
                        }
                        {isReplicasetMetadata &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Age</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.age} {props.age <= 1 ? "Day" : "Days"}</Text>
                                </View>
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Labels", props.labels)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Annotations", props.annotations)}
                                {this.fieldsContainerTemplate(commonStyles.fieldsContainer, "Controlled By", props.control)}
                            </View>
                        }

                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}