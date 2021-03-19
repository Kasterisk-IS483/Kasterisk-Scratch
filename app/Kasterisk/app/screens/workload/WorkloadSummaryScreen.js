import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { defined } from "react-native-reanimated";

import { checkServerStatus } from "../../api/KubeApi";
import DeploymentApi from "../../api/DeploymentApi";
import ReplicasetApi from "../../api/ReplicasetApi";
import PodApi from "../../api/PodApi";
import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";
import DetailPageApi from "../../api/DetailPageApi";
import { getLabelButtons } from "../../utils/constants";
import {
  colours,
  commonStyles,
  dashboardStyles,
  dashboardPortraitStyles,
  workloadOverviewBreakpoint,
} from "../../utils/styles.js";
import OverviewCard from "../../components/Cards/OverviewCard";
import WorkloadCard from "../../components/Cards/WorkloadCard";
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

export default class WorkloadSummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      result: null,
      index: this.props.index !== undefined ? this.props.index : 0,
      routes: [
        { key: "first", title: "Overview" },
        { key: "second", title: "Deployments" },
        { key: "third", title: "Replicasets" },
        { key: "fourth", title: "Pods" },
      ],
      spinner: false,
      namespace: "",
      deploymentSummary: {
        readyDeployments: 0,
        notReadyDeployments: 0,
      },
      replicasetSummary: {
        readyReplicaSets: 0,
        notReadyReplicaSets: 0,
      },
      podSummary: {
        readyPods: 0,
        notReadyPods: 0,
      },
      deploymentsInfo: [],
      replicasetsInfo: [],
      podsInfo: [],
    };
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
    });
    this.updateState = this.updateState.bind(this);
  }

  getOrientation() {
    if (Dimensions.get("window").width > workloadOverviewBreakpoint) {
      return "LANDSCAPE";
    } else {
      return "PORTRAIT";
    }
  }
  getStyle() {
    if (this.getOrientation() === "LANDSCAPE") {
      return dashboardStyles;
    } else {
      return dashboardPortraitStyles;
    }
  }
  onLayout() {
    this.setState({ orientation: this.getOrientation() });
  }

  async updateState(stateKey, value) {
    if (this.props.index !== undefined) {
      this.setState({
        index: this.props.index,
      });
    }
  }

  async componentDidMount() {
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

      if (this.props.index !== undefined) {
        this.setState({
          index: this.props.index,
        });
        console.log("index" + this.state.index);
      }

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
          deploymentSummary: await WorkloadSummaryApi.deploymentSummary(
            this.state.namespace
          ),
          replicasetSummary: await WorkloadSummaryApi.replicasetSummary(
            this.state.namespace
          ),
          podSummary: await WorkloadSummaryApi.podSummary(this.state.namespace),
          deploymentsInfo: await WorkloadSummaryApi.deploymentsInfo(
            this.state.namespace
          ),
          replicasetsInfo: await WorkloadSummaryApi.replicasetsInfo(
            this.state.namespace
          ),
          podsInfo: await WorkloadSummaryApi.podsInfo(this.state.namespace),
        });
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

  DeploymentTab = () => {
    const { navigation } = this.props;
    return this.state.deploymentsInfo.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={async () =>
          navigation.navigate("WorkloadDeployment", {
            deployment: await DeploymentApi.readDeployment(
              item.namespace,
              item.name
            ),
            pods: await PodApi.listPod(item.namespace),
          })
        }
      >
        <WorkloadCard
          name={item.name}
          age={item.age}
          status={item.status}
          total={item.total}
          variableField="Containers"
          variableFieldVal={item.containers}
        >
          {getLabelButtons(item.labels, 3)}
        </WorkloadCard>
      </TouchableOpacity>
    ));
  };

  ReplicasetTab = () => {
    const { navigation } = this.props;
    return this.state.replicasetsInfo.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={async () =>
          navigation.navigate("WorkloadReplicaset", {
            replicaset: await ReplicasetApi.readReplicaSet(
              item.namespace,
              item.name
            ),
            podstatus: await DetailPageApi.PodsStatuses(item.namespace),
          })
        }
      >
        <WorkloadCard
          name={item.name}
          age={item.age}
          status={item.status}
          total={item.total}
          variableField="Containers"
          variableFieldVal={item.containers}
        >
          {getLabelButtons(item.labels, 3)}
        </WorkloadCard>
      </TouchableOpacity>
    ));
  };

  PodTab = () => {
    const { navigation } = this.props;
    return this.state.podsInfo.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={async () =>
          navigation.navigate("WorkloadPod", {
            pod: await PodApi.readPod(item.namespace, item.name),
          })
        }
      >
        <WorkloadCard
          name={item.name}
          age={item.age}
          status={item.status}
          variableField="Restarts"
          variableFieldVal={item.restarts}
        >
          {getLabelButtons(item.labels, 3)}
        </WorkloadCard>
      </TouchableOpacity>
    ));
  };

  _handleIndexChange = (index) => this.setState({ index });
  _renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "white" }}
        style={{ backgroundColor: colours.primary }}
      />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View style={this.getStyle().rowContainer}>
            <View style={this.getStyle().columnContainer}>
              <TouchableOpacity onPress={() => this.setState({ index: 1 })}>
                <OverviewCard name="Deployments"
                  image={require("../../assets/deployment.png")}
                  text1="Ready"
                  text2="Not Ready"
                  no1={this.state.deploymentSummary.readyDeployments}
                  no2={this.state.deploymentSummary.notReadyDeployments}
                />
              </TouchableOpacity>
            </View>
            <View style={this.getStyle().columnContainer}>
              <TouchableOpacity onPress={() => this.setState({ index: 2 })}>
                <OverviewCard name="ReplicaSets"
                  image={require("../../assets/replicaset.png")}
                  text1="Ready"
                  text2="Not Ready"
                  no1={this.state.replicasetSummary.readyReplicaSets}
                  no2={this.state.replicasetSummary.notReadyReplicaSets}
                />
              </TouchableOpacity>
            </View>
            <View style={this.getStyle().columnContainer}>
              <TouchableOpacity onPress={() => this.setState({ index: 3 })}>
                <OverviewCard name="Pods"
                  image={require("../../assets/pod.png")}
                  text1="Running"
                  text2="Pending"
                  no1={this.state.podSummary.readyPods}
                  no2={this.state.podSummary.notReadyPods}
                />
              </TouchableOpacity>
            </View>
          </View>
        );

      case "second":
        return (
          <View style={dashboardStyles.wrapContainer}>
            {this.DeploymentTab()}
          </View>
        );

      case "third":
        return (
          <View style={dashboardStyles.wrapContainer}>
            {this.ReplicasetTab()}
          </View>
        );

      case "fourth":
        return (
          <View style={dashboardStyles.wrapContainer}>{this.PodTab()}</View>
        );

      default:
        return null;
    }
  };

  render() {
    return (
      <ScrollView style={commonStyles.secondaryContainer}>
        <SpinnerOverlay showSpinner={this.state.spinner} />
        <TabView
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          initialLayout={{ width: Dimensions.get("window").width }}
          sceneContainerStyle={this.getStyle().scrollContainer}
        />
      </ScrollView>
    );
  }
}
