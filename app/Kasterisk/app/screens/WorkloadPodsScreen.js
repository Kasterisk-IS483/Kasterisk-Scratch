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
    let conditions = DetailPageApi.PodConditions(this.state.pod.status.conditions);
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
          <TableCard header="Pod Conditions" table={conditions}/>
          <IndividualCard header="Metadata" type="Pods"
            age={this.state.age}
            labels={Object.keys(this.state.labels).map((labelItem, labelIndex) => (
              <LabelButton
                key={labelIndex}
                text={labelItem + ":" + this.state.labels[labelItem]} />
            ))}
            control={this.state.pod.metadata.ownerReferences !== undefined ? this.state.pod.metadata.ownerReferences[0].name : "null"}
          />
        </View>

      </ScrollView>
    );
  }

}