import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Title } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";

import { checkServerStatus } from '../api/KubeApi'

import {
  fonts,
  spacings,
  commonStyles,
} from "../utils/styles.js";

import IndividualCard from "../components/Cards/IndividualCard";
import TableCard from "../components/Cards/TableCard";

export default class WorkloadDeploymentScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deployment: this.props.route.params.deployment,
      age: this.props.route.params.age,
      labels: this.props.route.params.labels,
    };
  }

  render() {
    let rollingUpdate = "Max Surge " + this.state.deployment.spec.strategy.rollingUpdate.maxSurge + ", " + "Max Unavailable " + this.state.deployment.spec.strategy.rollingUpdate.maxUnavailable;
    return (
      <ScrollView style={commonStyles.secondaryContainer}>
        {/* <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={{ color: '#FFF' }}
        /> */}

        <Title style={commonStyles.headerTitle}>
          {this.state.deployment.metadata.name}
        </Title> 

        <View style={commonStyles.dashboardContainer}>
          <IndividualCard header="Configuration" type="Deployment" 
            deploymentStrategy={this.state.deployment.spec.strategy.type}
            rollingUpdate={rollingUpdate}
            minReadySec={this.state.deployment.spec.progressDeadlineSeconds}
            historyLimit={this.state.deployment.spec.revisionHistoryLimit}
            replicas={this.state.deployment.spec.replicas}
          ></IndividualCard>
          <IndividualCard header="Status" type="Deployment"
            availableReplicas={this.state.deployment.status.availableReplicas}
            readyReplicas={this.state.deployment.status.readyReplicas}
            totalReplicas={this.state.deployment.status.replicas}
            unavailableReplicas={this.state.deployment.status.replicas - this.state.deployment.status.availableReplicas}
            updatedReplicas={this.state.deployment.status.updatedReplicas}
          ></IndividualCard>
          <TableCard header="Pods" />
          <TableCard header="Conditions" />
          <IndividualCard header="Metadata" type="Deployment" 
            age={this.state.age}
            annotations={Object.keys(this.state.deployment.metadata.annotations) + "    " +Object.values(this.state.deployment.metadata.annotations)}
          />
        </View>
      </ScrollView>
    );
  }

}