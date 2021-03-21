import React, { Component } from "react";
import "react-native-gesture-handler";
import { View, ScrollView, Text } from "react-native";
import { List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { commonStyles, fonts } from "../../utils/styles.js";
import SubmitButton from "../../components/Buttons/SubmitButton";
import SpinnerOverlay from "../../components/Elements/SpinnerOverlay";

class ChangeClusterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      loaded: false,
    };
    this.clusterList = [];
    this.previousCluster = null;
    this.previousClusterData = null;
  }

  async componentDidMount() {
    // Check if there are any clusters stored in localstorage.
    // if none, redirect to add cluster page
    let allClusters = await AsyncStorage.getItem("@clusters");
    if (allClusters == null) {
      this.setState({ spinner: false });
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "AddCluster" }],
      });
      this.props.navigation.replace("AddCluster");
      return;
    }

    // check if there is a default cluster in localstorage
    // if yes, redirect to workload summary page
    let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
    if (defaultCluster != null) {
      this.setState({ spinner: false });
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "HomeDrawer", params: { screen: "WorkloadSummary" } }],
      });
      // this.props.navigation.pushToTop("HomeDrawer", { screen: "WorkloadSummary" });
      return;
    }

    // Check if there is a previousCluster in props
    // this is to show the most recent cluster the user has redirected from

    // let previousCluster = this.props.route.params.previous;
    try {
      this.previousCluster = this.props.route.params.previous;
    } catch (err) { }

    if (this.previousCluster != null) {
      this.previousClusterData = JSON.parse(await AsyncStorage.getItem(this.previousCluster));
    }

    // get all clusters from localstorage
    allClusters = JSON.parse(allClusters);

    for (const aCluster of allClusters) {
      let currCluster = await AsyncStorage.getItem("@" + aCluster);
      this.clusterList.push(JSON.parse(currCluster));
    }
    this.setState({ spinner: false, loaded: true });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={commonStyles.whiteContainer}>
        <SpinnerOverlay showSpinner={this.state.spinner} />
        <View>
          {this.previousCluster == null ? null : (
            <View>
              <Text style={{ fontSize: fonts.xxl }}>Previous Cluster</Text>
              <List.Item
                key={this.previousClusterData.clusterData.name}
                title={this.previousClusterData.clusterData.name}
                description={this.previousClusterData.userData.name}
                left={(props) => <List.Icon {...props} icon="aws" />}
                onPress={async () => {
                  await AsyncStorage.setItem("@defaultCluster", "@" + this.previousClusterData.clusterIdentifier);
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: "HomeDrawer", params: { screen: "WorkloadSummary" } }],
                  });
                }}
              />
              <View style={commonStyles.divider} />
            </View>
          )}
        </View>

        <Text style={{ fontSize: fonts.xxl }}>All Clusters</Text>
        <ScrollView>
          {this.clusterList.map((aCluster) => (
            <List.Item
              key={aCluster.clusterData.name}
              title={aCluster.clusterData.name}
              description={aCluster.userData.name}
              left={(props) => <List.Icon {...props} icon={aCluster.serviceProvider} />}
              onPress={async () => {
                await AsyncStorage.setItem("@defaultCluster", "@" + aCluster.clusterIdentifier);
                this.props.navigation.navigate("HomeDrawer", { screen: "WorkloadSummary" });
              }}
            />
          ))}
        </ScrollView>
        <SubmitButton
          icon="plus"
          onPress={() => this.props.navigation.navigate("AddCluster")}
          text="Add new cluster"
        />
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <ChangeClusterScreen {...props} navigation={navigation} />;
}
