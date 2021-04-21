import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, Alert, View } from "react-native";
import MultiSelect from "react-native-multiple-select";

import { checkServerStatus } from "../../api/KubeApi";
import WorkloadSummaryApi from "../../api/WorkloadSummaryApi";
import { checkDefaultCluster } from "../../utils/constants";
import {
  spacings,
  getOrientation
} from "../../utils/styles";
import WorkloadTemplate from "../../components/Templates/WorkloadTemplate";

/** Filter Labels List View Screen **/
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
      selectedLabel : [],
      dupeArr:[],
      labelsArr: [],
    };
  }

  async updateArr(selectedLabel) {
    // console.log("updateArr");
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
      // console.log(serverStatus);
      if (serverStatus[0] == 200) {
        this.setState({
          deployments: await WorkloadSummaryApi.deploymentsInfo(
            this.state.namespace,
            {
              labelSelector: selectedLabel,
            }
          ),
          nodes: await WorkloadSummaryApi.nodesInfo(
            {
              labelSelector: selectedLabel,
            }
          ),
          pods: await WorkloadSummaryApi.podsInfo(
            this.state.namespace,
            {
              labelSelector: selectedLabel,
            }
          ),
          replicasets: await WorkloadSummaryApi.replicasetsInfo(
            this.state.namespace,
            {
              labelSelector: selectedLabel,
            }
          ),
          deploymentArr: [],
          replicasetsArr: [],
          podsArr: [],
        });
        this.state.deployments.map((item, index) => this.formatObject(item,"deployments"));
        this.state.pods.map((item, index) => this.formatObject(item,"pods"));
        this.state.replicasets.map((item, index) => this.formatObject(item,"replicasets"));
        this.setState({
          spinner: false,
        });
      } else {
        Alert.alert("Error", "Failed to contact cluster");
        this.setState({
          spinner: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  onSelectedItemsChange = (selectedLabel) => {
    this.setState({
      spinner: true, 
      selectedLabel,
    });
    this.updateArr(selectedLabel[0]);
    // console.log(selectedLabel[0]);
  };

  addLabelsToArray = (labelObject) => {
    for (const [key, value] of Object.entries(labelObject)) {
      if (this.state.dupeArr.indexOf(`${key}:${value}`)==-1){
        this.setState({
          dupeArr: [...this.state.dupeArr,`${key}:${value}`],
          labelsArr: [...this.state.labelsArr, {
            id: `${key}=${value}`,
            name: `${key}:${value}`,
          }]
        })
      }
    }
  };

  getAllLabels = () => {
    this.state.deployments.map((item) => this.addLabelsToArray(item.labels));
    this.state.replicasets.map((item) => this.addLabelsToArray(item.labels));
    this.state.pods.map((item) => this.addLabelsToArray(item.labels));
    // this.state.nodes.map((item) => this.addLabelsToArray(item.labels));
  }

  onLayout() {
    this.setState({ orientation: getOrientation() });
  }

  formatObject(item, service) {
    if(service!="pods"){
      item.status = item.status + "/" + item.total;
    }
    delete item.total;
    if(service=="deployments"){
      this.setState({
        deploymentArr: [...this.state.deploymentArr, Object.values(item)],
      });
    } else if (service == "replicasets"){
      this.setState({
        replicasetsArr: [...this.state.replicasetsArr, Object.values(item)],
      });
    } else if (service == "pods"){
      this.setState({
        podsArr: [...this.state.podsArr, Object.values(item)],
      });
    }
  }

  setWindow = () => {
    this.setState(Dimensions.get("window"));
  }

  async componentDidMount() {
    Dimensions.addEventListener("change", this.setWindow);

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
      let defaultCluster = await checkDefaultCluster();
      if (!defaultCluster){
        this.setState({
          spinner: false,
        });
        this.props.navigation.navigate("ChooseCluster");
        return;
      }
      let serverStatus = await checkServerStatus(defaultCluster);
      // console.log(serverStatus);
      if (serverStatus[0] == 200) {
        this.setState({
          deployments: await WorkloadSummaryApi.deploymentsInfo(
            this.state.namespace,
          ),
          nodes: await WorkloadSummaryApi.nodesInfo(
          ),
          pods: await WorkloadSummaryApi.podsInfo(
            this.state.namespace,
          ),
          replicasets: await WorkloadSummaryApi.replicasetsInfo(
            this.state.namespace,
          ),
        });
        /** uncomment this to onload workloads **/
        // this.state.deployments.map((item, index) => this.formatObject(item,"deployments"));
        // this.state.pods.map((item, index) => this.formatObject(item,"pods"));
        // this.state.replicasets.map((item, index) => this.formatObject(item,"replicasets"));
        this.getAllLabels();
      } else {
        Alert.alert("Error", "Failed to contact cluster");
        this.setState({
          spinner: false,
        });
      }
    } catch (err) {
      console.log(err);
      // Alert.alert("Server Check Failed", err.message);
    }
    this.setState({
      spinner: false,
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.setWindow);
  }

  render() {
    // console.log("render-filterLabels");
    const {selectedLabel} = this.state;
    return (
      <View style={{ flex: 1 }}>
          {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedLabel)} 
        <View style={{ margin: spacings.xxs }}>
          <MultiSelect
            hideTags
            items={this.state.labelsArr}
            uniqueKey="id"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedLabel}
            selectText=" Pick Label"
            searchInputPlaceholderText="Search Labels..."
            // onChangeInput={ (text)=> console.log(text)}
            tagRemoveIconColor="#696969"
            tagBorderColor="#696969"
            tagTextColor="#696969"
            selectedItemTextColor="#696969"
            selectedItemIconColor="#696969"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#696969' }}
            submitButtonColor="#696969"
            submitButtonText="Selected"
            single={true}
            styleTextDropdownSelected={{ padding: spacings.xs }}
          />
        </View>
        <WorkloadTemplate type="filter" showSpinner={this.state.spinner} deployment={this.state.deploymentArr} nodes={this.state.nodes} pods={this.state.podsArr} replicasets={this.state.replicasetsArr} />
      </View>
      
    );
  }
}
