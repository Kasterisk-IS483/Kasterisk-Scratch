import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useState } from "react";
import { View, ScrollView, Dimensions, Alert, Text, Icon } from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';
import Spinner from "react-native-loading-spinner-overlay";
import { Picker } from "@react-native-picker/picker";

import { checkServerStatus } from '../api/KubeApi'
import AwsApi from "../api/AwsApi";
import { AWSRegions } from "../utils/constants";
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
      region: ""
    };
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
    });
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
        selectedValue={this.region} onValueChange={(itemValue, itemIndex) => setRegion(itemValue)} >
        {AWSRegions.map((_item, _index) => (
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
        let clusterInfo = JSON.parse(await AsyncStorage.getItem(defaultCluster));
        let clusterName = clusterInfo.clusterData.name;
        // Alert.alert('a', JSON.stringify(clusterInfo))
        if (clusterInfo.authType == "aws"){
          let baseUrl = clusterInfo.clusterData.cluster.server;
          let region = clusterInfo.userData.user.region;
          let awsCredentials = clusterInfo.userData.user.awsCredentials;
          let token = AwsApi.getAuthToken(clusterName, awsCredentials, region);
        }
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
                no1="2"
                no2="0"
              />
            </View>
            <View style={this.getStyle().dashboardCardColumnContainer}>
              <OverviewCard
                image={require("../assets/replicaset.png")}
                name="ReplicaSet"
                text1="Ready"
                text2="Not Ready"
                no1="2"
                no2="1"
              />
            </View>
            <View style={this.getStyle().dashboardCardColumnContainer}>
              <OverviewCard
                image={require("../assets/pod.png")}
                name="Pod"
                text1="Running"
                text2="Pending"
                no1="3"
                no2="1"
              />
            </View>
          </View></View>;

      case 'second':
        return <View style={commonStyles.dashboardContainer}>
          <WorkloadCard
            name="test"
            age="0"
            status="4"
            total="4"
            variableField="Containers"
            variableFieldVal="echoserve"
          >
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
            <LabelButton text="testinge" />
            <LabelButton text="ab" />
          </WorkloadCard>
          <WorkloadCard
            name="test2"
            age="0"
            status="3"
            total="4"
            variableField="Containers"
            variableFieldVal="container"
          >
            <LabelButton text="test" />
            <LabelButton text="app:hellonode" />
            <LabelButton text="testinge" />
            <LabelButton text="ab" />
          </WorkloadCard>
          <WorkloadCard
            name="test3"
            age="0"
            status="0"
            total="2"
            variableField="Containers"
            variableFieldVal="test"
          >
            <LabelButton text="testinge" />
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
            <LabelButton text="ab" />
          </WorkloadCard>
          <WorkloadCard
            name="test4"
            age="0"
            status="3"
            total="3"
            variableField="Containers"
            variableFieldVal="test2"
          >
            <LabelButton text="ab" />
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
            <LabelButton text="testinge" />
          </WorkloadCard>
          <WorkloadCard
            name="test5"
            age="0"
            status="2"
            total="4"
            variableField="Containers"
            variableFieldVal="test3"
          >
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
            <LabelButton text="testinge" />
          </WorkloadCard>
          <WorkloadCard
            name="test6"
            age="0"
            status="1"
            total="4"
            variableField="Containers"
            variableFieldVal="test4"
          >
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
            <LabelButton text="testinge" />
            <LabelButton text="abcde" />
          </WorkloadCard>
        </View>;

      case 'third':
        return <View style={commonStyles.dashboardContainer}>
          <WorkloadCard
            name="hello-node"
            label="app:hellonode"
            age="0"
            status="4"
            total="4"
            variableField="Containers"
            variableFieldVal="echoserve"
          >
          </WorkloadCard>
          <WorkloadCard
            name="test"
            label="app:hellonode"
            age="0"
            status="3"
            total="4"
            variableField="Containers"
            variableFieldVal="container"
          >
          </WorkloadCard>
          <WorkloadCard
            name="test"
            label="app:hellonode"
            age="0"
            status="0"
            total="2"
            variableField="Containers"
            variableFieldVal="test"
          >
          </WorkloadCard>
          <WorkloadCard
            name="hello-node2"
            label="app:hellonode"
            age="0"
            status="3"
            total="3"
            variableField="Containers"
            variableFieldVal="test2"
          >
          </WorkloadCard>
          <WorkloadCard
            name="test"
            label="app:hellonode"
            age="0"
            status="2"
            total="4"
            variableField="Containers"
            variableFieldVal="test3"
          >
          </WorkloadCard>
        </View>;

      case 'fourth':
        return <View style={commonStyles.dashboardContainer}>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Running"
            variableField="Restarts"
            variableFieldVal="0"
          >
            <LabelButton text="app:hellonode" />
          </WorkloadCard>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Running"
            variableField="Restarts"
            variableFieldVal="0"
          >
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
          </WorkloadCard>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Running"
            variableField="Restarts"
            variableFieldVal="0"
          />
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Running"
            variableField="Restarts"
            variableFieldVal="0"
          >
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
            <LabelButton text="testinge" />
          </WorkloadCard>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Running"
            variableField="Restarts"
            variableFieldVal="0"
          >
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
            <LabelButton text="testinge" />
            <LabelButton text="abcde" />
          </WorkloadCard>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Running"
            variableField="Restarts"
            variableFieldVal="0"
          >
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
            <LabelButton text="testinge" />
            <LabelButton text="abcde" />
          </WorkloadCard>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Pending"
            variableField="Restarts"
            variableFieldVal="0"
          >
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
          </WorkloadCard>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Pending"
            variableField="Restarts"
            variableFieldVal="0"
          >
            <LabelButton text="app:hellonode" />
            <LabelButton text="test" />
            <LabelButton text="testinge" />
            <LabelButton text="abcde" />
          </WorkloadCard>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Pending"
            variableField="Restarts"
            variableFieldVal="0"
          >
          </WorkloadCard>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Pending"
            variableField="Restarts"
            variableFieldVal="0"
          >
          </WorkloadCard>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Pending"
            variableField="Restarts"
            variableFieldVal="0"
          >
          </WorkloadCard>
          <WorkloadCard
            name="hello-node"
            age="0"
            status="Pending"
            variableField="Restarts"
            variableFieldVal="0"
          >
          </WorkloadCard>
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