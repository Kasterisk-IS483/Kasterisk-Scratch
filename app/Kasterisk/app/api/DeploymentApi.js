import React, { Component } from "react";
import CommonAPI from "./CommonApi.js";

class DeploymentApi extends Component {

    //GET FUNCTIONS

    /**
     * list or watch objects of kind Deployment in all namespaces
     * GET /apis/apps/v1/deployments
     * 
    */
    static listAllDeployment = async () => {
        const DeploymentsList = await CommonAPI.get(`/apis/apps/v1/deployments`);
        return DeploymentsList.items;
    }


    /**
     * list or watch objects of kind Deployment
     * GET /apis/apps/v1/namespaces/{namespace}/deployments
     * 
     * @param namespace 
    */
    static listDeployment = async (namespace) => {
        const DeploymentsList = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments`);
        return DeploymentsList.items;
    }


    /**
     * read the specified Deployment
     * GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}
     * 
     * @param namespace 
     * @param name
    */
    static readDeployment = async (namespace, name) => {
        const Deployment = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}`);
        return Deployment;
    }


    /**
     * read status of the specified Deployment
     * GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}/status
     * 
     * @param namespace 
     * @param name
    */
    static readDeploymentStatus = async (namespace, name) => {
        const DeploymentStatus = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/status`);
        return DeploymentStatus;
    }

    /**
     * read scale of the specified Deployment
     * GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}/scale
     * 
     * @param namespace 
     * @param name
    */
    static readDeploymentScale = async (namespace, name) => {
        const DeploymentScale = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/scale`);
        return DeploymentScale;
    }



}
export default DeploymentApi;