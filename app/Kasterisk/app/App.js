import React, { Component } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderBackButton  } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { View, Image, SafeAreaView, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";
import ModalDropdown from "react-native-modal-dropdown";
import MultiSelect from "react-native-multiple-select";
import { checkServerStatus } from "./api/KubeApi";
// styling
import { spacings, colours, fonts, commonStyles } from "./utils/styles";
// authentication 
import WelcomeScreen from "./screens/authentication/WelcomeScreen";
import KubeconfigUploadScreen from "./screens/authentication/KubeconfigUploadScreen";
import KubeconfigContentScreen from "./screens/authentication/KubeconfigContentScreen";
import AWSLoginScreen from "./screens/authentication/AWSLoginScreen";
import AddClusterScreen from "./screens/authentication/AddClusterScreen";
// workload 
import WorkloadSummaryScreen from "./screens/workload/WorkloadSummaryScreen";
import WorkloadDeploymentScreen from "./screens/workload/WorkloadDeploymentScreen";
import WorkloadReplicasetScreen from "./screens/workload/WorkloadReplicasetScreen";
import WorkloadPodsScreen from "./screens/workload/WorkloadPodsScreen";
import WorkloadNodeScreen from "./screens/workload/WorkloadNodeScreen";
// list 
import NodesListScreen from "./screens/list/NodesListScreen";
import DeploymentListScreen from "./screens/list/DeploymentListScreen";
import ReplicasetListScreen from "./screens/list/ReplicasetListScreen";
import PodsListScreen from "./screens/list/PodsListScreen";
import FilterLabelsScreen from "./screens/list/FilterLabels";
// multicuster
import ChangeClusterScreen from "./screens/authentication/ChangeClusterScreen";

import WorkloadSummaryApi from "./api/WorkloadSummaryApi";

// const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const screenOptions = {
  headerTintColor: "white",
  headerStyle: { backgroundColor: colours.primary },
  headerShown: true,
};

const items = [{
  id: '92iijs7yta',
  name: 'Ondo'
}, {
  id: 'a0s0a8ssbsd',
  name: 'Ogun'
}, {
  id: '16hbajsabsd',
  name: 'Calabar'
}, {
  id: 'nahs75a5sg',
  name: 'Lagos'
}, {
  id: '667atsas',
  name: 'Maiduguri'
}, {
  id: 'hsyasajs',
  name: 'Anambra'
}, {
  id: 'djsjudksjd',
  name: 'Benue'
}, {
  id: 'sdhyaysdj',
  name: 'Kaduna'
}, {
  id: 'suudydjsjd',
  name: 'Abuja'
  }
];

export default class App extends Component {
  constructor(props) {
    console.log("App.js constructor");
    super(props);
    this.state = {
      spinner: false,
      selectedNamespace: "All Namespaces",
      selectedValue: "",
      dupeArr:[],
      labelsArr: [],
      deployments: [],
      deploymentArr: [],
      nodes: [],
      namespace: "",
      pods: [],
      podsArr: [],
      replicasets: [],
      replicasetsArr: [],
      selectedLabel : [],
    };
    console.log("/App.js constructor");
  }

  // async updateArr(selectedLabel){
  //   try {
  //     let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
  //     console.log(defaultCluster);

  //     if (defaultCluster == null) {
  //       Alert.alert("Error", "Default cluster not found");
  //       this.setState({
  //         spinner: false,
  //       });
  //       this.props.navigation.navigate("ChooseCluster");
  //       return;
  //     }

