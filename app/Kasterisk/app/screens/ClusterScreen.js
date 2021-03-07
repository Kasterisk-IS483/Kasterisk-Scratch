import React from "react";
import "react-native-gesture-handler";
import { Image, ImageBackground, View, SafeAreaView, ScrollView, Text, Alert } from "react-native";
import { Button, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

import { commonStyles, clusterPageStyle } from "../utils/styles.js";

class ClusterScreen extends React.Component {
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
        routes: [{ name: "Add Cluster" }],
      });
      this.props.navigation.replace("Add Cluster");
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
    } catch (err) {}

    if (this.previousCluster != null) {
      this.previousClusterData = JSON.parse(await AsyncStorage.getItem(this.previousCluster));
    }

    // get all clusters from localstorage
    allClusters = JSON.parse(allClusters);

    for (const aCluster of allClusters) {
      let currCluster = await AsyncStorage.getItem("@" + aCluster);
      this.clusterList.push(JSON.parse(currCluster));
    }
    // Alert.alert("clusterList", JSON.stringify(this.clusterList));
    this.setState({ spinner: false, loaded: true });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={clusterPageStyle.panelContainer}>
        <Spinner visible={this.state.spinner} textContent="Loading..." textStyle={{ color: "#FFF" }} />
        <View style={clusterPageStyle.welcomeBannerContainer}>
          <ImageBackground style={clusterPageStyle.welcomeBannerContainer} source={require("../assets/welcome-bg.png")} imageStyle={{ resizeMode: "cover" }} />
          <Image style={clusterPageStyle.welcomeBannerLogo} source={require("../assets/kasterisk-logo.png")} />
          <Text style={clusterPageStyle.welcomeBannerDescription}>Select a cluster to continue</Text>
        </View>

        <View style={clusterPageStyle.welcomeButtonsContainer}>
          <View>
            {this.previousCluster == null ? null : (
              <View>
                <Text style={{ fontSize: 30 }}>Previous Cluster</Text>
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

          <Text style={{ fontSize: 30 }}>All Clusters</Text>
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
          <Button icon="plus" mode="contained" onPress={() => this.props.navigation.navigate("Add Cluster")}>
            Add new cluster
          </Button>
        </View>
      </View>
    );

    // return (
    //   <SafeAreaView>
    //     <Spinner visible={this.state.spinner} textContent="Loading..." textStyle={{ color: "#FFF" }} />
    //     {!this.state.loaded ? null : (
    //       <View>
    //         <Text style={{ fontSize: 30 }}>Select Cluster</Text>
    //         {this.clusterList.map((aCluster) => (
    //           <List.Item
    //             key={aCluster.clusterData.name}
    //             title={aCluster.clusterData.name}
    //             description={aCluster.userData.name}
    //             left={(props) => <List.Icon {...props} icon="folder" />}
    //             onPress={async () => {
    //               await AsyncStorage.setItem("@defaultCluster", "@" + aCluster.clusterData.name);
    //               this.props.navigation.navigate("HomeDrawer", { screen: "WorkloadSummary" });
    //             }}
    //           />
    //         ))}
    //         <Button icon="plus" mode="contained" onPress={() => this.props.navigation.navigate("Add Cluster")}>
    //           Add new cluster
    //         </Button>
    //       </View>
    //     )}
    //   </SafeAreaView>
    // );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <ClusterScreen {...props} navigation={navigation} />;
}
