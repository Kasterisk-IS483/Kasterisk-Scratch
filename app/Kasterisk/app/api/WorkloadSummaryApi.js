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
        namespaceLabels.push({
            label: "",
            value: ""
        });
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

    /** ALL TAB INFO **/
    static deploymentSummary = async () => {
        let deployments = await DeploymentApi.listAllDeployment();
        let totalDeployments = deployments.length;
        let readyDeploymentsCnt = 0;
        for (i = 0; i < deployments.length; i++) {
            if(deployments[i].status.readyReplicas == deployments[i].status.replicas){
                readyDeploymentsCnt+=1;
            }
        }
        let notReadyDeploymentsCnt = totalDeployments - readyDeploymentsCnt;
        return {
            readyDeployments: readyDeploymentsCnt,
            notReadyDeployments: notReadyDeploymentsCnt
        }
    }

    static deploymentSummary = async (namespace) => {
        let deployments = await DeploymentApi.listDeployment(namespace);
        let totalDeployments = deployments.length;
        let readyDeploymentsCnt = 0;
        for (i = 0; i < deployments.length; i++) {
            if(deployments[i].status.readyReplicas == deployments[i].status.replicas){
                readyDeploymentsCnt+=1;
            }
        }
        let notReadyDeploymentsCnt = totalDeployments - readyDeploymentsCnt;
        return {
            readyDeployments: readyDeploymentsCnt,
            notReadyDeployments: notReadyDeploymentsCnt
        }
    }

    static replicasetSummary = async () => {
        let replicasets = await ReplicasetApi.listAllReplicaSet();
        let totalReplicaSets = replicasets.length;
        console.log(totalReplicaSets);
        let readyReplicaSetsCnt = 0;
        for (var i = 0; i < replicasets.length; i++) {
            if(replicasets[i].status.readyReplicas == replicasets[i].status.replicas){
                readyReplicaSetsCnt+=1;
            }
        } 
        let notReadyReplicaSetsCnt = totalReplicaSets - readyReplicaSetsCnt;
        return {
            readyReplicaSets: readyReplicaSetsCnt,
            notReadyReplicaSets: notReadyReplicaSetsCnt
        }
    }

    static replicasetSummary = async (namespace) => {
        let replicasets = await ReplicasetApi.listReplicaSet(namespace);
        let totalReplicaSets = replicasets.length;
        let readyReplicaSetsCnt = 0;
        for (var i = 0; i < replicasets.length; i++) {
            if(replicasets[i].status.readyReplicas == replicasets[i].status.replicas){
                readyReplicaSetsCnt+=1;
            }
        } 
        let notReadyReplicaSetsCnt = totalReplicaSets - readyReplicaSetsCnt;
        return {
            readyReplicaSets: readyReplicaSetsCnt,
            notReadyReplicaSets: notReadyReplicaSetsCnt
        }
    }

    static podSummary = async () => {
        let pods = await PodApi.listAllPod();
        let totalPods = pods.length;
        let readyPodsCnt = 0;
        for (i = 0; i < pods.length; i++) {
            if(pods[i].status.phase == "Running"){
                readyPodsCnt+=1;
            }
        } 
        let notReadyPodsCnt = totalPods - readyPodsCnt;
        return {
            readyPods: readyPodsCnt,
            notReadyPods: notReadyPodsCnt
        }
    }

    static podSummary = async (namespace) => {
        let pods = await PodApi.listPod(namespace);
        console.log(pods);
        let totalPods = pods.length;
        let readyPodsCnt = 0;
        for (i = 0; i < pods.length; i++) {
            if(pods[i].status.phase == "Running"){
                readyPodsCnt+=1;
            }
        } 
        let notReadyPodsCnt = totalPods - readyPodsCnt;
        return {
            readyPods: readyPodsCnt,
            notReadyPods: notReadyPodsCnt
        }
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

    /** DEPLOYMENT TAB INFO **/
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

    /** REPLICASET TAB INFO **/
    static replicasetsInfo = async () => {
        let replicasetsInfo = [];
        let replicasets = await ReplicasetApi.listAllReplicaSet();
        
        for (const replicaset of replicasets){
            let creationDT = new Date(replicaset.metadata.creationTimestamp);
            let difference = await WorkloadSummaryApi.calculateAge(creationDT);
            let replicasetInfo = {
                name: replicaset.metadata.name,
                age: Math.floor(difference),
                labels: replicaset.metadata.labels,
                containers: 'test',
                status: replicaset.status.readyReplicas,
                total: replicaset.status.replicas,
            };
            replicasetsInfo.push(replicasetInfo);
        }
        return replicasetsInfo;
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