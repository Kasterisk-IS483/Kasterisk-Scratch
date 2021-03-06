import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Title } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";

import { checkServerStatus } from '../api/KubeApi';
import {
  fonts,
  spacings,
  commonStyles,
} from "../utils/styles.js";

import IndividualCard from "../components/Cards/IndividualCard";
import TableCard from "../components/Cards/TableCard";

export default class WorkloadReplicasetScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      replicaset: this.props.route.params.replicaset,
      age: this.props.route.params.age,
      labels: this.props.route.params.labels,
      podstatus: this.props.route.params.podstatus,
    };
  }

  render() {
    console.log(this.state.replicaset);
    console.log(this.state.podstatus);
    let replicaStatus = "Current " + this.state.replicaset.status.replicas + " / " + "Desired " + Object.values(this.state.replicaset.metadata.annotations)[0];
    return (
      <ScrollView style={commonStyles.secondaryContainer}>
        {/* <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={{ color: '#FFF' }}
        /> */}

        <Title style={commonStyles.headerTitle}>
        {this.state.replicaset.metadata.name}
        </Title> 

        <View style={commonStyles.dashboardContainer}>
          <IndividualCard header="Configuration" type="Replicaset"
            control={this.state.replicaset.metadata.ownerReferences[0].name}
            status={replicaStatus}
            numberReplica={this.state.replicaset.spec.replicas}
          ></IndividualCard>
          <IndividualCard header="Status" type="Replicaset"
            waiting={this.state.podstatus.waiting}
            running={this.state.podstatus.running}
            failed={this.state.podstatus.failed}
            succeeded={this.state.podstatus.succeeded}
          ></IndividualCard>
          <TableCard header="Conditions" />
          <IndividualCard header="Metadata" type="Replicaset" 
            age={this.state.age}
          />
        </View>

      </ScrollView>
    );
  }

}