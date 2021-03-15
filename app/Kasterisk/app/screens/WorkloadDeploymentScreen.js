import React, { Component } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Title } from 'react-native-paper';

import DetailPageApi from "../api/DetailPageApi";
import { getLabelButtons } from "../utils/constants";

import { 
  commonStyles, 
  dashboardStyles, 
  commonPortraitStyles, 
  workloadDetailsBreakpoint 
} from "../utils/styles.js";

import DetailsCard from "../components/Cards/DetailsCard";
import TableCard from "../components/Cards/TableCard";

export default class WorkloadDeploymentScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      deployment: this.props.route.params.deployment,
      age: this.props.route.params.age,
      labels: this.props.route.params.labels,
      pods: this.props.route.params.pods,
    };
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
    });
  }

  getOrientation() {
    if (Dimensions.get("window").width > workloadDetailsBreakpoint) {
      return "LANDSCAPE";
    } else {
      return "PORTRAIT";
    }
  }
  getStyle() {
    if (this.getOrientation() === "LANDSCAPE") {
      return commonStyles;
    } else {
      return commonPortraitStyles;
    }
  }
  onLayout() {
    this.setState({ orientation: this.getOrientation() });
  }

  render() {
    let conditions = DetailPageApi.DeploymentConditions(this.state.deployment.status.conditions);
    let podsInfo = DetailPageApi.PodsInfo(this.state.pods);
    let rollingUpdate = "Max Surge " + this.state.deployment.spec.strategy.rollingUpdate.maxSurge + ", " + "Max Unavailable " + this.state.deployment.spec.strategy.rollingUpdate.maxUnavailable;
    let containerPorts = this.state.deployment.spec.template.spec.containers[0].ports;
    let stringcontainerPorts = "";
    if (containerPorts == undefined){
      stringcontainerPorts += "80/TCP";
    }
    else {
      for (const containerPort of containerPorts){
        stringcontainerPorts += containerPort.name + " " + containerPort.containerPort + "/" + containerPort.protocol + "\n";
      }
    }
    
    return (
      <ScrollView style={dashboardStyles.scrollContainer}>
        <View style={commonStyles.detailsContainer}>

        <Title style={commonStyles.headerTitle}>
          {this.state.deployment.metadata.name}
        </Title>

        <View style={this.getStyle().rowContainer}>
          <View style={this.getStyle().columnContainer}>
            <DetailsCard header="Configuration" type="Deployment"
              deploymentStrategy={this.state.deployment.spec.strategy.type}
              rollingUpdate={rollingUpdate}
              selectors={getLabelButtons(this.state.labels)}
              minReadySec={this.state.deployment.spec.progressDeadlineSeconds}
              historyLimit={this.state.deployment.spec.revisionHistoryLimit}
              replicas={this.state.deployment.spec.replicas}
            />
          </View>
          <View style={this.getStyle().columnContainer}>
            <DetailsCard header="Status" type="Deployment"
              availableReplicas={this.state.deployment.status.availableReplicas}
              readyReplicas={this.state.deployment.status.readyReplicas}
              totalReplicas={this.state.deployment.status.replicas}
              unavailableReplicas={this.state.deployment.status.replicas - this.state.deployment.status.availableReplicas}
              updatedReplicas={this.state.deployment.status.updatedReplicas}
            ></DetailsCard>
          </View>
        </View>

        <TableCard header="Pods" table={podsInfo} />
        <TableCard header="Conditions" table={conditions} />

        <View style={this.getStyle().rowContainer}>
          <View style={this.getStyle().columnContainer}>
            <DetailsCard header="Pod Template" type="Deployment" 
              container={this.state.deployment.spec.template.spec.containers[0].name}
              label={getLabelButtons(this.state.deployment.spec.template.metadata.labels)}
              image={this.state.deployment.spec.template.spec.containers[0].image}
              containerPorts={stringcontainerPorts}
            />
          </View>
          <View style={this.getStyle().columnContainer}>
            <DetailsCard header="Metadata" type="Deployment"
              age={this.state.age}
              labels={getLabelButtons(this.state.labels)}
              annotations={Object.keys(this.state.deployment.metadata.annotations)[0] + "    " + Object.values(this.state.deployment.metadata.annotations)[0]}
            />
          </View>
        </View>
        </View>
      </ScrollView>
    );
  }

}