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
import DetailPageApi from "../api/DetailPageApi";

import {
  colours,
  spacings,
  commonStyles,
  dashboardStyles,
} from "../utils/styles.js";

import OverviewCard from "../components/Cards/OverviewCard";
import WorkloadCard from "../components/Cards/WorkloadCard";
import LabelButton from "../components/Buttons/LabelButton";

export default class WorkloadSummaryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
  }

  async updateState(stateKey, value) {
    if (this.props.index!==undefined) {
      this.setState({
        index: this.props.index
      })
    }
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

  async componentDidMount() {
    this.setState({
      spinner: true,
    })

    if(await AsyncStorage.getItem("@selectedValue")!=null){
      this.setState({
        namespace: await AsyncStorage.getItem("@selectedValue")
      })
    }
    
    try {
      let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
      console.log(defaultCluster);

      if (this.props.index !== undefined) {
        this.setState({
          index: this.props.index
        })
        console.log("index"+this.index);
      }

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
        <TouchableOpacity key={index} onPress={async () => navigation.navigate("WorkloadDeployment", {
          deployment: await DeploymentApi.readDeployment(item.namespace, item.name),
          age: item.age,
          labels: item.labels,
          pods: await PodApi.listPod(item.namespace),
        })}
          style={{ flexDirection: 'row' }} >
          <WorkloadCard
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
        <TouchableOpacity key={index} onPress={async () => navigation.navigate("WorkloadReplicaset", {
          replicaset: await ReplicasetApi.readReplicaSet(item.namespace, item.name),
          age: item.age,
          labels: item.labels,
          podstatus: await DetailPageApi.PodsStatuses(item.namespace),
        })}
          style={{ flexDirection: 'row' }} >
          <WorkloadCard
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
        <TouchableOpacity key={index} onPress={async () => navigation.navigate("WorkloadPods", {
          pod: await PodApi.readPod(item.namespace, item.name),
          age: item.age,
          labels: item.labels,
        })}
          style={{ flexDirection: 'row' }} >
          <WorkloadCard
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
        return <View style={{ marginTop: spacings.lg, marginHorizontal: spacings.xxl }}>
          <View style={dashboardStyles.rowContainer}>
            <View style={dashboardStyles.columnContainer}>
              <TouchableOpacity onPress={() => this.setState({ index: 1 })}>
                <OverviewCard
                  image={require("../assets/deployment.png")}
                  name="Deployment"
                  text1="Ready"
                  text2="Not Ready"
                  no1={this.state.deploymentSummary.readyDeployments}
                  no2={this.state.deploymentSummary.notReadyDeployments}
                />
              </TouchableOpacity>
            </View>
            <View style={dashboardStyles.columnContainer}>
              <TouchableOpacity onPress={() => this.setState({ index: 2 })}>
                <OverviewCard
                  image={require("../assets/replicaset.png")}
                  name="ReplicaSet"
                  text1="Ready"
                  text2="Not Ready"
                  no1={this.state.replicasetSummary.readyReplicaSets}
                  no2={this.state.replicasetSummary.notReadyReplicaSets}
                />
              </TouchableOpacity>
            </View>
            <View style={dashboardStyles.columnContainer}>
              <TouchableOpacity onPress={() => this.setState({ index: 3 })}>
                <OverviewCard
                  image={require("../assets/pod.png")}
                  name="Pod"
                  text1="Running"
                  text2="Pending"
                  no1={this.state.podSummary.readyPods}
                  no2={this.state.podSummary.notReadyPods}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
          ;

      case 'second':
        return <View style={commonStyles.wrapContainer}>
          {this.DeploymentTab()}
        </View>;

      case 'third':
        return <View style={commonStyles.wrapContainer}>
          {this.ReplicasetTab()}
        </View>;

      case 'fourth':
        return <View style={commonStyles.wrapContainer}>
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
          sceneContainerStyle={dashboardStyles.scrollContainer}
        />
      </ScrollView>
    );
  }

}