  //     let serverStatus = await checkServerStatus(defaultCluster);
  //     console.log(serverStatus);
  //     if (serverStatus[0] == 200) {
  //       this.setState({
  //         deployments: await WorkloadSummaryApi.deploymentsInfo(
  //           this.state.namespace,
  //           {
  //             labelSelector: selectedLabel,
  //           }
  //         ),
  //         nodes: await WorkloadSummaryApi.nodesInfo(
  //           {
  //             labelSelector: selectedLabel,
  //           }
  //         ),
  //         pods: await WorkloadSummaryApi.podsInfo(
  //           this.state.namespace,
  //           {
  //             labelSelector: selectedLabel,
  //           }
  //         ),
  //         replicasets: await WorkloadSummaryApi.replicasetsInfo(
  //           this.state.namespace,
  //           {
  //             labelSelector: selectedLabel,
  //           }
  //         ),
  //         deploymentArr: [],
  //         replicasetsArr: [],
  //         podsArr: [],
  //       });
  //       this.state.deployments.map((item, index) => this.formatObject(item,"deployments"));
  //       this.state.pods.map((item, index) => this.formatObject(item,"pods"));
  //       this.state.replicasets.map((item, index) => this.formatObject(item,"replicasets"));
  //       this.setState({
  //         spinner: false,
  //       });
  //     } else {
  //       Alert.alert("Error", "Failed to contact cluster");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // addLabelsToArray = labelObject => {
  //   for (const [key, value] of Object.entries(labelObject)) {
  //     if(this.state.dupeArr.indexOf(`${key}:${value}`)==-1){
  //       this.setState({
  //         dupeArr: [...this.state.dupeArr,`${key}:${value}`],
  //         labelsArr: [...this.state.labelsArr, {
  //           id: `${key}=${value}`,
  //           name: `${key}:${value}`,
  //         }]
  //       })
  //     }
  //   }
  //   console.log(this.labelsArr)
  // }

  // getAllLabels = () => {
  //   this.state.deployments.map((item) => this.addLabelsToArray(item.labels));
  //   this.state.replicasets.map((item) => this.addLabelsToArray(item.labels));
  //   this.state.pods.map((item) => this.addLabelsToArray(item.labels));
   
  // }

  onSelectedItemsChange = selectedLabel => {
    this.setState({ selectedLabel,
      spinner: true,
    });
    // this.updateArr(selectedLabel[0]);
    // console.log(selectedLabel[0]);
  };

  
  // formatObject(item, service) {
  //   item.status = item.status + "/" + item.total;
  //   delete item.total;
  //   if(service=="deployments"){
  //       this.setState({
  //       deploymentArr: [...this.state.deploymentArr, Object.values(item)],
  //       });
  //   }else if (service == "replicasets"){
  //       this.setState({
  //           replicasetsArr: [...this.state.replicasetsArr, Object.values(item)],
  //       });
  //   }else if (service == "pods"){
  //       this.setState({
  //           podsArr: [...this.state.podsArr, Object.values(item)],
  //       });
  //   }
  // }


  filter = (namespaceLabels) => {
    const { selectedLabel } = this.state;
    return (
      <View style={{ flexDirection: "row" }}>

        {/* <View style={{ margin: spacings.md, marginRight: spacings.xxl }}>
          <MultiSelect
            hideTags
            // items={this.state.labelsArr}
            items={items}
            uniqueKey="id"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedLabel}
            selectText=" Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={ (text)=> console.log(text)}
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Selected"
            single={true}
            styleTextDropdownSelected={{ padding: spacings.xs }}
          />
        </View> */}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ModalDropdown
            options={namespaceLabels}
            dropdownStyle={{
              height: 40 * namespaceLabels.length,
              alignItems: "center",
            }}
            dropdownTextStyle={{ 
              fontSize: fonts.sm, 
              color: "black",
            }}
            textStyle={{
              fontSize: fonts.sm,
              color: "white",
              marginRight: spacings.xxs,
            }}
            customButton="⋮"
            defaultValue={this.state.selectedNamespace}
            onSelect={async(index) => this.updateState(namespaceLabels[index])}
          />
          <Text style={{ color: "white", marginRight: spacings.sm }}>▼</Text>
        </View>

      </View>
    );
  };

  async updateState(selectedNamespace) {
    let selectedValue = "";
    if (selectedNamespace != "All Namespaces") {
      selectedValue = selectedNamespace;
    }
    await AsyncStorage.setItem("@selectedValue", selectedValue);
    this.setState({
      selectedNamespace: selectedNamespace,
      selectedValue: selectedValue,
    });
  }


