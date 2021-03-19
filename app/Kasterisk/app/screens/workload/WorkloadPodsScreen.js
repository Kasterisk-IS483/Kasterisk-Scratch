import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, ScrollView, Dimensions, Text, Alert } from "react-native";
import { Title, Card, Switch } from 'react-native-paper';
import { TabView, TabBar } from 'react-native-tab-view';
import { Picker } from "@react-native-picker/picker";
import Spinner from "react-native-loading-spinner-overlay";

import { checkServerStatus } from "../../api/KubeApi";
import DetailPageApi from "../../api/DetailPageApi";
import PodApi from "../../api/PodApi.js";

import { 
  fonts, 
  colours, 
  commonStyles, 
  dashboardStyles, 
  commonPortraitStyles, 
  workloadDetailsBreakpoint,
  cardsOuterPadding,
  spacings
} from "../../utils/styles.js";

import DetailsCard from "../../components/Cards/DetailsCard";
import { getLabelButtons, getAgeText } from "../../utils/constants";
import TableCard from "../../components/Cards/TableCard";

export default class WorkloadPodsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      index: 0,
      routes: [
        { key: 'first', title: 'Summary' },
        { key: 'second', title: 'Logs' },
        { key: 'third', title: 'Shell' },
      ],
      pod: this.props.route.params.pod,
      container: "[all containers]",
      containerList: ["[all containers]"],
      since: "[all]",
      sinceList: ["5 minutes", "10 minutes"],
      checkedTimestamp: false,
      checkedFilter:false,
      logs: this.props.route.params.pod.status.containerStatuses.length <= 1 ? "" : []
    };
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
    });
  }

  getOrientation() {
    if (Dimensions.get("window").width > workloadDetailsBreakpoint) {
      return "LANDSCAPE";
    } else {
      return "PORTRAIT";
    }
  }
  getStyle() {
    if (this.getOrientation() === "LANDSCAPE") {
      return commonStyles;
    } else {
      return commonPortraitStyles;
    }
  }
  onLayout() {
    this.setState({ orientation: this.getOrientation() });
  }

  async updateState(stateKey, value) {
    if (stateKey == "container") {
      this.setState({
        container: value
      })
    }
    else if (stateKey == "since"){
      this.setState({
        since: value
      })
    }
  }

  containerList = () => {
    return (
      <View>
        <Title style={{ fontWeight: 'bold' }}>Container:</Title>
        <View style={dashboardStyles.picker}>
          <Picker selectedValue={this.state.container} onValueChange={(itemValue) => this.updateState("container", itemValue)}>
            {this.state.containerList.map((_item, _index) => (
              <Picker.Item label={_item} value={_item} key={_item} />
            ))}
          </Picker>
        </View>
      </View>
    );
  };

  sinceList = () => {
    return (
      <View>
        <Title style={{ fontWeight: 'bold' }}>Since:</Title>
        <View style={dashboardStyles.picker}>
          <Picker selectedValue={this.state.since} onValueChange={(itemValue) => this.updateState("since", itemValue)}>
            {this.state.sinceList.map((_item, _index) => (
              <Picker.Item label={_item} value={_item} key={_item} />
            ))}
          </Picker>
        </View>
      </View>
    );
  };

  async componentDidMount() {
    this.setState({
      spinner: true,
    });

    try {
      let defaultCluster = await AsyncStorage.getItem("@defaultCluster");

      if (defaultCluster == null) {
        Alert.alert("Error", "Default cluster not found");
        this.setState({
          spinner: false,
        });
        this.props.navigation.navigate("ChooseCluster");
        return;
      }

      let serverStatus = await checkServerStatus(defaultCluster);

      if (serverStatus[0] == 200) {
        if (this.state.pod.status.containerStatuses.length <= 1){
          this.setState({
            logs: await PodApi.readPodLogText(
              this.state.pod.metadata.namespace,
              this.state.pod.metadata.name
            )
          });
        }
        else {
          this.setState({
            logs: await PodApi.readPodLog(
              this.state.pod.metadata.namespace,
              this.state.pod.metadata.name
            )
          });
        }
        
        
      } else {
        Alert.alert("Error", "Failed to contact cluster");
      }
    } catch (err) {
      Alert.alert("Server Check Failed", err.message);
    }

    this.setState({
      spinner: false,
    });
  }

  SummaryTab = () => {
    return (
      <View>
        <View style={this.getStyle().rowContainer}>
          <View style={this.getStyle().columnContainer}>
            <DetailsCard header="Configuration" type="Pods"
              priority={this.state.pod.spec.priority}
              node={this.state.pod.spec.nodeName}
              serviceAccount={this.state.pod.spec.serviceAccount}
            />
          </View>
          
          <View style={this.getStyle().columnContainer}>
            <DetailsCard header="Status" type="Pods"
              qos={this.state.pod.status.qosClass}
              phase={this.state.pod.status.phase}
              podIP={this.state.pod.status.podIP}
              hostIP={this.state.pod.status.hostIP}
            />
          </View>
        </View>

        <TableCard 
          header="Pod Conditions" 
          table={DetailPageApi.PodConditions(this.state.pod.status.conditions)}
          type="Pods"
        />

        <View style={this.getStyle().rowContainer}>
          <View style={this.getStyle().columnContainer}>
            <DetailsCard 
              header="Template" 
              podTemplate={DetailPageApi.PodTemplates(this.state.pod)}
              type="Pods" 
            />
          </View>
          <View style={this.getStyle().columnContainer}>
            <DetailsCard header="Metadata" type="Pods"
              age={getAgeText(this.state.pod.metadata.creationTimestamp)}
              labels={getLabelButtons(this.state.pod.metadata.labels)}
              control={this.state.pod.metadata.ownerReferences !== undefined ? this.state.pod.metadata.ownerReferences[0].name : "null"}
            />
          </View>
        </View>
      </View>
    );
  }

  onToggleTimestampSwitch = () => this.setState({ checkedTimestamp: !this.state.checkedTimestamp });
  onToggleFilterSwitch = () => this.setState({ checkedFilter: !this.state.checkedFilter });

  LogsTab = () => {
    let containerStatuses = this.state.pod.status.containerStatuses;
    for (i = 0; i < containerStatuses.length; i++) {
      if (!this.state.containerList.includes(containerStatuses[i].name)){
        this.state.containerList.push(containerStatuses[i].name);
      }
    }
    return (
      <View style={{ padding: cardsOuterPadding }}>
        <Card elevation={10} style={{ width: "100%" }}>

          <Card.Content style={commonStyles.cardContent, this.getStyle().rowContainer}>
            <View style={this.getStyle().columnContainer}>
              {this.containerList()}
            </View>
            <View style={this.getStyle().columnContainer}>
              {this.sinceList()}
            </View>
          </Card.Content>

          <Card.Content style={commonStyles.cardContent, commonPortraitStyles.rowContainer}>
            <View style={commonPortraitStyles.columnContainer}>
              <View style={commonStyles.fieldsContainer}>
                <Switch 
                  value={this.state.checkedTimestamp} 
                  onValueChange={this.onToggleTimestampSwitch} 
                  color={colours.primary} 
                  style={commonStyles.switchContainer} 
                />
                <Text style={commonStyles.switchText}>
                  Display timestamp
                </Text>
              </View>
            </View>
            <View style={commonPortraitStyles.columnContainer}>
              <View style={commonStyles.fieldsContainer}>
                <Switch 
                  value={this.state.checkedFilter} 
                  onValueChange={this.onToggleFilterSwitch} 
                  color={colours.primary} 
                  style={commonStyles.switchContainer} 
                />
                <Text style={commonStyles.switchText}>
                  Show only filtered
                </Text>
              </View>
            </View>

          </Card.Content>

          <Card.Content>
            <Text style={{ 
              color: 'white', 
              backgroundColor: 'black', 
              fontSize: fonts.sm, 
              padding: spacings.md, 
              marginVertical: spacings.sm, 
            }}>
              {this.state.logs}
            </Text>
          </Card.Content>

        </Card>
      </View>
    );
  }

  ShellTab = () => {
    return (
      <View style={{ padding: cardsOuterPadding }}>
        <Card elevation={10} style={{ width: "100%" }}>
          <Card.Content style={commonStyles.cardContent, this.getStyle().rowContainer}>
            <View style={this.getStyle().columnContainer}>
                {this.containerList()}
              </View>
          </Card.Content>
        </Card>
      </View>
    );
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
        return <ScrollView>
          <Title style={commonStyles.headerTitle}>
            {this.state.pod.metadata.name}
          </Title>
          {this.SummaryTab()}
        </ScrollView>;

      case 'second':
        return <ScrollView>
          <Title style={commonStyles.headerTitle}>
            {this.state.pod.metadata.name}
          </Title>
          {this.LogsTab()}
        </ScrollView>;

      case 'third':
        return <ScrollView>
          <Title style={commonStyles.headerTitle}>
            {this.state.pod.metadata.name}
          </Title>
          {this.ShellTab()}
        </ScrollView>;

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
          textStyle={{ color: "#FFF" }}
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