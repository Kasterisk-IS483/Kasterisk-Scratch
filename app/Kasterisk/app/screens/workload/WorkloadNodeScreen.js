import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, ScrollView, Dimensions, Alert } from "react-native";
import { Title } from 'react-native-paper';
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

import { checkServerStatus } from "../../api/KubeApi";
import DetailPageApi from "../../api/DetailPageApi";
import { getLabelButtons, getAgeText } from "../../utils/constants";

import { 
  commonStyles, 
  dashboardStyles, 
  commonPortraitStyles, 
  workloadDetailsBreakpoint 
} from "../../utils/styles.js";

import DetailsCard from "../../components/Cards/DetailsCard";
import TableCard from "../../components/Cards/TableCard";

export default class WorkloadNodeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      node: this.props.route.params.node,
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
      let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
      
      if (defaultCluster == null) {
        Alert.alert("Error", "Default cluster not found");
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

  render() {
    let annotations = this.state.node.metadata.annotations;
    let stringAnnotations = "";
    Object.keys(annotations).forEach(function(key) {
      stringAnnotations += key + "      " + annotations[key] + "\n";
    });
    return (
      <ScrollView style={dashboardStyles.scrollContainer}>
        <SpinnerOverlay showSpinner={this.state.spinner} />
        <View style={commonStyles.detailsContainer}>

          <Title style={commonStyles.headerTitle}>
            {this.state.node.metadata.name}
          </Title>

          <View style={this.getStyle().rowContainer}>
            <View style={this.getStyle().columnContainer}>
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

          <View style={this.getStyle().rowContainer}>
            <View style={this.getStyle().columnContainer}>
              <TableCard header="Resources" type="Node"
                table={DetailPageApi.PodResources(this.state.node.status)} 
              />
            </View>
            <View style={this.getStyle().columnContainer}>
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
            labels={getLabelButtons(this.state.node.metadata.labels) }
            annotations={stringAnnotations}
          />

        </View>
      </ScrollView>
    );
  }

}