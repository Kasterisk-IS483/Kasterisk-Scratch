import React from "react"
import { View, Text } from "react-native"
import { Card, Title } from 'react-native-paper';

import {
    fonts,
    colours,
    spacings,
    cardsOuterPadding,
    commonStyles,
} from "../../utils/styles.js";


export default function IndividualCard(props) {

    let isDeploymentConfiguration = false;
    let isDeploymentStatus = false;
    let isReplicasetConfiguration = false;
    let isReplicasetStatus = false;
    let isPodsConfiguration = false;
    let isPodsStatus = false;
    let cardHeight;
    let cardWidth;

    if (props.type == "Deployment") {
        // cardHeight=280;
        cardWidth = 550;
        if (props.header == "Configuration") {
            isDeploymentConfiguration = true;
        } else if (props.header == "Status") {
            isDeploymentStatus = true;
        }
    } else if (props.type == "Replicaset") {
        if (props.header == "Configuration") {
            isReplicasetConfiguration = true;
        } else if (props.header == "Status") {
            isReplicasetStatus = true;
        }
    } else if (props.type == "Pods") {
        // cardHeight=220;
        cardWidth = 550;
        if (props.header == "Configuration") {
            isPodsConfiguration = true;
        } else if (props.header == "Status") {
            isPodsStatus = true;
        }
    }

    return (
        <View style={{
            flexDirection: 'row',
            padding: cardsOuterPadding,
        }} onPress={props.onPress}>
            <Card elevation={10} style={{
                width: cardWidth,
                // height: cardHeight
            }}>
                <Card.Content style={{
                    paddingLeft: spacings.md,
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                        marginLeft: spacings.sm,
                        marginBottom: spacings.sm,
                        justifyContent: 'center',
                    }}>
                        <Title style={{
                            paddingBottom: spacings.sm,
                            fontSize: fonts.lg,
                            fontWeight: 'bold',
                        }}>
                            {props.header}
                        </Title>
                        {isDeploymentConfiguration &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Deployment Strategy</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.priority}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Rolling Update Strategy</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.rollingUpdate}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Selectors</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.selectors}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Min Ready Seconds</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.minReadySec}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Revision History Limit</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.historyLimit}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.replicas}
                                    </Text>
                                </View>
                            </View>
                        }

                        {isDeploymentStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Available Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.availableReplicas}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Ready Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.readyReplicas}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Total Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.totalReplicas}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Unavailable Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.unavailableReplicas}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Updated Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.updatedReplicas}
                                    </Text>
                                </View>
                            </View>
                        }

                        {isPodsConfiguration &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Priority</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.priority}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Node</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.node}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Service Account</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.serviceAccount}
                                    </Text>
                                </View>
                            </View>
                        }

                        {isPodsStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>QoS</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.qos}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Phase</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.phase}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Pod IP</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.podIP}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Host IP</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.hostIP}
                                    </Text>
                                </View>
                            </View>
                        }

                        {isReplicasetConfiguration &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Controlled by</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.control}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Replica Status</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.status}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.numberReplica}
                                    </Text>
                                </View>
                            </View>
                        }

                        {isReplicasetStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Controlled by</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.control}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Replica Status</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.status}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.cardInfoLeftText}>Replicas</Title>
                                    <Text style={commonStyles.cardInfoRightText}>
                                        {props.numberReplica}
                                    </Text>
                                </View>
                            </View>
                        }



                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}