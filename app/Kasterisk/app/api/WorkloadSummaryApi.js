import React, { Component } from "react";

import CommonAPI from "./CommonApi.js";
import NamespaceApi from "./NamespaceApi.js";
import DeploymentApi from "./DeploymentApi.js";
import ReplicasetApi from "./ReplicasetApi.js";
import PodApi from "./PodApi.js";
import NodeApi from "./NodeApi.js";

class WorkloadSummaryApi extends Component {

    /** NAMESPACES **/
    static namespaceLabels = async () => {
        let namespaces = await NamespaceApi.listAllNamespace();
        const namespaceLabels = [];
        for (const namespace of namespaces){
            let namespaceLabel = {
                label: namespace.metadata.name,
                value: namespace.metadata.name
            }
            namespaceLabels.push(namespaceLabel);
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

    /** READY **/
    static readyPods = async () => {
        let pods = await PodApi.listAllPod();
        let readyPodsCnt = 0;
        for (i = 0; i < pods.length; i++) {
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

    /** NOT READY **/
    static notReadyDeployments = async () => {
        let totalDeployments = await WorkloadSummaryApi.totalDeployments();
        let readyDeployments = await WorkloadSummaryApi.readyDeployments();
        return totalDeployments - readyDeployments;
    }

    static notReadyReplicaSets = async () => {
        let totalReplicaSets = await WorkloadSummaryApi.totalReplicaSets();
        let readyReplicaSets = await WorkloadSummaryApi.readyReplicaSets();
        return totalReplicaSets - readyReplicaSets;
    }

    static notReadyPods = async () => {
        let totalPods = await WorkloadSummaryApi.totalPods();
        let readyPods = await WorkloadSummaryApi.readyPods();
        return totalPods - readyPods;
    }

    /** NODE INFO **/
    static nodesInfo = async () => {
        let nodes = await NodeApi.listAllNode();
        return nodes;
    }

    /** CALCULATE AGE FOR DEPLOYMENT, POD, REPLICASET **/
    static calculateAge = async (creationDT) => {
        var current = new Date();
        // To calculate the time difference of two dates 
        let differenceInTime = current.getTime() - creationDT.getTime(); 
        // To calculate the no. of days between two dates 
        let differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays;
    }

    /** DEPLOYMENT INFO **/
    static deploymentsInfo = async () => {
        let deploymentsInfo = [];
        let deployments = await DeploymentApi.listAllDeployment();
        
        for (const deployment of deployments){
            let creationDT = new Date(deployment.metadata.creationTimestamp);
            let difference = await WorkloadSummaryApi.calculateAge(creationDT);
            let deploymentInfo = {
                name: deployment.metadata.name,
                age: Math.floor(difference),
                labels: deployment.metadata.labels,
                containers: 'test',
                status: deployment.status.readyReplicas,
                total: deployment.status.replicas,
            };
            deploymentsInfo.push(deploymentInfo);
        }
        return deploymentsInfo;
    }

    /** POD TAB INFO **/
    static podInfoList = async () => {
        let pods = await PodApi.listAllPod();
        var podInfoList = [];
        
        for (const pod of pods){
            let creationDT = new Date(pod.metadata.creationTimestamp);
            let difference = await WorkloadSummaryApi.calculateAge(creationDT);
            let podInfo = {
                name: pod.metadata.name,
                age: Math.floor(difference),
                status: pod.status.phase,
                restarts: pod.status.containerStatuses[0].restartCount,
                labels: pod.metadata.labels,
            };
            podInfoList.push(podInfo);
        } 
        return podInfoList;
    }


// // Array of Objects in form {element: {id: 10, quantity: 10} }
// var element = {}, cart = [];
// element.id = id;
// element.quantity = quantity;
// cart.push({element: element});

}
export default WorkloadSummaryApi;