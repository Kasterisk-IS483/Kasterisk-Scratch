import React, { Component, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Title } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";

import {
  fonts,
  spacings,
  commonStyles,
} from "../utils/styles.js";

import DetailsCard from "../components/Cards/DetailsCard";
import TableCard from "../components/Cards/TableCard";
import LabelButton from "../components/Buttons/LabelButton";

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
    let replicaStatus = "Current " + this.state.replicaset.status.replicas + " / " + "Desired " + Object.values(this.state.replicaset.metadata.annotations)[0];
    let annotations = this.state.replicaset.metadata.annotations;
    let stringAnnotations = "";
    Object.keys(annotations).forEach(function(key) {
      stringAnnotations += key + "      " + annotations[key] + "\n";
    });
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
          <DetailsCard header="Configuration" type="Replicaset"
            control={this.state.replicaset.metadata.ownerReferences[0].name}
            status={replicaStatus}
            numberReplica={this.state.replicaset.spec.replicas}
          ></DetailsCard>
          <DetailsCard header="Status" type="Replicaset"
            waiting={this.state.podstatus.waiting}
            running={this.state.podstatus.running}
            failed={this.state.podstatus.failed}
            succeeded={this.state.podstatus.succeeded}
          ></DetailsCard>
          <DetailsCard header="Metadata" type="Replicaset" 
            age={this.state.age}
            labels={Object.keys(this.state.labels).map((labelItem, labelIndex) => (
              <LabelButton
                key={labelIndex}
                text={labelItem + ":" + this.state.labels[labelItem]} />
            ))}
            annotations={stringAnnotations}
            control={this.state.replicaset.metadata.ownerReferences[0].name}
          />
        </View>

      </ScrollView>
    );
  }

}