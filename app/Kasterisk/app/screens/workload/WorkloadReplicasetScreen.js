import React, { Component } from "react";
import { View, Dimensions, Alert } from "react-native";
import { Title } from 'react-native-paper';

import { checkServerStatus } from "../../api/KubeApi";
import { getLabelButtons, getAgeText, checkDefaultCluster } from "../../utils/constants";
import {
  commonStyles,
  getOrientation,
  getStyle
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
  }

  onLayout() {
    this.setState({ orientation: getOrientation() });
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
      let defaultCluster = await checkDefaultCluster();
      if (!defaultCluster){
        this.setState({
          spinner: false,
        });
        this.props.navigation.navigate("ChooseCluster");
        return;
      }
      let serverStatus = await checkServerStatus(defaultCluster);
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
    let annotations = this.state.replicaset.metadata.annotations;
    let replicaStatus = "Current " + this.state.replicaset.status.replicas + " / " + "Desired " + Object.values(annotations)[0];
    let stringAnnotations = "";
    Object.keys(annotations).forEach(function (key) {
      if (!annotations[key].includes("{") && !annotations[key].includes("/"))
      stringAnnotations += key + "      " + annotations[key] + "\n";
    });
    return (
      <WorkloadTemplate type="details" showSpinner={this.state.spinner}>
        <Title style={commonStyles.headerTitle}>
          {this.state.replicaset.metadata.name}
        </Title>

        <View style={getStyle().rowContainer}>
          <View style={getStyle().columnContainer}>
            <DetailsCard header="Configuration" type="Replicaset"
              control={this.state.replicaset.metadata.ownerReferences[0].name}
              replicaStatus={replicaStatus}
              numberReplica={this.state.replicaset.spec.replicas}
            />
          </View>
          <View style={getStyle().columnContainer}>
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