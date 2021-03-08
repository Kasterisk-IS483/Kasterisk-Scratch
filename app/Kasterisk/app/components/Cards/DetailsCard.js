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

    return (
        <View style={{
            flexDirection: 'row',
            padding: cardsOuterPadding,
        }} onPress={props.onPress}>
            <Card elevation={10} style={{ width: 605 }}>
                <Card.Content style={commonStyles.cardContent}>
                    <View style={{ flex: 1 }}>
                        <Title style={commonStyles.cardTitle}>
                            {props.header}
                        </Title>

                        {isDeploymentConfiguration &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Deployment Strategy</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.deploymentStrategy}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Rolling Update Strategy</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.rollingUpdate}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Selectors</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.selectors}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Min Ready Seconds</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.minReadySec}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Revision History Limit</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.historyLimit}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Replicas</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.replicas}</Text>
                                </View>
                            </View>
                        }
                        {isDeploymentStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Available Replicas</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.availableReplicas}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Ready Replicas</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.readyReplicas}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Total Replicas</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.totalReplicas}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Unavailable Replicas</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.unavailableReplicas}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Updated Replicas</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.updatedReplicas}</Text>
                                </View>
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
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Image</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.image}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Container Ports</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.containerPorts}</Text>
                                </View>
                            </View>
                        }
                        {isDeploymentMetadata &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Age</Title>
                                    <Text style={commonStyles.detailsCardInfoLeftText}>{props.age} {props.age <= 1 ? "Day" : "Days"}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Labels</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.labels}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Annotations</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.annotations}</Text>
                                </View>
                            </View>
                        }

                        {isPodConfiguration &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Priority</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.priority}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Node</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.node}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Service Account</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.serviceAccount}</Text>
                                </View>
                            </View>
                        }
                        {isPodStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>QoS</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.qos}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Phase</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.phase}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Pod IP</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.podIP}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Host IP</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.hostIP}</Text>
                                </View>
                            </View>
                        }
                        {isPodTemplate &&
                            <View>
                                <Title style={{ textDecorationLine: 'underline' }}>Container {props.container}</Title>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Image</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.image}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Image ID</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.imageId}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Current State</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.currentState}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Ready</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.ready}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Restart Count</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.restartCount}</Text>
                                </View>
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
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Labels</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.labels}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Controlled By</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.control}</Text>
                                </View>
                            </View>
                        }

                        {isReplicasetConfiguration &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Controlled By</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.control}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Replica Status</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.status}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Replicas</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.numberReplica}</Text>
                                </View>
                            </View>
                        }
                        {isReplicasetStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <View style={[commonStyles.centralise, { flexDirection: "column", flex: 1, borderBottomWidth:1, borderRightWidth:1, borderColor: "black" }]}>
                                        <Text style={commonStyles.detailsCardInfoRightText}>{props.waiting | 0}</Text>
                                        <Title style={commonStyles.detailsCardInfoLeftText}>Waiting</Title>
                                    </View>
                                    <View style={[commonStyles.centralise, { flexDirection: "column", flex: 1, borderBottomWidth: 1,borderColor: "black" }]}>
                                        <Text style={commonStyles.detailsCardInfoRightText}>{props.running | 0}</Text>
                                        <Title style={commonStyles.detailsCardInfoLeftText}>Running</Title>
                                    </View>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <View style={[commonStyles.centralise, { flexDirection: "column", flex: 1, borderColor: "black" }]}>
                                        <Text style={commonStyles.detailsCardInfoRightText}>{props.failed | 0}</Text>
                                        <Title style={commonStyles.detailsCardInfoLeftText}>Failed</Title>
                                    </View>
                                    <View style={[commonStyles.centralise, { flexDirection: "column", flex: 1, borderColor: "black", borderLeftWidth: 1 }]}>
                                        <Text style={commonStyles.detailsCardInfoRightText}>{props.succeeded | 0}</Text>
                                        <Title style={commonStyles.detailsCardInfoLeftText}>Succeeded</Title>
                                    </View>
                                </View>
                            </View>
                        }
                        {isReplicasetMetadata &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Age</Title>
                                    <Text style={commonStyles.detailsCardInfoLeftText}>{props.age} {props.age <= 1 ? "Day" : "Days"}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Labels</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.labels}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Annotations</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.annotations}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.detailsCardInfoLeftText}>Controlled By</Title>
                                    <Text style={commonStyles.detailsCardInfoRightText}>{props.control}</Text>
                                </View>
                            </View>
                        }

                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}