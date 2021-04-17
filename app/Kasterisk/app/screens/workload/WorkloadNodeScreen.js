import React, { Component } from "react";
import { View, Dimensions, Alert } from "react-native";
import { Title } from 'react-native-paper';

import DetailPageApi from "../../api/DetailPageApi";
import { checkServerStatus } from "../../api/KubeApi";
import { 
  getLabelButtons, 
  getAgeText, 
  checkDefaultCluster, 
  annotationsToString 
} from "../../utils/constants";
import {
  commonStyles,
  getOrientation,
  getStyle
} from "../../utils/styles";
import DetailsCard from "../../components/Cards/DetailsCard";
import TableCard from "../../components/Cards/TableCard";
import WorkloadTemplate from "../../components/Templates/WorkloadTemplate";

export default class WorkloadNodeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      node: this.props.route.params.node,
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
    let annotations = this.state.node.metadata.annotations;
    let stringAnnotations = annotationsToString(annotations);
    
    return (
      <WorkloadTemplate type="details" showSpinner={this.state.spinner}>
        <Title style={commonStyles.headerTitle}>
          {this.state.node.metadata.name}
        </Title>

        <View style={getStyle().rowContainer}>
          <View style={getStyle().columnContainer}>
            <DetailsCard header="Configuration" type="Node"
              architecture={this.state.node.status.nodeInfo.architecture}
              bootID={this.state.node.status.nodeInfo.bootID}
              containerRuntimeVersion={this.state.node.status.nodeInfo.containerRuntimeVersion}
              kernelVersion={this.state.node.status.nodeInfo.kernelVersion}
              kubeProxyVersion={this.state.node.status.nodeInfo.kubeProxyVersion}
              machineID={this.state.node.status.nodeInfo.machineID}
              operatingSystem={this.state.node.status.nodeInfo.operatingSystem}
              osImage={this.state.node.status.nodeInfo.osImage}
              architecture={this.state.node.status.nodeInfo.architecture}
              systemUUID={this.state.node.status.nodeInfo.systemUUID}
            />
          </View>

        </View>

        <TableCard header="Conditions" type="Node"
          table={DetailPageApi.Conditions(this.state.node.status.conditions, "node")}
        />

        <View style={getStyle().rowContainer}>
          <View style={getStyle().columnContainer}>
            <TableCard header="Resources" type="Node"
              table={DetailPageApi.PodResources(this.state.node.status)}
            />
          </View>
          <View style={getStyle().columnContainer}>
            <TableCard header="Addresses" type="Node"
              table={DetailPageApi.PodAddresses(this.state.node.status.addresses)}
            />
          </View>
        </View>

        <TableCard header="Images" type="Node"
          table={DetailPageApi.PodImages(this.state.node.status.images)}
        />

        <DetailsCard header="Metadata" type="Node"
          age={getAgeText(this.state.node.metadata.creationTimestamp)}
          labels={getLabelButtons(this.state.node.metadata.labels,Object.keys(this.state.node.metadata.labels).length,true)}
          annotations={stringAnnotations}
        />
      </WorkloadTemplate>
    );
  }

}