  async componentDidMount() {
    SplashScreen.hide();
    // const { navigation } = this.props;
    // this.setState({
    //   spinner: true,
    // });

    // if ((await AsyncStorage.getItem("@selectedValue")) != null) {
    //   this.setState({
    //     namespace: await AsyncStorage.getItem("@selectedValue"),
    //   });
    // }

    // try {
    //   let defaultCluster = await AsyncStorage.getItem("@defaultCluster");

    //   if (defaultCluster == null) {
    //     Alert.alert("Error", "Default cluster not found");
    //     this.setState({
    //       spinner: false,
    //     });
    //     this.props.navigation.navigate("ChooseCluster");
    //     return;
    //   }

    //   let serverStatus = await checkServerStatus(defaultCluster);
    //   if (serverStatus[0] == 200) {
    //     this.setState({
    //       deployments: await WorkloadSummaryApi.deploymentsInfo(
    //         this.state.namespace,
    //       ),
    //       nodes: await WorkloadSummaryApi.nodesInfo(
    //       ),
    //       pods: await WorkloadSummaryApi.podsInfo(
    //         this.state.namespace,
    //       ),
    //       replicasets: await WorkloadSummaryApi.replicasetsInfo(
    //         this.state.namespace,
    //       ),
    //     });
    //     this.state.deployments.map((item, index) => this.formatObject(item,"deployments"));
    //     this.state.pods.map((item, index) => this.formatObject(item,"pods"));
    //     this.state.replicasets.map((item, index) => this.formatObject(item,"replicasets"));
    //     this.getAllLabels();
    //   } else {
    //     Alert.alert("Error", "Failed to contact cluster");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    // this.setState({
    //   spinner: false,
    // });
  }

