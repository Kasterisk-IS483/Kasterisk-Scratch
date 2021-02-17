import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useState } from "react";
import { View, ScrollView, Dimensions, Alert, Text, Icon } from "react-native";
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
      readyDeployments: 0,
      notReadyDeployments: 0,
      readyReplicaSets: 0,
      notReadyReplicaSets: 0,
      readyPods: 0,
      notReadyPods: 0,
      deploymentsInfo: [],
      replicasetsInfo: [],
      podsInfo: [],
    };
    this.updateState = this.updateState.bind(this);
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
    });
  }

  updateState(stateKey, value) {
    if (stateKey == "namespace"){
      this.setState({ namespace: value });
    }
    else if (stateKey == "deploymentsInfo"){
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

  listAllTest = async () => {
    try {
      console.log(await DeploymentApi.listAllDeployment());
      let namespace1 = await (
        DeploymentApi.listAllDeployment()
      );
      namespace1 = JSON.stringify(namespace1);

    } catch (err) {
      console.log(err);
      Alert.alert('Invalid Credentials', err.message);
    }
  }


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
      if (serverStatus[0] == 200){
        this.setState({
          namespaceLabels: await WorkloadSummaryApi.namespaceLabels(),
          readyDeployments: await WorkloadSummaryApi.readyDeployments(),
          notReadyDeployments: await WorkloadSummaryApi.notReadyDeployments(),
          readyReplicaSets: await WorkloadSummaryApi.readyReplicaSets(),
          notReadyReplicaSets: await WorkloadSummaryApi.notReadyReplicaSets(),
          readyPods: await WorkloadSummaryApi.readyPods(),
          notReadyPods: await WorkloadSummaryApi.notReadyPods(),
          deploymentsInfo: await WorkloadSummaryApi.deploymentsInfo(),
          replicasetsInfo: await WorkloadSummaryApi.replicasetsInfo(),
          podsInfo: await WorkloadSummaryApi.podInfoList(),
        })

      } else {
        Alert.alert("Error", "Failed to contact cluster")
      }

      // console.log(await DeploymentApi.listAllDeployment());
      // console.log(await WorkloadSummaryApi.readyDeployments());
      // console.log(await WorkloadSummaryApi.notReadyDeployments());

      // console.log(await ReplicasetApi.listAllReplicaSet());
      // console.log(await WorkloadSummaryApi.readyReplicaSets());
      // console.log(await WorkloadSummaryApi.notReadyReplicaSets());

      // console.log(await PodApi.listAllPod());
      // console.log(await WorkloadSummaryApi.readyPods());
      // console.log(await WorkloadSummaryApi.notReadyPods());

      // console.log(await WorkloadSummaryApi.nodesInfo());

    } catch (err) {
      Alert.alert("Server Check Failed", err.message);
    }

    this.setState({
      spinner: false
    })
    // await this.listAllTest();

  }

  DeploymentTab = () => {
    return (
    this.state.deploymentsInfo.map((item, index) => (
      <WorkloadCard 
        key={index}
        name={item.name}
        age={item.age}
        status={item.status}
        total={item.total}
        variableField="Containers"
        variableFieldVal="echoserve"
      >
      {Object.keys(item.labels).map((labelItem, labelIndex) => (
        <LabelButton 
          key={labelIndex}
          text={labelItem + ":"+ item.labels[labelItem]} />
        ))}
      </WorkloadCard>))
    )
  };

  ReplicasetTab = () => {
    return (
      this.state.replicasetsInfo.map((item, index) => (
        <WorkloadCard 
          key={index}
          name={item.name}
          age={item.age}
          status={item.status}
          total={item.total}
          variableField="Containers"
          variableFieldVal="echoserve"
        >
        {Object.keys(item.labels).map((labelItem, labelIndex) => (
          <LabelButton 
            key={labelIndex}
            text={labelItem + ":"+ item.labels[labelItem]} />
          ))}
        </WorkloadCard>))
    )
  };

  PodTab = () => {
    return (
      this.state.podsInfo.map((item, index) => (
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
            text={labelItem + ":"+ item.labels[labelItem]} />
          ))}
        </WorkloadCard>))
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
                no1={this.state.readyDeployments}
                no2={this.state.notReadyDeployments}
              />
            </View>
            <View style={this.getStyle().dashboardCardColumnContainer}>
              <OverviewCard
                image={require("../assets/replicaset.png")}
                name="ReplicaSet"
                text1="Ready"
                text2="Not Ready"
                no1={this.state.readyReplicaSets}
                no2={this.state.notReadyReplicaSets}
              />
            </View>
            <View style={this.getStyle().dashboardCardColumnContainer}>
              <OverviewCard
                image={require("../assets/pod.png")}
                name="Pod"
                text1="Running"
                text2="Pending"
                no1={this.state.readyPods}
                no2={this.state.notReadyPods}
              />
            </View>
          </View></View>;

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
          sceneContainerStyle={{ paddingVertical: spacings.xl }}
        />
      </ScrollView>
    );
  }

}