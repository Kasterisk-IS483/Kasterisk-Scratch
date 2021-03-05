import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useState } from "react";
import { View, ScrollView, Dimensions, Alert, Text, TouchableOpacity } from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';
import Spinner from "react-native-loading-spinner-overlay";
import { Picker } from "@react-native-picker/picker";

import { checkServerStatus } from '../api/KubeApi'
import DeploymentApi from "../api/DeploymentApi";
import ReplicasetApi from "../api/ReplicasetApi";
import PodApi from "../api/PodApi";
import WorkloadSummaryApi from "../api/WorkloadSummaryApi";
import {
  colours,
  spacings,
  commonStyles,
  landscapeStyles,
  portraitStyles,
} from "../utils/styles.js";
import OverviewCard from "../components/Cards/OverviewCard";
import WorkloadCard from "../components/Cards/WorkloadCard";
import LabelButton from "../components/Buttons/LabelButton";

export default class WorkloadSummaryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      result: null,
      index: 0,
      routes: [
        { key: 'first', title: 'All' },
        { key: 'second', title: 'Deployment' },
        { key: 'third', title: 'Replicaset' },
        { key: 'fourth', title: 'Pod' },
      ],
      spinner: false,
      namespaceLabels: [],
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
    this.updateState = this.updateState.bind(this);
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
    });
  }

  async updateState(stateKey, value) {
    if (stateKey == "namespace") {
      let deployments = await WorkloadSummaryApi.deploymentSummary(value);
      let replicaSets = await WorkloadSummaryApi.replicasetSummary(value);
      let pods = await WorkloadSummaryApi.podSummary(value);
      let deploymentsInfo = await WorkloadSummaryApi.deploymentsInfo(value);
      let replicasetsInfo = await WorkloadSummaryApi.replicasetsInfo(value);
      let podsInfo = await WorkloadSummaryApi.podsInfo(value);
      this.setState({
        namespace: value,
        deploymentSummary: deployments,
        replicasetSummary: replicaSets,
        podSummary: pods,
        deploymentsInfo: deploymentsInfo,
        replicasetsInfo: replicasetsInfo,
        podsInfo: podsInfo
      })
    }
    else if (stateKey == "deploymentsInfo") {
      this.setState({ deploymentsInfo: value });
    }
  }

  getOrientation() {
    if (Dimensions.get("window").width > Dimensions.get("window").height) {
      return "LANDSCAPE";
    } else {
      return "PORTRAIT";
    }
  }

  getStyle() {
    if (this.getOrientation() === "LANDSCAPE") {
      return landscapeStyles;
    } else {
      return portraitStyles;
    }
  }

  onLayout() {
    this.setState({ orientation: this.getOrientation() });
  }

  NamespaceList() {
    return (
      <Picker
        selectedValue={this.state.namespace} onValueChange={(itemValue) => this.updateState("namespace", itemValue)} >
        {this.state.namespaceLabels.map((_item, _index) => (
          <Picker.Item label={_item.label} value={_item.value} key={_item.value} />
        ))}
      </Picker>
    );
  };

  //state = { credentials: [] };

  // async getGoogle(){
  //   try{
  //     let google1 = await AsyncStorage.getItem("ClusterAuthProviderGoogle");
  //     google1 = JSON.parse(google1);
  //     return google1;
  //   } catch (error) {
  //     // Error retrieving data

  //     console.log(error.message);
  //   }
  // }

  // async componentDidMount(){
  //   let response = await this.getGoogle()
  //     this.setState({credentials : response});
  // }


  async componentDidMount() {
    this.setState({
      spinner: true
    })
    try {
      let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
      console.log(defaultCluster);

      if (defaultCluster == null) {
        Alert.alert("Error", 'Default cluster not found')
        this.setState({
          spinner: false
        })
        this.props.navigation.navigate('Cluster')
        return;
      }

      let serverStatus = await checkServerStatus(defaultCluster);
      console.log(serverStatus);
      if (serverStatus[0] == 200) {
        this.setState({
          namespaceLabels: await WorkloadSummaryApi.namespaceLabels(),
          deploymentSummary: await WorkloadSummaryApi.deploymentSummary(this.state.namespace),
          replicasetSummary: await WorkloadSummaryApi.replicasetSummary(this.state.namespace),
          podSummary: await WorkloadSummaryApi.podSummary(this.state.namespace),
          deploymentsInfo: await WorkloadSummaryApi.deploymentsInfo(this.state.namespace),
          replicasetsInfo: await WorkloadSummaryApi.replicasetsInfo(this.state.namespace),
          podsInfo: await WorkloadSummaryApi.podsInfo(this.state.namespace),
        })
      } else {
        Alert.alert("Error", "Failed to contact cluster")
      }
    } catch (err) {
      Alert.alert("Server Check Failed", err.message);
    }

    this.setState({
      spinner: false
    })

  }

  DeploymentTab = () => {
    const { navigation } = this.props;
    return (
      this.state.deploymentsInfo.map((item, index) => (
        <TouchableOpacity onPress={() => navigation.navigate("WorkloadDeployment")} style={{
          flexDirection: 'row'
        }} >
          <WorkloadCard
            key={index}
            name={item.name}
            age={item.age}
            status={item.status}
            total={item.total}
            variableField="Containers"
            variableFieldVal={item.containers}
          >
            {Object.keys(item.labels).map((labelItem, labelIndex) => (
              <LabelButton
                key={labelIndex}
                text={labelItem + ":" + item.labels[labelItem]} />
            ))}
          </WorkloadCard>
        </TouchableOpacity>)
      )
    )
  };

  ReplicasetTab = () => {
    const { navigation } = this.props;
    return (
      this.state.replicasetsInfo.map((item, index) => (
        <TouchableOpacity onPress={() => navigation.navigate("WorkloadReplicaset")} style={{
          flexDirection: 'row'
        }} >
          <WorkloadCard
            key={index}
            name={item.name}
            age={item.age}
            status={item.status}
            total={item.total}
            variableField="Containers"
            variableFieldVal={item.containers}
          >
            {Object.keys(item.labels).map((labelItem, labelIndex) => (
              <LabelButton
                key={labelIndex}
                text={labelItem + ":" + item.labels[labelItem]} />
            ))}
          </WorkloadCard>
        </TouchableOpacity>)
      )
    )
  };

  PodTab = () => {
    const { navigation } = this.props;
    return (
      this.state.podsInfo.map((item, index) => (
        <TouchableOpacity onPress={() => navigation.navigate("WorkloadPods")} style={{
          flexDirection: 'row'
        }} >
          <WorkloadCard
            key={index}
            name={item.name}
            age={item.age}
            status={item.status}
            variableField="Restarts"
            variableFieldVal={item.restarts}
          >
            {Object.keys(item.labels).map((labelItem, labelIndex) => (
              <LabelButton
                key={labelIndex}
                text={labelItem + ":" + item.labels[labelItem]} />
            ))}
          </WorkloadCard>
        </TouchableOpacity>)
      )
    )
  };

  _handleIndexChange = index => this.setState({ index });
  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: colours.primary }}
      />
    )
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <View>
          <View>
            <Text
              style={[
                commonStyles.formSectionHeaader,
                {
                  marginHorizontal: spacings.xxl,
                  paddingHorizontal: spacings.sm,
                },
              ]}
            >
              Select Namespace:
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "black",
                marginTop: spacings.sm,
                marginHorizontal: 40
              }}>
              {this.NamespaceList()}
            </View>
          </View>
          <View style={this.getStyle().dashboardRowContainer}>
            <View style={this.getStyle().dashboardCardColumnContainer}>

              <OverviewCard
                image={require("../assets/deployment.png")}
                name="Deployment"
                text1="Ready"
                text2="Not Ready"
                no1={this.state.deploymentSummary.readyDeployments}
                no2={this.state.deploymentSummary.notReadyDeployments}
              />
            </View>
            <View style={this.getStyle().dashboardCardColumnContainer}>
              <OverviewCard
                image={require("../assets/replicaset.png")}
                name="ReplicaSet"
                text1="Ready"
                text2="Not Ready"
                no1={this.state.replicasetSummary.readyReplicaSets}
                no2={this.state.replicasetSummary.notReadyReplicaSets}
              />
            </View>
            <View style={this.getStyle().dashboardCardColumnContainer}>
              <OverviewCard
                image={require("../assets/pod.png")}
                name="Pod"
                text1="Running"
                text2="Pending"
                no1={this.state.podSummary.readyPods}
                no2={this.state.podSummary.notReadyPods}
              />
            </View>
          </View>
        </View>
          ;

      case 'second':
        return <View style={commonStyles.dashboardContainer}>
          {this.DeploymentTab()}
        </View>;

      case 'third':
        return <View style={commonStyles.dashboardContainer}>
          {this.ReplicasetTab()}
        </View>;

      case 'fourth':
        return <View style={commonStyles.dashboardContainer}>
          {this.PodTab()}
        </View>;

      default:
        return null;
    }
  };

  render() {
    return (
      <ScrollView style={commonStyles.secondaryContainer}>
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={{ color: '#FFF' }}
        />
        <TabView
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </ScrollView>
    );
  }

}