  HomeDrawer = ({ route, navigation }) => {
    const { namespaceLabels } = route.params;
    return (
      <Drawer.Navigator
        {...console.log("App.js HomeDrawer")}
        initialRouteName="WorkloadSummary"
        screenOptions={screenOptions}
        drawerStyle={{ backgroundColor: "white" }}
        drawerContentOptions={{
          activeTintColor:
            colours.primary /* font color for active screen label */,
          activeBackgroundColor:
            colours.secondary /* bg color for active screen */,
          inactiveTintColor:
            "black" /* Font color for inactive screens" labels */,
        }}
        contentOptions={{ labelStyle: fonts.md }}
        drawerContent={(props) => {
          return (
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{
                height: 150,
                margin: spacings.sm,
                ...commonStyles.centralise,
              }}>
                <Image
                  source={require("./assets/kasterisk-logo.png")}
                  style={{ height: "40%", width: "100%" }}
                />
              </View>
              <DrawerItem
                labelStyle={{ fontSize: fonts.md, color: "black" }}
                label="Change Cluster"
                onPress={async () => {
                  let previousCluster = await AsyncStorage.getItem(
                    "@defaultCluster"
                  );
                  await AsyncStorage.removeItem("@defaultCluster");
                  props.navigation.replace("ChooseCluster", {
                    previous: previousCluster,
                  });
                }}
                icon={() => (
                  <Image
                    source={require("./assets/DrawerIcons/cluster_icon.png")}
                    style={commonStyles.icon}
                  />
                )}
                options={{ headerRight: () => this.filter(namespaceLabels), }}
              />

           
              <DrawerItemList {...props} labelStyle={{ fontSize: fonts.md }} />
            </SafeAreaView>
          );
        }}
      >
        <Drawer.Screen
          name="WorkloadSummary"
          component={WorkloadSummaryScreen}
          options={{
            drawerLabel: "Workload Overview",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/cluster_icon.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Workloads",
            headerRight: () => this.filter(namespaceLabels), }}
        />
        <Drawer.Screen
          name="DeploymentList"
          component={DeploymentListScreen}
          options={{
            drawerLabel: "Deployments",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/deployment_icon.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Deployment List",
            headerRight: () => this.filter(namespaceLabels), }}
        />
        <Drawer.Screen
          name="ReplicasetList"
          component={ReplicasetListScreen}
          options={{
            drawerLabel: "Replicasets",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/replicaset_icon.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Replicaset List",
            headerRight: () => this.filter(namespaceLabels), }}
        />
        <Drawer.Screen
          name="PodsList"
          component={PodsListScreen}
          options={{
            drawerLabel: "Pods",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/pod_icon.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Pods List",
            headerRight: () => this.filter(namespaceLabels), }}
        />
        <Drawer.Screen
          name="NodesList"
          component={NodesListScreen}
          options={{
            drawerLabel: "Nodes",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/nodes_icon.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Nodes",
            headerRight: () => this.filter(namespaceLabels), }}
        />
           <Drawer.Screen
          name="FilterList"
          component={FilterLabelsScreen}
          options={{
            drawerLabel: "Filter",
            drawerIcon: () => (
              <Image
                source={require("./assets/DrawerIcons/filter.png")}
                style={commonStyles.icon}
              />
            ),
            title: "Filter",
            headerRight: () => this.filter(namespaceLabels), }}
        />
      </Drawer.Navigator>
    );
  };

  render() {
    const { navigation } = this.props;
    console.log("App.js render");
    return (

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ChooseCluster"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="ChooseCluster"
            component={ChangeClusterScreen}
            options={{ title: "Change Cluster", headerLeft: null, headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="HomeDrawer"
            component={this.HomeDrawer.bind(this)}
            options={{ headerShown: false, 
              //try: ios fix
              headerBackTitleVisible: false,
              title: "Back",
            }}
          />

          <Stack.Screen
            name="AddCluster"
            component={AddClusterScreen}
            options={({navigation, route}) => ({
              title: "Add Cluster",
              headerLeft: (props) => (
                <HeaderBackButton
                  {...props}
                  onPress={() => navigation.navigate('ChooseCluster')}
                />
              ),
         })}
          />

          <Stack.Screen
            name="welcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AWSLogin"
            component={AWSLoginScreen}
            options={{ title: "AWS Login" }}
          />
          <Stack.Screen
            name="KubeconfigUpload"
            component={KubeconfigUploadScreen}
            options={{ title: "Upload Kubeconfig File" }}
          />
          <Stack.Screen
            name="KubeconfigContent"
            component={KubeconfigContentScreen}
            options={{ title: "Add Kubeconfig Content" }}
          />

          <Stack.Screen
            name="WorkloadSummary"
            component={WorkloadSummaryScreen}
            options={{ title: "Workloads" }}
          />
          <Stack.Screen
            name="WorkloadDeployment"
            component={WorkloadDeploymentScreen}
            options={{ title: "Deployment" }}
          />
          <Stack.Screen
            name="WorkloadReplicaset"
            component={WorkloadReplicasetScreen}
            options={{ title: "Replicaset" }}
          />
          <Stack.Screen
            name="WorkloadPod"
            component={WorkloadPodsScreen}
            options={{ title: "Pod" }}
          />
          <Stack.Screen
            name="WorkloadNode"
            component={WorkloadNodeScreen}
            options={{ title: "Node" }}
          />

          <Stack.Screen
            name="Nodes"
            component={NodesListScreen}
            options={{ title: "Nodes" }}
          />
          <Stack.Screen
            name="DeploymentList"
            component={DeploymentListScreen}
            options={{ title: "DeploymentList" }}
          />
          <Stack.Screen
            name="ReplicasetList"
            component={ReplicasetListScreen}
            options={{ title: "ReplicasetList" }}
          />
          <Stack.Screen
            name="PodsList"
            component={PodsListScreen}
            options={{ title: "PodsList" }}
          />
           <Stack.Screen
            name="FilterList"
            component={FilterLabelsScreen}
            options={{ title: "FilterList" }}
          />
        </Stack.Navigator>
        {console.log("/App.js render")}
      </NavigationContainer>
    );
  }
}
