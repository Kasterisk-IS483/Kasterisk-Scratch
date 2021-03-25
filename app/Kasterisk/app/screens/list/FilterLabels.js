import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, Alert } from "react-native";

import { checkServerStatus } from "../../api/KubeApi";
import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";
import {
  commonStyles,
  commonPortraitStyles,
  workloadDetailsBreakpoint,
} from "../../utils/styles.js";
import WorkloadTemplate from "../../components/Templates/WorkloadTemplate";

export default class FilterLabelSCreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      deployments: [],
      deploymentArr: [],
      nodes: [],
      namespace: "",
      pods: [],
      podsArr: [],
      replicasets: [],
      replicasetsArr: [],
      spinner: false,
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

  formatObject(item, service) {
    item.status = item.status + "/" + item.total;
    delete item.total;
    if(service=="deployments"){
        this.setState({
        deploymentArr: [...this.state.deploymentArr, Object.values(item)],
        });
    }else if (service == "replicasets"){
        this.setState({
            replicasetsArr: [...this.state.replicasetsArr, Object.values(item)],
        });
    }else if (service == "pods"){
        this.setState({
            podsArr: [...this.state.podsArr, Object.values(item)],
        });
    }
  }
  async componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      spinner: true,
    });

    if ((await AsyncStorage.getItem("@selectedValue")) != null) {
      this.setState({
        namespace: await AsyncStorage.getItem("@selectedValue"),
      });
    }

    try {
      let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
      console.log(defaultCluster);

      if (defaultCluster == null) {
        Alert.alert("Error", "Default cluster not found");
        this.setState({
          spinner: false,
        });
        this.props.navigation.navigate("ChooseCluster");
        return;
      }

      let serverStatus = await checkServerStatus(defaultCluster);
      console.log(serverStatus);
      if (serverStatus[0] == 200) {
        this.setState({
          deployments: await WorkloadSummaryApi.deploymentsInfo(
            this.state.namespace
          ),
        });
        this.state.deployments.map((item, index) => this.formatObject(item,"deployments"));
        this.setState({
            nodes: await WorkloadSummaryApi.nodesInfo(),
          });
          this.setState({
            pods: await WorkloadSummaryApi.podsInfo(
              this.state.namespace
            ),
          });
          this.state.pods.map((item, index) => this.formatObject(item,"pods"));
          this.setState({
            replicasets: await WorkloadSummaryApi.replicasetsInfo(
              this.state.namespace
            ),
          });
          this.state.replicasets.map((item, index) => this.formatObject(item,"replicasets"));
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
    return (
      <WorkloadTemplate type="filter" showSpinner={this.state.spinner} deployment= {this.state.deploymentArr} nodes={this.state.nodes} pods={this.state.podsArr} replicasets={this.state.replicasetsArr}>
      </WorkloadTemplate>
    );
  }
}
