import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, ScrollView, Dimensions, Alert } from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';
import Spinner from "react-native-loading-spinner-overlay";

import { checkServerStatus } from '../api/KubeApi'
import DeploymentApi from "../api/DeploymentApi";
import PodApi from "../api/PodApi";
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
      spinner: false
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
      let serverStatus = await checkServerStatus();
      Alert.alert("Server Status", JSON.stringify(serverStatus));
      console.log(await DeploymentApi.listAllDeployment());
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
        return <View style={this.getStyle().dashboardRowContainer}>
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
        </View>;

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