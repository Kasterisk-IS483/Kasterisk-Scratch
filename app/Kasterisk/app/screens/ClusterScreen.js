import React from "react";
import "react-native-gesture-handler";
import { View, SafeAreaView, Text, Alert } from "react-native";
import { Button, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

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
    let previousCluster = this.props.route.previous;
    Alert.alert(previousCluster)
    
    let allClusters = await AsyncStorage.getItem("@clusters");

    if (allClusters == null) {
      this.setState({ spinner: false });
      this.props.navigation.replace("Add Cluster");
      return;
    }
    let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
    Alert.alert(defaultCluster)
    if (defaultCluster != null) {
      this.setState({ spinner: false });
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'HomeDrawer', params: { screen: "WorkloadSummary" } }],
      });
      // this.props.navigation.pushToTop("HomeDrawer", { screen: "WorkloadSummary" });
      return;
    }
    allClusters = JSON.parse(allClusters);
    for (const aCluster of allClusters) {
      let currCluster = await AsyncStorage.getItem(aCluster);
      this.clusterList.push(JSON.parse(currCluster));
    }
    this.setState({ spinner: false, loaded: true });
  }

  render() {
    return (
      <SafeAreaView>
        <Spinner visible={this.state.spinner} textContent="Loading..." textStyle={{ color: "#FFF" }} />
        {!this.state.loaded ? null : (
          <View>
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
            <Button icon="plus" mode="contained" onPress={() => this.props.navigation.navigate("Add Cluster")}>
              Add new cluster
            </Button>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <ClusterScreen {...props} navigation={navigation} />;
}
