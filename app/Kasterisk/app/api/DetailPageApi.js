import React, { Component } from "react";

import PodApi from "./PodApi";
import { getAgeText } from "../utils/constants";

class DetailPageApi extends Component {

  /** REPLICASET GRID **/
  static PodsStatuses = async (namespace, labels) => {
    let labelParam = "";
    Object.keys(labels).map((labelItem, labelIndex) => (
      labelParam += labelItem + "=" + labels[labelItem] + ","
    )
    )
    labelParam = labelParam.slice(0, -1);
    const podList = await PodApi.listPod(namespace, { labelSelector: labelParam });
    const podsStatuses = {
      waiting: 0,
      running: 0,
      failed: 0,
      succeeded: 0,
    };
    for (i = 0; i < podList.length; i++) {
      if (podList[i].status.phase == "Pending") {
        podsStatuses.waiting += 1;
      } else if (podList[i].status.phase == "Running") {
        podsStatuses.running += 1;
      } else if (podList[i].status.phase == "Failed") {
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
    for (const containerStatus of containerStatuses) {
      if (containerStatus.state.running != undefined) {
        noOfRunningContainers += 1
      }
    }
    return status = noOfRunningContainers + "/" + noOfContainers;
  }

  /** DEPLOYMENT TABLE - PODS **/
  static PodsInfo = (pods) => {
    let PodsInfo = []
    for (const pod of pods) {
      const status = DetailPageApi.getContainerStatus(pod.status.containerStatuses);
      let podInfo = [
        pod.metadata.name,
        status,
        pod.status.phase,
        pod.status.containerStatuses[0].restartCount,
        pod.spec.nodeName,
        getAgeText(pod.metadata.creationTimestamp),
        pod.metadata.namespace,
      ];
      PodsInfo.push(podInfo);
    }
    return PodsInfo;
  }

  /** NODE & DEPLOYMENT TABLE - CONDITIONS **/
  static Conditions = (conditions, type) => {
    let Conditions = []
    for (const condition of conditions) {
      let updateOrHeartbeat = "lastUpdateTime";
      if (type == "node") {
        updateOrHeartbeat = "lastHeartbeatTime";
      }
      let Condition = [
        condition.type,
        condition.reason,
        condition.status,
        condition.message,
        getAgeText(condition[updateOrHeartbeat]),
        getAgeText(condition.lastTransitionTime),
      ];
      Conditions.push(Condition);
    }
    return Conditions;
  }

  /** POD TABLE - POD CONDITIONS **/
  static PodConditions = (conditions) => {
    let PodConditions = []
    for (const condition of conditions) {
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

  /** NODE TABLE - ADDRESSES **/
  static PodAddresses = (addresses) => {
    let PodAddresses = []
    for (const address of addresses) {
      let podAddress = [
        address.type,
        address.address,
      ];
      PodAddresses.push(podAddress);
    }
    return PodAddresses;
  }

  /** NODE TABLE - RESOURCES **/
  static PodResources = (statuses) => {
    let PodResources = []
    Object.keys(statuses.capacity).forEach(function (key) {
      let podResource = [
        key,
        statuses.capacity[key],
        statuses.allocatable[key],
      ];
      PodResources.push(podResource);
    });
    return PodResources;
  }

  /** NODE TABLE - IMAGES **/
  static PodImages = (images) => {
    let PodImages = [];
    for (const image of images) {
      let namesString = "";
      for (const name of image.names) {
        namesString += name + " ";
      }
      let podImage = [
        namesString,
        image.sizeBytes,
      ];
      PodImages.push(podImage);
    }
    return PodImages;
  }
}
export default DetailPageApi;