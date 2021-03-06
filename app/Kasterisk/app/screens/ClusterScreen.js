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

    let previousCluster = this.props.route.previous;
    
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
      <View style={clusterPageStyle.panelContainer}>
        <Spinner visible={this.state.spinner} textContent="Loading..." textStyle={{ color: "#FFF" }} />
        <View style={clusterPageStyle.welcomeBannerContainer}>
          <ImageBackground style={clusterPageStyle.welcomeBannerContainer} source={require("../assets/welcome-bg.png")} imageStyle={{ resizeMode: "cover" }} />
          <Image style={clusterPageStyle.welcomeBannerLogo} source={require("../assets/kasterisk-logo.png")} />
        </View>

        <View style={clusterPageStyle.welcomeButtonsContainer}>
          <ScrollView contentContainerStyle={[commonStyles.scrollView, commonStyles.centralise]}>
          <Text style={{ fontSize: 30 }}>Previous Cluster</Text>
            <View style={commonStyles.divider} />
            <Text style={{ fontSize: 30 }}>Select Cluster</Text>
            {this.clusterList.map((aCluster) => (
              <List.Item
                key={aCluster.clusterData.name}
                title={aCluster.clusterData.name}
                description={aCluster.userData.name}
                left={(props) => <List.Icon {...props} icon="folder" />}
                onPress={async () => {
                  await AsyncStorage.setItem("@defaultCluster", "@" + aCluster.clusterData.name);
                  this.props.navigation.navigate("HomeDrawer", { screen: "WorkloadSummary" });
                }}
              />
            ))}
          </ScrollView>
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
