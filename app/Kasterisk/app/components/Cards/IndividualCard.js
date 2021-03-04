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
    // let isReplicasetConfiguration = false;
    // let isReplicasetStatus = false;
    let isPodsConfiguration = false;
    let isPodsStatus = false;
    let cardHeight;
    let cardWidth;

    if (props.type == "Deployment") {
        cardHeight=280;
        cardWidth= 550;
        if (props.header == "Configuration") {
            isDeploymentConfiguration = true;
                    } else if (props.header == "Status") {
            isDeploymentStatus = true;
        }
    } 
    // else if (props.type == "Replicaset") {
    //     if (props.header == "Configuration") {
    //         isReplicasetConfiguration = true;
    //     } else if (props.header == "Status") {
    //         isReplicasetStatus = true;
    //     }
    // } 
    else if (props.type == "Pods") {
        cardHeight=220;
        cardWidth= 550;
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
                height: cardHeight
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
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Deployment Strategy</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.priority}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Rolling Update Strategy</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.rollingUpdate}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Selectors</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.selectors}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Min Ready Seconds</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.minReadySec}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Revision History Limit</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.historyLimit}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Replicas</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.replicas}
                                    </Text>
                                </View>
                            </View>
                        }

                        {isDeploymentStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Available Replicas</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.availableReplicas}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Ready Replicas</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.readyReplicas}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Total Replicas</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.totalReplicas}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Unavailable Replicas</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.unavailableReplicas}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Updated Replicas</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.updatedReplicas}
                                    </Text>
                                </View>
                            </View>
                        }

                        {isPodsConfiguration &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Priority</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.priority}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Node</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.node}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Service Account</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.serviceAccount}
                                    </Text>
                                </View>
                            </View>
                        }

                        {isPodsStatus &&
                            <View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>QoS</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.qos}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Phase</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.phase}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Pod IP</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.podIP}
                                    </Text>
                                </View>
                                <View style={commonStyles.fieldsContainer}>
                                    <Title style={commonStyles.workloadCardInfoLeftText}>Host IP</Title>
                                    <Text style={commonStyles.workloadCardInfoRightText}>
                                        {props.hostIP}
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