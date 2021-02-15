import React, { Component } from "react";
import CommonAPI from "./CommonApi.js";
import DeploymentApi from "./DeploymentApi.js";
import ReplicasetApi from "./ReplicasetApi.js";
import PodApi from "./PodApi.js";
import NodeApi from "./NodeApi.js";

class WorkloadSummaryApi extends Component {

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

    static readyPods = async () => {
        let pods = await PodApi.listAllPod();
        let readyPodsCnt = 0;
        for (i = 0; i < deployments.length; i++) {
            if(pods[i].status.phase == "Running"){
                readyPodsCnt+=1;
            }
        } 
        return readyPodsCnt;
    }
    
    static readyReplicaSets = async () => {
        let replicasets = await ReplicasetApi.listAllReplicaSet();
        let readyReplicaSetsCnt = 0;
        for (var i = 0; i < replicasets.length; i++) {
            if(replicasets[i].status.readyReplicas == replicasets[i].status.replicas){
                readyReplicaSetsCnt+=1;
            }
        } 
        return readyReplicaSetsCnt;
    }

    static readyDeployments = async () => {
        let deployments = await DeploymentApi.listAllDeployment();
        let readyDeploymentsCnt = 0;
        for (i = 0; i < deployments.length; i++) {
            if(deployments[i].status.readyReplicas == deployments[i].status.replicas){
                readyDeploymentsCnt+=1;
            }
        } 
        return readyDeploymentsCnt;
    }

    static notReadyDeployments = async () => {
        let totalDeployments = await WorkloadSummaryApi.totalDeployments();
        let readyDeployments = await WorkloadSummaryApi.readyDeployments();
        return totalDeployments - readyDeployments;
    }

    // static notReadyReplicaSets = async () => {
    //     let totalReplicaSets = await WorkloadSummaryApi.totalReplicaSets();
    //     let readyReplicaSets = await WorkloadSummaryApi.readyReplicaSets();
    //     return totalReplicaSets - readyReplicaSets;
    // }

    // static notReadyPods = async () => {
    //     let totalPods = await WorkloadSummaryApi.totalPods();
    //     let readyPods = await WorkloadSummaryApi.readyPods();
    //     return totalPods - readyPods;
    // }

    static nodesInfo = async () => {
        let nodes = await NodeApi.listAllNode();
        return nodes;
    }




}
export default WorkloadSummaryApi;