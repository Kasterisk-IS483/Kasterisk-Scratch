import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, Dimensions, Alert } from "react-native";
import { Title } from 'react-native-paper';

import { checkServerStatus } from "../../api/KubeApi";
import { getLabelButtons, getAgeText, checkDefaultCluster } from "../../utils/constants";
import {
  commonStyles,
  commonPortraitStyles,
  workloadDetailsBreakpoint
} from "../../utils/styles";
import DetailsCard from "../../components/Cards/DetailsCard";
import WorkloadTemplate from "../../components/Templates/WorkloadTemplate";

export default class WorkloadReplicasetScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      replicaset: this.props.route.params.replicaset,
      labels: this.props.route.params.labels,
      podstatus: this.props.route.params.podstatus,
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

  async componentDidMount() {
    this.setState({
      spinner: true,
    });

    try {
      let serverStatus = await checkDefaultCluster();
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

  render() {
    let annotations = this.state.replicaset.metadata.annotations;
    let replicaStatus = "Current " + this.state.replicaset.status.replicas + " / " + "Desired " + Object.values(annotations)[0];
    let stringAnnotations = "";
    Object.keys(annotations).forEach(function (key) {
      stringAnnotations += key + "      " + annotations[key] + "\n";
    });
    return (
      <WorkloadTemplate type="details" showSpinner={this.state.spinner}>
        <Title style={commonStyles.headerTitle}>
          {this.state.replicaset.metadata.name}
        </Title>

        <View style={this.getStyle().rowContainer}>
          <View style={this.getStyle().columnContainer}>
            <DetailsCard header="Configuration" type="Replicaset"
              control={this.state.replicaset.metadata.ownerReferences[0].name}
              replicaStatus={replicaStatus}
              numberReplica={this.state.replicaset.spec.replicas}
            />
          </View>
          <View style={this.getStyle().columnContainer}>
            <DetailsCard header="Status" type="Replicaset"
              waiting={this.state.podstatus.waiting}
              running={this.state.podstatus.running}
              failed={this.state.podstatus.failed}
              succeeded={this.state.podstatus.succeeded}
            />
          </View>
        </View>

        <DetailsCard header="Metadata" type="Replicaset"
          age={getAgeText(this.state.replicaset.metadata.creationTimestamp)}
          labels={getLabelButtons(this.state.replicaset.metadata.labels)}
          annotations={stringAnnotations}
          control={this.state.replicaset.metadata.ownerReferences[0].name}
        />
      </WorkloadTemplate>
    );
  }

}