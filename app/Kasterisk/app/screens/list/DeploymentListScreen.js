import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, Alert } from "react-native";

import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";
import { checkDefaultCluster } from "../../utils/constants";
import {
  getOrientation
} from "../../utils/styles";
import WorkloadTemplate from "../../components/Templates/WorkloadTemplate";

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
  }

  onLayout() {
    this.setState({ orientation: getOrientation() });
  }

  formatObject(item) {
    item.status = item.status + "/" + item.total;
    delete item.total;
    this.setState({
      deploymentArr: [...this.state.deploymentArr, Object.values(item)],
    });
  }

  setWindow = () => {
    this.setState(Dimensions.get("window"));
  }

  async componentDidMount() {
    Dimensions.addEventListener("change", this.setWindow);

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
      let serverStatus = await checkDefaultCluster();
      if (!serverStatus){
        this.setState({
          spinner: false,
        });
        this.props.navigation.navigate("ChooseCluster");
        return;
      }
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

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.setWindow);
  }

  render() {
    return (
      <WorkloadTemplate type="list" header="Deployments List" showSpinner={this.state.spinner}>
        {this.state.deploymentArr}
      </WorkloadTemplate>
    );
  }
}
