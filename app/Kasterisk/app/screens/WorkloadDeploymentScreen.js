import React, { Component, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Title } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";

import DetailPageApi from "../api/DetailPageApi";

import {
  fonts,
  spacings,
  commonStyles,
} from "../utils/styles.js";

import IndividualCard from "../components/Cards/IndividualCard";
import TableCard from "../components/Cards/TableCard";
import LabelButton from "../components/Buttons/LabelButton";

export default class WorkloadDeploymentScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deployment: this.props.route.params.deployment,
      age: this.props.route.params.age,
      labels: this.props.route.params.labels,
      pods: this.props.route.params.pods,
    };
  }

  render() {
    let conditions = DetailPageApi.DeploymentConditions(this.state.deployment.status.conditions);
    let podsInfo = DetailPageApi.PodsInfo(this.state.pods);
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
            selectors={Object.keys(this.state.labels).map((labelItem, labelIndex) => (
              <LabelButton
                key={labelIndex}
                text={labelItem + ":" + this.state.labels[labelItem]} />
            ))}
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
          <TableCard header="Pods" table={podsInfo}/>
          <TableCard header="Conditions" table={conditions}/>
          <IndividualCard header="Metadata" type="Deployment" 
            age={this.state.age}
            labels={Object.keys(this.state.labels).map((labelItem, labelIndex) => (
              <LabelButton
                key={labelIndex}
                text={labelItem + ":" + this.state.labels[labelItem]} />
            ))}
            annotations={Object.keys(this.state.deployment.metadata.annotations) + "    " +Object.values(this.state.deployment.metadata.annotations)}
          />
        </View>
      </ScrollView>
    );
  }

}