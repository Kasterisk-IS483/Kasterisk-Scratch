import React, { Component } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Title } from 'react-native-paper';

import DetailPageApi from "../api/DetailPageApi";

import { 
  commonStyles, 
  dashboardStyles, 
  commonPortraitStyles, 
  workloadDetailsBreakpoint 
} from "../utils/styles.js";

import DetailsCard from "../components/Cards/DetailsCard";
import TableCard from "../components/Cards/TableCard";
import LabelButton from "../components/Buttons/LabelButton";

export default class WorkloadPodsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orientation: "",
      pod: this.props.route.params.pod,
      age: this.props.route.params.age,
      labels: this.props.route.params.labels,
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

  render() {
    let conditions = DetailPageApi.PodConditions(this.state.pod.status.conditions);
    return (
      <ScrollView style={dashboardStyles.scrollContainer}>
        <View style={commonStyles.detailsContainer}>
    
          <Title style={commonStyles.headerTitle}>
            {this.state.pod.metadata.name}
          </Title> 

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

          <TableCard header="Pod Conditions" table={conditions}/>

          <View style={this.getStyle().rowContainer}>
            {/* <View style={this.getStyle().columnContainer}>
              <DetailsCard header="Template" type="Pods" />
            </View> */}
            <View style={this.getStyle().columnContainer}>
              <DetailsCard header="Metadata" type="Pods"
                age={this.state.age}
                labels={Object.keys(this.state.labels).map((labelItem, labelIndex) => (
                  <LabelButton
                    key={labelIndex}
                    text={labelItem + ":" + this.state.labels[labelItem]} />
                ))}
                control={this.state.pod.metadata.ownerReferences !== undefined ? this.state.pod.metadata.ownerReferences[0].name : "null"}
              />
            </View>
          </View>
          
        </View>
      </ScrollView>
    );
  }

}