import React, { Component } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';

import {
  colours,
  spacings,  
  commonStyles,
  landscapeStyles,
  portraitStyles,
} from "../utils/styles.js";
import DeploymentApi from "../api/DeploymentApi.js";
import OverviewCard from "../components/Cards/OverviewCard";
import DeploymentCard from "../components/Cards/DeploymentCard";

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
        let namespace1 = await (
            DeploymentApi.listAllDeployment()
        );
        namespace1 = JSON.stringify(namespace1);
        alert(namespace1)

    } catch (err) {
        console.log(err);
        Alert.alert('Invalid Credentials', err.message);
    }
}

  async test(){
    alert(await AsyncStorage.getItem("baseURL")+" "+await AsyncStorage.getItem("refreshToken"));
  }

  async componentDidMount(){
    await this.listAllTest();
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
        return <View style={this.getStyle().workloadSummaryMainContainer}>

          <View style={this.getStyle().workloadSummaryRowContainer}>
            <View style={this.getStyle().workloadSummaryColumnContainer}>
              <OverviewCard image={require("../assets/deployment.png")} name="Deployment" ></OverviewCard>
            </View>
        
            <View style={this.getStyle().workloadSummaryColumnContainer}>
              <OverviewCard image={require("../assets/replicaset.png")} name="ReplicaSet" ></OverviewCard>
            </View>
        
            <View style={this.getStyle().workloadSummaryColumnContainer}>
              <OverviewCard image={require("../assets/pod.png")} name="Pod" ></OverviewCard>
            </View>
          </View>
        
        </View>;

      case 'second':
        return <View style={this.getStyle().workloadSummaryMainContainer}>

        <View style={this.getStyle().workloadSummaryRowContainer}>
            <View style={this.getStyle().workloadCard}>
                <View>
                    <DeploymentCard healthReady="4" healthTotal="4" label="app:hellonode" name="hello-node" ></DeploymentCard>
                </View>
            </View>
            <View style={this.getStyle().workloadCard}>
                <DeploymentCard healthReady="3" healthTotal="4" label="app:hellonode" name="test"></DeploymentCard>
            </View>
        </View>

        <View style={this.getStyle().workloadSummaryRowContainer}>
            <View style={this.getStyle().workloadCard}>
                <View>
                    <DeploymentCard healthReady="3" healthTotal="3" label="app:hellonode" name="hello-node2" ></DeploymentCard>
                </View>
            </View>
            <View style={this.getStyle().workloadCard}>
                <DeploymentCard healthReady="2" healthTotal="4" label="app:hellonode" name="test2"></DeploymentCard>
            </View>
        </View>

    </View>;

      case 'third':
        return <View />;

      case 'fourth':
        return <View />;

      default:
        return null;
    }
  };

  render() {
    return (
      <ScrollView style={commonStyles.secondaryContainer}>
        <TabView
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          initialLayout={{ width: Dimensions.get('window').width }}
          sceneContainerStyle={{ paddingVertical: spacings.sm }}
        />
      </ScrollView>
    );
  }

}