import React, { Component } from "react";

import NamespaceApi from "./NamespaceApi";
import DeploymentApi from "./DeploymentApi";
import ReplicasetApi from "./ReplicasetApi";
import DetailPageApi from "./DetailPageApi";
import PodApi from "./PodApi";
import NodeApi from "./NodeApi";
import { getAgeText } from "../utils/constants";

class WorkloadSummaryApi extends Component {

  /** NAMESPACES **/
  static namespaceLabels = async () => {
    let namespaces = await NamespaceApi.listAllNamespace();
    const namespaceLabels = [];
    namespaceLabels.push("All Namespaces");
    for (const namespace of namespaces) {
      namespaceLabels.push(namespace.metadata.name);
    }
    return namespaceLabels;
  }

  /** TOTAL **/
  static totalDeployments = async () => {
    let deployments = await DeploymentApi.listAllDeployment();
    return deployments.length;
  }

  static totalReplicaSets = async () => {
    let replicasets = await ReplicasetApi.listAllReplicaSet();
    return replicasets.length;
  }

  static totalPods = async () => {
    let pods = await PodApi.listAllPod();
    return pods.length;
  }

  /** ALL TAB INFO **/
  static nodeSummary = async() => {
    let nodes = await NodeApi.listAllNode();
    if (!nodes === undefined){
      let totalNodes = nodes.length;
      let readyNodesCnt = 0;
      for (i = 0; i < nodes.length; i++){
        for (const condition of nodes[i].status.conditions){
          if (condition.type == "Ready"){
            if (condition.status == "True"){
              readyNodesCnt += 1;
            }
          }
        }
      }
      let notReadyNodesCnt = totalNodes - readyNodesCnt;
      return {
        readyNodes: readyNodesCnt,
        notReadyNodes: notReadyNodesCnt
      }
    } else {
      return {
        readyNodes: 0,
        notReadyNodes: 0
      }
    }
  
  }

  static deploymentSummary = async (namespace) => {
    let deployments = await DeploymentApi.listAllDeployment();
    if (namespace != "") {
      deployments = await DeploymentApi.listDeployment(namespace);
    }
    let totalDeployments = deployments.length;
    let readyDeploymentsCnt = 0;
    for (i = 0; i < deployments.length; i++) {
      if (deployments[i].status.readyReplicas == deployments[i].status.replicas) {
        readyDeploymentsCnt += 1;
      }
    }
    let notReadyDeploymentsCnt = totalDeployments - readyDeploymentsCnt;
    return {
      readyDeployments: readyDeploymentsCnt,
      notReadyDeployments: notReadyDeploymentsCnt
    }
  }

  static replicasetSummary = async (namespace) => {
    let replicasets = await ReplicasetApi.listAllReplicaSet();
    if (namespace != "") {
      replicasets = await ReplicasetApi.listReplicaSet(namespace);
    }
    let totalReplicaSets = replicasets.length;
    let readyReplicaSetsCnt = 0;
    for (var i = 0; i < replicasets.length; i++) {
      if (replicasets[i].status.readyReplicas == replicasets[i].status.replicas) {
        readyReplicaSetsCnt += 1;
      }
    }
    let notReadyReplicaSetsCnt = totalReplicaSets - readyReplicaSetsCnt;
    return {
      readyReplicaSets: readyReplicaSetsCnt,
      notReadyReplicaSets: notReadyReplicaSetsCnt
    }
  }

  static podSummary = async (namespace) => {
    let pods = await PodApi.listAllPod();
    if (namespace != "") {
      pods = await PodApi.listPod(namespace);
    }
    let totalPods = pods.length;
    let readyPodsCnt = 0;
    for (i = 0; i < pods.length; i++) {
      if (pods[i].status.phase == "Running") {
        readyPodsCnt += 1;
      }
    }
    let notReadyPodsCnt = totalPods - readyPodsCnt;
    return {
      readyPods: readyPodsCnt,
      notReadyPods: notReadyPodsCnt
    }
  }

  /** NODE INFO **/
  static nodesInfo = async (parameters) => {
    nodesInfo = [];
    let nodes = await NodeApi.listAllNode(parameters);
    if (!nodes === undefined){
      for (const node of nodes) {
        let isReady = "Not Ready";
        let conditions = node.status.conditions;
        for (const condition of conditions) {
          if (condition.type === "Ready") {
            isReady = "Ready";
          }
        }
        let nodeInfo = [
          node.metadata.name,
          node.metadata.labels,
          isReady,
          "Roles",
          getAgeText(node.metadata.creationTimestamp),
          "Version"
        ]
        nodesInfo.push(nodeInfo);
      }
    }
    return nodesInfo;
  }

  /** DEPLOYMENT TAB INFO **/
  static deploymentsInfo = async (namespace, parameters) => {
    let deploymentsInfo = [];
    let deployments = await DeploymentApi.listAllDeployment(parameters);
    if (namespace != "") {
      deployments = await DeploymentApi.listDeployment(namespace, parameters);
    }
    for (const deployment of deployments) {
      let deploymentInfo = {
        name: deployment.metadata.name,
        age: getAgeText(deployment.metadata.creationTimestamp),
        labels: deployment.metadata.labels,
        containers: deployment.spec.template.spec.containers[0].name,
        status: deployment.status.readyReplicas,
        total: deployment.status.replicas,
        namespace: deployment.metadata.namespace,
      };
      deploymentsInfo.push(deploymentInfo);
    }
    return deploymentsInfo;
  }

  /** REPLICASET TAB INFO **/
  static replicasetsInfo = async (namespace, parameters) => {
    let replicasetsInfo = [];
    let replicasets = await ReplicasetApi.listAllReplicaSet(parameters);
    if (namespace != "") {
      replicasets = await ReplicasetApi.listReplicaSet(namespace, parameters);
    }
    for (const replicaset of replicasets) {
      let replicasetInfo = {
        name: replicaset.metadata.name,
        age: getAgeText(replicaset.metadata.creationTimestamp),
        labels: replicaset.metadata.labels,
        containers: replicaset.spec.template.spec.containers[0].name,
        status: replicaset.status.readyReplicas,
        total: replicaset.status.replicas,
        namespace: replicaset.metadata.namespace,
      };
      replicasetsInfo.push(replicasetInfo);
    }
    return replicasetsInfo;
  }

  /** POD TAB INFO **/
  static podsInfo = async (namespace, parameters) => {
    var podInfoList = [];
    let pods = await PodApi.listAllPod(parameters);
    if (namespace != "") {
      pods = await PodApi.listPod(namespace, parameters);
    }
    for (const pod of pods) {
      let podInfo = {
        name: pod.metadata.name,
        age: getAgeText(pod.metadata.creationTimestamp),
        status: pod.status.phase,
        ready: DetailPageApi.getContainerStatus(pod.status.containerStatuses),
        restarts: pod.status.containerStatuses[0].restartCount,
        labels: pod.metadata.labels,
        namespace: pod.metadata.namespace,
      };
      podInfoList.push(podInfo);
    }
    return podInfoList;
  }

}
export default WorkloadSummaryApi;