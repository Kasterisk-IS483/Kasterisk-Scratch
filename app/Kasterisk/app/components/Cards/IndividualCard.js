import React from "react"
import { View, Text } from "react-native"
import { Card, Title } from 'react-native-paper';

import {
    cardsOuterPadding,
    commonStyles,
} from "../../utils/styles.js";

export default function IndividualCard(props) {

    let isDeploymentConfiguration = false;
    let isDeploymentStatus = false;
    let isDeploymentMetadata = false;
    let isReplicasetConfiguration = false;
    let isReplicasetStatus = false;
    let isReplicasetMetadata = false;
    let isPodConfiguration = false;
    let isPodStatus = false;
    let isPodMetadata = false;

    if (props.type == "Deployment") {
        if (props.header == "Configuration") {
            isDeploymentConfiguration = true;
        } else if (props.header == "Status") {
            isDeploymentStatus = true;
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
                        <Title style={commonStyles.title}>
                            {props.header}
                        </Title>

                        {isDeploymentConfiguration &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Deployment Strategy</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.priority}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Rolling Update Strategy</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.rollingUpdate}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Selectors</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.selectors}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Min Ready Seconds</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.minReadySec}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Revision History Limit</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.historyLimit}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.replicas}</Text>
                                </View>
                            </View>
                        }

                        {isDeploymentStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Available Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.availableReplicas}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Ready Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.readyReplicas}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Total Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.totalReplicas}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Unavailable Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.unavailableReplicas}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Updated Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.updatedReplicas}</Text>
                                </View>
                            </View>
                        }

                        {isDeploymentMetadata &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Age</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.age}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Labels</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.labels}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Annotations</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.annotations}</Text>
                                </View>
                            </View>
                        }

                        {isPodConfiguration &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Priority</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.priority}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Node</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.node}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Service Account</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.serviceAccount}</Text>
                                </View>
                            </View>
                        }

                        {isPodStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>QoS</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.qos}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Phase</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.phase}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Pod IP</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.podIP}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Host IP</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.hostIP}</Text>
                                </View>
                            </View>
                        }

                        {isPodMetadata &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Age</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.age}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Labels</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.labels}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Controlled By</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.control}</Text>
                                </View>
                            </View>
                        }

                        {isReplicasetConfiguration &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Controlled By</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.control}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Replica Status</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.status}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.numberReplica}</Text>
                                </View>
                            </View>
                        }

                        {isReplicasetStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <View style={[commonStyles.centralise, { flexDirection: "column", flex: 1, borderBottomWidth:1, borderRightWidth:1, borderColor: "black" }]}>
                                        <Text style={commonStyles.cardInfoRightText}>{props.waiting | 0}</Text>
                                        <Title style={commonStyles.cardInfoLeftText}>waiting</Title>
                                    </View>
                                    <View style={[commonStyles.centralise, { flexDirection: "column", flex: 1, borderBottomWidth: 1,borderColor: "black" }]}>
                                        <Text style={commonStyles.cardInfoRightText}>{props.running | 0}</Text>
                                        <Title style={commonStyles.cardInfoLeftText}>Running</Title>
                                    </View>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <View style={[commonStyles.centralise, { flexDirection: "column", flex: 1, borderColor: "black" }]}>
                                        <Text style={commonStyles.cardInfoRightText}>{props.failed | 0}</Text>
                                        <Title style={commonStyles.cardInfoLeftText}>Failed</Title>
                                    </View>
                                    <View style={[commonStyles.centralise, { flexDirection: "column", flex: 1, borderColor: "black", borderLeftWidth: 1 }]}>
                                        <Text style={commonStyles.cardInfoRightText}>{props.succeeded | 0}</Text>
                                        <Title style={commonStyles.cardInfoLeftText}>Succeeded</Title>
                                    </View>
                                </View>
                            </View>
                        }

                        {isReplicasetMetadata &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Age</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.age}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Labels</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.labels}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Annotations</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.annotations}</Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Controlled By</Title>
                                    <Text style={commonStyles.cardInfoRightText}>{props.control}</Text>
                                </View>
                            </View>
                        }

                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}