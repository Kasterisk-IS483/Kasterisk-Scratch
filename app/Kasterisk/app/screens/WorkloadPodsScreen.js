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

export default class WorkloadPodsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pod: this.props.route.params.pod,
      age: this.props.route.params.age,
      labels: this.props.route.params.labels,
    };
  }

  render() {
    console.log(this.state.pod)
    return (
      <ScrollView style={commonStyles.secondaryContainer}>
        {/* <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={{ color: '#FFF' }}
        /> */}

        <Title style={commonStyles.headerTitle}>
          {this.state.pod.metadata.name}
        </Title> 

        <View style={commonStyles.dashboardContainer}>
          <IndividualCard header="Configuration" type="Pods"
            priority={this.state.pod.spec.priority}
            node={this.state.pod.spec.nodeName}
            serviceAccount={this.state.pod.spec.serviceAccount}
          ></IndividualCard>
          <IndividualCard header="Status" type="Pods"
            qos={this.state.pod.status.qosClass}
            phase={this.state.pod.status.phase}
            podIP={this.state.pod.status.podIP}
            hostIP={this.state.pod.status.hostIP}
          ></IndividualCard>
          <TableCard header="Conditions" />
          <IndividualCard header="Metadata" type="Pods"
            age={this.state.age}
            control={this.state.pod.metadata.ownerReferences !== undefined ? this.state.pod.metadata.ownerReferences[0].name : "null"}
          />
        </View>

      </ScrollView>
    );
  }

}