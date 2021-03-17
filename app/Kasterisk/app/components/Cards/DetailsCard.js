import React from "react"
import { View, Text } from "react-native"
import { Card, Title, DataTable } from 'react-native-paper';

import { cardsOuterPadding, commonStyles } from "../../utils/styles.js";

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

    isPodTemplatedUndefined = [{
        name: "",
        image: "",
        imageID: "",
        ready: "",
        restartCount: "",
        volumeMounts: [{name: "", mountPath: ""}]
    }];
    if (props.podTemplate !== undefined){
        isPodTemplatedUndefined = props.podTemplate;
    }

    const fieldsContainerTemplate = (style, leftText, rightText) => {
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
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Deployment Strategy", props.deploymentStrategy)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Rolling Update Strategy", props.rollingUpdate)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Selectors", props.selectors)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Min Ready Seconds", props.minReadySec)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Revision History Limit", props.historyLimit)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Replicas", props.replicas)}
                            </View>
                        }
                        {isDeploymentStatus &&
                            <View>
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Available Replicas", props.availableReplicas)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Ready Replicas", props.readyReplicas)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Total Replicas", props.totalReplicas)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Unavailable Replicas", props.unavailableReplicas)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Updated Replicas", props.updatedReplicas)}
                            </View>
                        }
                        {isDeploymentPodTemplate &&
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Title style={[ commonStyles.detailsCardInfoLeftText, { textDecorationLine: 'underline' } ]}>
                                        Container {props.container !== undefined ? props.container : ""}
                                    </Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.label}</Text>
                                </View>
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Image", props.image)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Container Ports", props.containerPorts)}
                            </View>
                        }
                        {isDeploymentMetadata &&
                            <View>
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Age", props.age)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Labels", props.labels)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Annotations", props.annotations)}
                            </View>
                        }

                        {isPodConfiguration &&
                            <View>
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Priority", props.priority)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Node", props.node)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Service Account", props.serviceAccount)}
                            </View>
                        }
                        {isPodStatus &&
                            <View>
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "QoS", props.qos)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Phase", props.phase)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Pod IP", props.podIP)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Host IP", props.hostIP)}
                            </View>
                        }
                        {isPodTemplate &&
                            isPodTemplatedUndefined.map((container, index) => (
                            <View key={index}>
                                <Title style={{ textDecorationLine: 'underline' }}>Container {container.name}</Title>
                                    {fieldsContainerTemplate(commonStyles.fieldsContainer, "Image", container.image)}
                                    {fieldsContainerTemplate(commonStyles.fieldsContainer, "Image ID", container.imageID)}
                                    {/* {fieldsContainerTemplate(commonStyles.fieldsContainer, "Current State", container.currentState)} */}
                                    {fieldsContainerTemplate(commonStyles.fieldsContainer, "Ready", container.ready)}
                                    {fieldsContainerTemplate(commonStyles.fieldsContainer, "Restart Count", container.restartCount)}
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Volume Mounts</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>
                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title>Name       </DataTable.Title>
                                                <DataTable.Title>Mount Path     </DataTable.Title>
                                                <DataTable.Title>Propagation    </DataTable.Title>
                                            </DataTable.Header>
                                            {container.volumeMounts.map((rows, rowIndex) => ( 
                                            <DataTable.Row key={rowIndex}>
                                                <DataTable.Cell> {rows.name} </DataTable.Cell>
                                                <DataTable.Cell> {rows.mountPath} </DataTable.Cell>
                                            </DataTable.Row>
                                            ))}
                                        </DataTable>
                                    </Text>
                                </View>
                            </View>
                        ))}
                        {isPodMetadata &&
                            <View>
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Age", props.age)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Labels", props.labels)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Controlled By", props.control)}
                            </View>
                        }

                        {isReplicasetConfiguration &&
                            <View>
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Controlled By", props.control)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Replica Status", props.replicaStatus)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Replicas", props.numberReplica)}
                            </View>
                        }
                        {isReplicasetStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    {fieldsContainerTemplate([commonStyles.centralise, { flexDirection: "column", flex: 1, borderBottomWidth:1, borderRightWidth:1, borderColor: "black" }], "Waiting", props.waiting | 0)}
                                    {fieldsContainerTemplate([commonStyles.centralise, { flexDirection: "column", flex: 1, borderBottomWidth: 1,borderColor: "black" }], "Running", props.running | 0)}
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    {fieldsContainerTemplate([commonStyles.centralise, { flexDirection: "column", flex: 1, borderColor: "black" }], "Failed", props.failed | 0)}
                                    {fieldsContainerTemplate([commonStyles.centralise, { flexDirection: "column", flex: 1, borderColor: "black", borderLeftWidth: 1 }], "Succeeded", props.succeeded | 0)}
                                </View>
                            </View>
                        }
                        {isReplicasetMetadata &&
                            <View>
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Age", props.age)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Labels", props.labels)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Annotations", props.annotations)}
                                {fieldsContainerTemplate(commonStyles.fieldsContainer, "Controlled By", props.control)}
                            </View>
                        }

                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}