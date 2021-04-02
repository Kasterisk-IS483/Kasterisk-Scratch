import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, Alert, View } from "react-native";
import MultiSelect from 'react-native-multiple-select';

import { checkServerStatus } from "../../api/KubeApi";
import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";
import {
  commonStyles,
  commonPortraitStyles,
  workloadDetailsBreakpoint,
} from "../../utils/styles";
import WorkloadTemplate from "../../components/Templates/WorkloadTemplate";

// const items = [{
//   id: '92iijs7yta',
//   name: 'Ondo'
// }, {
//   id: '667atsas',
//   name: 'Maiduguri'
// }, {
//   id: 'hsyasajs',
//   name: 'Anambra'
// }, {
//   id: 'suudydjsjd',
//   name: 'Abuja'
//   }
// ];
export default class FilterLabelSCreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      deployments: [],
      deploymentArr: [],
      nodes: [],
      namespace: "",
      pods: [],
      podsArr: [],
      replicasets: [],
      replicasetsArr: [],
      spinner: false,
      selectedItems : [],
      dupeArr:[],
      labelsArr: [],
    };
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
    });
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    console.log(selectedItems);
  };

  addLabelsToArray = labelObject => {
    for (const [key, value] of Object.entries(labelObject)) {
      if(this.state.dupeArr.indexOf(`${key}:${value}`)==-1){
        this.setState({
          dupeArr: [...this.state.dupeArr,`${key}:${value}`],
          labelsArr: [...this.state.labelsArr, {
            id: `${key}:${value}`,
            name: `${key}:${value}`
          }]
        })
      }
    }
  }

  getAllLabels = () => {
    this.state.deployments.map((item) => this.addLabelsToArray(item.labels));
    this.state.replicasets.map((item) => this.addLabelsToArray(item.labels));
    this.state.pods.map((item) => this.addLabelsToArray(item.labels));
    // this.state.nodes.map((item) => this.addLabelsToArray(item.labels));
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

  formatObject(item, service) {
    item.status = item.status + "/" + item.total;
    delete item.total;
    if(service=="deployments"){
        this.setState({
        deploymentArr: [...this.state.deploymentArr, Object.values(item)],
        });
    }else if (service == "replicasets"){
        this.setState({
            replicasetsArr: [...this.state.replicasetsArr, Object.values(item)],
        });
    }else if (service == "pods"){
        this.setState({
            podsArr: [...this.state.podsArr, Object.values(item)],
        });
    }
  }
  async componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      spinner: true,
    });

    if ((await AsyncStorage.getItem("@selectedValue")) != null) {
      this.setState({
        namespace: await AsyncStorage.getItem("@selectedValue"),
      });
    }

    try {
      let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
      console.log(defaultCluster);

      if (defaultCluster == null) {
        Alert.alert("Error", "Default cluster not found");
        this.setState({
          spinner: false,
        });
        this.props.navigation.navigate("ChooseCluster");
        return;
      }

      let serverStatus = await checkServerStatus(defaultCluster);
      console.log(serverStatus);
      if (serverStatus[0] == 200) {
        this.setState({
          deployments: await WorkloadSummaryApi.deploymentsInfo(
            this.state.namespace,
            {
              labelSelector: "",
            }
          ),
        });
        this.state.deployments.map((item, index) => this.formatObject(item,"deployments"));
        this.setState({
            nodes: await WorkloadSummaryApi.nodesInfo(
              {
                labelSelector: "",
              }
              ),
          });
          this.setState({
            pods: await WorkloadSummaryApi.podsInfo(
              this.state.namespace,
              {
                labelSelector: "",
              }
            ),
          });
          this.state.pods.map((item, index) => this.formatObject(item,"pods"));
          this.setState({
            replicasets: await WorkloadSummaryApi.replicasetsInfo(
              this.state.namespace,
              {
                labelSelector: "",
              }
            ),
          });
          this.state.replicasets.map((item, index) => this.formatObject(item,"replicasets"));
          this.getAllLabels();
      } else {
        Alert.alert("Error", "Failed to contact cluster");
      }
    } catch (err) {
      console.log(err);
      // Alert.alert("Server Check Failed", err.message);
    }
    this.setState({
      spinner: false,
    });
  }

  render() {
    const { selectedItems } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MultiSelect
          hideTags
          items={this.state.labelsArr}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
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
        />
        {/* <View>
          {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
        </View> */}
        <WorkloadTemplate type="filter" showSpinner={this.state.spinner} deployment= {this.state.deploymentArr} nodes={this.state.nodes} pods={this.state.podsArr} replicasets={this.state.replicasetsArr}>
      </WorkloadTemplate>
      </View>
      
    );
  }
}
