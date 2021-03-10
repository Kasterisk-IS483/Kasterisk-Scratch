import React, { Component } from "react";

import NamespaceApi from "./NamespaceApi.js";
import DeploymentApi from "./DeploymentApi.js";
import ReplicasetApi from "./ReplicasetApi.js";
import PodApi from "./PodApi.js";
import NodeApi from "./NodeApi.js";
import WorkloadSummaryApi from "./WorkloadSummaryApi.js";

class DetailPageApi extends Component {

    /** REPLICASET GRID **/
    static PodsStatuses = async (namespace) => {
        const podList = await PodApi.listPod(namespace);
        const podsStatuses = {
            waiting: 0,
            running: 0,
            failed: 0,
            succeeded: 0,
        };
        for (i = 0; i < podList.length; i++) {
            if(podList[i].status.phase == "Pending"){
                podsStatuses.waiting += 1;
            } else if (podList[i].status.phase == "Running"){
                podsStatuses.running += 1;
            } else if (podList[i].status.phase == "Failed"){
                podsStatuses.failed += 1;
            } else {
                podsStatuses.succeeded += 1;
            }
        } 
        return podsStatuses;
    }

    /** DEPLOYMENT TABLE - PODS **/
    static PodsInfo = (pods) => {
        let PodsInfo = []
        for (const pod of pods){
            let age = WorkloadSummaryApi.calculateAge(pod.metadata.creationTimestamp);
            const noOfContainers = pod.status.containerStatuses.length;
            let noOfRunningContainers = 0;
            for (const containerStatus of pod.status.containerStatuses){
                if (containerStatus.state.running != undefined){
                    noOfRunningContainers+=1
                } 
            }
            const status = noOfRunningContainers + "/" + noOfContainers;
            let podInfo = [
                pod.metadata.name,
                status,
                pod.status.phase,
                pod.status.containerStatuses[0].restartCount,
                pod.spec.nodeName,
                Math.floor(age),
            ];
            PodsInfo.push(podInfo);
        }
        return PodsInfo;
    }

    /** DEPLOYMENT TABLE - CONDITIONS **/
    static DeploymentConditions = (conditions) => {
        let DeploymentConditions = []
        for (const condition of conditions){
            let lastUpdate = WorkloadSummaryApi.calculateAge(condition.lastUpdateTime);
            let lastTransition = WorkloadSummaryApi.calculateAge(condition.lastTransitionTime);
            let deploymentCondition = [
                condition.type,
                condition.reason,
                condition.status,
                condition.message,
                Math.floor(lastUpdate),
                Math.floor(lastTransition),
            ];
            DeploymentConditions.push(deploymentCondition);
        }
        return DeploymentConditions;
    }

    /** POD TABLE - POD CONDITIONS **/
    static PodConditions = (conditions) => {
        let PodConditions = []
        for (const condition of conditions){
            let lastTransition = WorkloadSummaryApi.calculateAge(condition.lastTransitionTime);
            let podCondition = [
                condition.type,
                condition.status,
                Math.floor(lastTransition),
                "",
                "",
            ];
            PodConditions.push(podCondition);
        }
        return PodConditions;
    }

}
export default DetailPageApi;