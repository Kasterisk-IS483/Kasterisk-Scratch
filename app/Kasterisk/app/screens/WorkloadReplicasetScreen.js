import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Title } from 'react-native-paper';

import { commonStyles, dashboardStyles } from "../utils/styles.js";

import DetailsCard from "../components/Cards/DetailsCard";
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
      <ScrollView style={dashboardStyles.scrollContainer}>
        <View style={dashboardStyles.detailsContainer}>

          <Title style={commonStyles.headerTitle}>
            {this.state.replicaset.metadata.name}
          </Title> 

          <View style={commonStyles.rowContainer}>
            <View style={commonStyles.columnContainer}>
              <DetailsCard header="Configuration" type="Replicaset"
                control={this.state.replicaset.metadata.ownerReferences[0].name}
                status={replicaStatus}
                numberReplica={this.state.replicaset.spec.replicas}
              />
            </View>
            <View style={commonStyles.columnContainer}>
              <DetailsCard header="Status" type="Replicaset"
                waiting={this.state.podstatus.waiting}
                running={this.state.podstatus.running}
                failed={this.state.podstatus.failed}
                succeeded={this.state.podstatus.succeeded}
              />
            </View>
          </View>

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