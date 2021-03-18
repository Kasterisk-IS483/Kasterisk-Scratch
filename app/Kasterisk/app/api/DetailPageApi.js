import React, { Component } from "react";

import PodApi from "./PodApi.js";
import { getAgeText } from "../utils/constants";

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

    /** GET CONTAINER STATUSES FOR PODS **/
    static getContainerStatus = (containerStatuses) => {
        const noOfContainers = containerStatuses.length;
            let noOfRunningContainers = 0;
            for (const containerStatus of containerStatuses){
                if (containerStatus.state.running != undefined){
                    noOfRunningContainers+=1
                } 
            }
        return status = noOfRunningContainers + "/" + noOfContainers;
    }

    /** DEPLOYMENT TABLE - PODS **/
    static PodsInfo = (pods) => {
        let PodsInfo = []
        for (const pod of pods){
            const status = DetailPageApi.getContainerStatus(pod.status.containerStatuses);
            let podInfo = [
                pod.metadata.name,
                status,
                pod.status.phase,
                pod.status.containerStatuses[0].restartCount,
                pod.spec.nodeName,
                getAgeText(pod.metadata.creationTimestamp),
            ];
            PodsInfo.push(podInfo);
        }
        return PodsInfo;
    }

    /** DEPLOYMENT TABLE - CONDITIONS **/
    static DeploymentConditions = (conditions) => {
        let DeploymentConditions = []
        for (const condition of conditions){
            let deploymentCondition = [
                condition.type,
                condition.reason,
                condition.status,
                condition.message,
                getAgeText(condition.lastUpdateTime),
                getAgeText(condition.lastTransitionTime),
            ];
            DeploymentConditions.push(deploymentCondition);
        }
        return DeploymentConditions;
    }

    /** POD TABLE - POD CONDITIONS **/
    static PodConditions = (conditions) => {
        let PodConditions = []
        for (const condition of conditions){
            let podCondition = [
                condition.type,
                condition.status,
                getAgeText(condition.lastTransitionTime),
                "",
                "",
            ];
            PodConditions.push(podCondition);
        }
        return PodConditions;
    }

    /** POD - TEMPLATE **/
    static PodTemplates = (pod) => {
        let podTemplates = []
        let containerStatuses = pod.status.containerStatuses;
        for (i = 0; i < containerStatuses.length; i++) {
            let podTemplate = {
                name: containerStatuses[i].name,
                image: containerStatuses[i].image,
                imageID: containerStatuses[i].imageID,
                ready: String(containerStatuses[i].ready),
                restartCount: containerStatuses[i].restartCount,
                volumeMounts: pod.spec.containers[i].volumeMounts,
            }
            podTemplates.push(podTemplate);
        }
        return podTemplates;
    }

}
export default DetailPageApi;