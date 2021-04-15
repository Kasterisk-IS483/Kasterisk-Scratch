import React, { Component } from "react";
import { View, Dimensions, Alert } from "react-native";
import { Title } from 'react-native-paper';

import DetailPageApi from "../../api/DetailPageApi";
import { getLabelButtons, getAgeText, checkDefaultCluster } from "../../utils/constants";
import {
  commonStyles,
  commonPortraitStyles,
  workloadDetailsBreakpoint
} from "../../utils/styles";
import DetailsCard from "../../components/Cards/DetailsCard";
import TableCard from "../../components/Cards/TableCard";
import WorkloadTemplate from "../../components/Templates/WorkloadTemplate";

export default class WorkloadDeploymentScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      deployment: this.props.route.params.deployment,
      labels: this.props.route.params.labels,
      pods: this.props.route.params.pods,
    };
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

  setWindow = () => {
    this.setState(Dimensions.get("window"));
  }

  async componentDidMount() {
    Dimensions.addEventListener("change", this.setWindow);

    this.setState({
      spinner: true,
    });

    try {
      let serverStatus = await checkDefaultCluster();
      if (!serverStatus){
        this.setState({
          spinner: false,
        });
        this.props.navigation.navigate("ChooseCluster");
        return;
      }
      if (serverStatus[0] == 200) {
        console.log(serverStatus);
      } else {
        Alert.alert("Error", "Failed to contact cluster");
      }
    } catch (err) {
      Alert.alert("Server Check Failed", err.message);
    }

    this.setState({
      spinner: false,
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.setWindow);
  }

  render() {
    let maxSurge = this.state.deployment.spec.strategy.rollingUpdate !== undefined ? this.state.deployment.spec.strategy.rollingUpdate.maxSurge : 0;
    let maxUnavailable = this.state.deployment.spec.strategy.rollingUpdate !== undefined ? this.state.deployment.spec.strategy.rollingUpdate.maxUnavailable : 0;
    let rollingUpdate = "Max Surge " + maxSurge + ", " + "Max Unavailable " + maxUnavailable;
    let containerPorts = this.state.deployment.spec.template.spec.containers[0].ports;
    let stringcontainerPorts = "";
    if (containerPorts == undefined) {
      stringcontainerPorts += "80/TCP";
    } else {
      for (const containerPort of containerPorts) {
        stringcontainerPorts += containerPort.name + " " + containerPort.containerPort + "/" + containerPort.protocol + "\n";
      }
    }
    let annotations = this.state.deployment.metadata.annotations;
    let stringAnnotations = "";
    Object.keys(annotations).forEach(function (key) {
      if (!annotations[key].includes("{") && !annotations[key].includes("/"))
      stringAnnotations += key + "      " + annotations[key] + "\n";
    });

    return (
      <WorkloadTemplate type="details" showSpinner={this.state.spinner}>
        <Title style={commonStyles.headerTitle}>
          {this.state.deployment.metadata.name}
        </Title>
        <View style={this.getStyle().rowContainer}>
          <View style={this.getStyle().columnContainer}>
            <DetailsCard header="Configuration" type="Deployment"
              deploymentStrategy={this.state.deployment.spec.strategy.type}
              rollingUpdate={rollingUpdate}
              selectors={getLabelButtons(this.state.deployment.metadata.labels)}
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
            />
          </View>
        </View>

        <TableCard header="Pods" type="Deployment"
          table={DetailPageApi.PodsInfo(this.state.pods)}
        />

        <TableCard header="Conditions" type="Deployment"
          table={DetailPageApi.Conditions(this.state.deployment.status.conditions, "Deployment")}
        />

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
              age={getAgeText(this.state.deployment.metadata.creationTimestamp)}
              labels={getLabelButtons(this.state.deployment.metadata.labels)}
              annotations={stringAnnotations}
            />
          </View>
        </View>
      </WorkloadTemplate>
    );
  }

}