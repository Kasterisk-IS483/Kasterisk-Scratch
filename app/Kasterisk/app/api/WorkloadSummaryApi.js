import React, { Component } from "react";
import CommonAPI from "./CommonApi.js";
import DeploymentApi from "./DeploymentApi.js";
import ReplicasetApi from "./ReplicasetApi.js";
import PodApi from "./PodApi.js";

class WorkloadSummaryApi extends Component {

    static totalDeployments = async () => {
        let deployments = await DeploymentApi.listAllDeployment();
        return deployments.length;
    }

    static totalReplicasets = async () => {
        let replicasets = await ReplicasetApi.listAllReplicaSet();
        return replicasets.length;
    }

    static totalPods = async () => {
        let pods = await PodApi.listAllPod();
        return pods.length;
    }

    //Do for loop to 
    //Get total ready pods
    //Get total not ready pods

    //Do for loop to 
    //Get total ready replicaset
    //Get total not ready replicaset

    //(Should be same as replicaset )
    //Get total ready deployment
    //Get total not ready deployment



}
export default WorkloadSummaryApi;