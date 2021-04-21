import React, { Component } from "react";
import { View, Dimensions, Text, Alert } from "react-native";
import { Title, Card, Switch } from 'react-native-paper';
import { TabView, TabBar } from 'react-native-tab-view';
import ModalSelector from 'react-native-modal-selector';

import DetailPageApi from "../../api/DetailPageApi";
import PodApi from "../../api/PodApi";
import { checkServerStatus } from "../../api/KubeApi";
import { getLabelButtons, getAgeText, checkDefaultCluster } from "../../utils/constants";
import {
  fonts,
  colours,
  commonStyles,
  commonPortraitStyles,
  cardsOuterPadding,
  spacings,
  getOrientation,
  getStyle
} from "../../utils/styles";
import DetailsCard from "../../components/Cards/DetailsCard";
import TableCard from "../../components/Cards/TableCard";
import WorkloadTemplate from "../../components/Templates/WorkloadTemplate";

export default class WorkloadPodsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      index: 0,
      routes: [
        { key: 'first', title: 'Summary' },
        { key: 'second', title: 'Logs' },
        // { key: 'third', title: 'Shell' },
      ],
      pod: this.props.route.params.pod,
      namespace: this.props.route.params.namespace,
      container: "[all containers]",
      containerList: ["[all containers]"],
      checkedTimestamp: false,
      checkedFilter: false,
      logs: "",
      switchView: false
    };
    this.updateState = this.updateState.bind(this);
  }

  onLayout() {
    this.setState({ orientation: getOrientation() });
  }

  async updateState(stateKey, value) {
    if (stateKey == "container") {
      this.setState({ container: value });
      this.checkGetPodLog("not checked", value)   
    }
    if(stateKey=="switchView"){
      this.checkGetPodLog("checked", this.state.container)
    }
  }

  async getPogLog (parameters) {
    return (
      await PodApi.readPodLog(
        this.state.pod.metadata.namespace,
        this.state.pod.metadata.name,
        parameters
    ));
  }

  async checkGetPodLog (type, container) {
    let timestampParam = type !== "checked" ? this.state.checkedTimestamp : !this.state.checkedTimestamp;
    let logs = "";
    if (container != "[all containers]") {
      logs = await this.getPogLog(
        { 
          timestamps: timestampParam,
          container: container
        }
      )
    }
    else {
      if (this.state.pod.status.containerStatuses.length > 1){
        logs = "Please select container to see logs"
      }
      else {
        logs = await this.getPogLog(
          { timestamps: timestampParam }
        )
      }
    }
    this.setState({
      logs: logs
    });
  }

  setWindow = () => {
    this.setState(Dimensions.get("window"));
  }

  async componentDidMount() {
    Dimensions.addEventListener("change", this.setWindow);

    this.setState({ 
      spinner: true, 
    });

    try {
      let defaultCluster = await checkDefaultCluster();
      if (!defaultCluster){
        this.setState({
          spinner: false,
        });
        this.props.navigation.navigate("ChooseCluster");
        return;
      }
      let serverStatus = await checkServerStatus(defaultCluster);
      if (serverStatus[0] == 200) {
        if (this.state.pod.name == "network error"){
          Alert.alert("Error",this.state.pod.description)
        } else {
          this.checkGetPodLog("not checked", this.state.container)
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

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.setWindow);
  }

  onToggleTimestampSwitch = () => {
    this.setState({ checkedTimestamp: !this.state.checkedTimestamp })
    this.updateState("switchView", !this.state.checkedTimestamp)
  };
  onToggleFilterSwitch = () => this.setState({ checkedFilter: !this.state.checkedFilter });

  scene = (tab) => {
    return (
      <WorkloadTemplate type="details" showSpinner={this.state.spinner}>
        <Title style={commonStyles.headerTitle}>
          {this.state.pod.metadata.name}
        </Title>
        {tab}
      </WorkloadTemplate>
    );
  }

  singleCard = (content) => {
    return (
      <View style={{ padding: cardsOuterPadding }}>
        {content}
      </View>
    );
  }

  switch = (text, value, funct) => {
    return (
      <View style={commonPortraitStyles.columnContainer}>
        <View style={commonStyles.fieldsContainer}>
          <Switch
            value={value}
            onValueChange={funct}
            color={colours.primary}
            style={commonStyles.switchContainer}
          />
          <Text style={commonStyles.switchText}>
            {text}
          </Text>
        </View>
      </View>
    );
  }

  list = (type, value, list) => {
    return (
      <View style={getStyle().columnContainer}>
        <Title style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{type}:</Title>
        <View style={commonStyles.formContent}>
          <ModalSelector
            data={list}
            keyExtractor={item => item}
            labelExtractor={item => item}
            initValue={this.state.pod.status.containerStatuses.length > 1 ? "Select a container" : value}
            animationType={"fade"}
            onChange={(option) => this.updateState(type, option)}
          />
        </View>
      </View>
    );
  }

  ContainerList = () => {
    return this.list("container", this.state.container, this.state.containerList);
  };


  SummaryTab = () => {
    return (
      <View>
        <View style={getStyle().rowContainer}>
          <View style={getStyle().columnContainer}>
            <DetailsCard header="Configuration" type="Pods"
              priority={this.state.pod.spec.priority != undefined ? this.state.pod.spec.priority : "null"}
              node={this.state.pod.spec.nodeName}
              serviceAccount={this.state.pod.spec.serviceAccount}
            />
          </View>

          <View style={getStyle().columnContainer}>
            <DetailsCard header="Status" type="Pods"
              qos={this.state.pod.status.qosClass}
              phase={this.state.pod.status.phase}
              podIP={this.state.pod.status.podIP}
              hostIP={this.state.pod.status.hostIP}
            />
          </View>
        </View>

        <TableCard header="Pod Conditions" type="Pods"
          table={DetailPageApi.PodConditions(this.state.pod.status.conditions)}
        />

        <View style={getStyle().rowContainer}>
          <View style={getStyle().columnContainer}>
            <DetailsCard header="Pod Status Template" type="Pods"
              podTemplate={DetailPageApi.PodTemplates(this.state.pod)}
            />
          </View>
          <View style={getStyle().columnContainer}>
            <DetailsCard header="Metadata" type="Pods"
              age={getAgeText(this.state.pod.metadata.creationTimestamp)}
              labels={this.state.pod.metadata.labels !== undefined ? getLabelButtons(this.state.pod.metadata.labels,Object.keys(this.state.pod.metadata.labels).length,true) : getLabelButtons(this.state.pod.metadata.labels,0)}
              control={this.state.pod.metadata.ownerReferences !== undefined ? this.state.pod.metadata.ownerReferences[0].name : "None"}
              namespace={this.state.namespace}
            />
          </View>
        </View>
      </View>
    );
  }

  LogsTab = () => {
    let containerStatuses = this.state.pod.status.containerStatuses;
    for (i = 0; i < containerStatuses.length; i++) {
      if (!this.state.containerList.includes(containerStatuses[i].name)) {
        this.state.containerList.push(containerStatuses[i].name);
      }
    }
    return (
      this.singleCard(
        <Card elevation={10}>
          <Card.Content style={commonStyles.cardContent, getStyle().rowContainer}>
            {this.ContainerList()}
          </Card.Content>

          <Card.Content style={commonStyles.cardContent, commonPortraitStyles.rowContainer}>
            {this.switch("Display timestamp", this.state.checkedTimestamp, this.onToggleTimestampSwitch)} 
          </Card.Content>

          <Card.Content>
            <Text style={{
              color: 'white',
              backgroundColor: 'black',
              fontFamily: 'Hack',
              fontSize: fonts.sm,
              padding: spacings.md,
              marginVertical: spacings.sm,
            }}>
              {this.state.logs ? this.state.logs : "No logs"}
            </Text>
          </Card.Content>
        </Card>
      )
    );
  }

  ShellTab = () => {
    return (
      this.singleCard(
        <Card elevation={10}>
          <Card.Content style={commonStyles.cardContent, getStyle().rowContainer}>
            {this.ContainerList()}
          </Card.Content>
          <Card.Content>
            <Text>Implementation in progress</Text>
          </Card.Content>
        </Card>
      )
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
        return this.scene(this.SummaryTab());
      case 'second':
        return this.scene(this.LogsTab());
      // case 'third':
      //   return this.scene(this.ShellTab());
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={commonStyles.secondaryContainer}>
        <TabView
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    );
  }

}