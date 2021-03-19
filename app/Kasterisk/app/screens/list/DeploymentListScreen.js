import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ScrollView, Dimensions, Alert } from "react-native";
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

import { checkServerStatus } from "../../api/KubeApi";

import TableCard from "../../components/Cards/TableCard";
import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";

import {
  commonStyles,
  dashboardStyles,
  commonPortraitStyles,
  workloadDetailsBreakpoint,
} from "../../utils/styles.js";

export default class DeploymentListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      deployments: [],
      deploymentArr: [],
      namespace: "",
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

  formatObject(item) {
    item.status = item.status +"/" + item.total;
    delete item.total;
    this.setState({
      deploymentArr: [...this.state.deploymentArr, Object.values(item)],
    });
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
        this.state.deployments.map((item, index) => this.formatObject(item));

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
      <ScrollView style={commonStyles.secondaryContainer, dashboardStyles.scrollContainer}>
        <SpinnerOverlay showSpinner={this.state.spinner} />
        <View style={commonStyles.detailsContainer}>
          <TableCard header="Deployments List" table={this.state.deploymentArr} />
        </View>
      </ScrollView>
    );
  }
}
