import React, { Component } from "react";
import CommonAPI from "./CommonApi.js";

class DeploymentApi extends Component {

    /** WRITE **/

    /**
     * Create Deployment
     * POST /api/v1/namespaces/{namespace}/deployments
     * 
     * @param namespace 
     * @body Deployment
     */
    static createDeployment = async (namespace, body) => {
        return await CommonAPI.post(`/api/v1/namespaces/${namespace}/deployments`, body);
    }


    /**
     * Patch Deployment
     * PATCH /apis/apps/v1/namespaces/{namespace}/deployments/{name}
     * 
     * @param namespace 
     * @param name
     * @body patch
     */
    static patchDeployment = async (namespace, name, body) => {
        const deployment = await CommonAPI.patch(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}`, body);
        return deployment;
    }


    /**
     * Replace Deployment
     * PUT /apis/apps/v1/namespaces/{namespace}/deployments/{name}
     * 
     * @param namespace 
     * @param name
     * @body Deployment
     */
    static replaceDeployment = async (namespace, name, body) => {
        const deployment = await CommonAPI.put(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}`, body);
        return deployment;
    }


    /**
     * Delete Deployment
     * DELETE /apis/apps/v1/namespaces/{namespace}/deployments/{name}
     * 
     * @param namespace 
     * @param name
     * @body DeleteOptions
     */
    static deleteDeployment = async (namespace, name, body) => {
        const deployment = await CommonAPI.delete(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}`, body);
        return deployment;
    }


    /**
     * Delete Collection of Deployments
     * DELETE /apis/apps/v1/namespaces/{namespace}/deployments
     * 
     * @param namespace 
     * @body DeleteOptions
     */
    static deleteDeploymentCollection = async (namespace, body) => {
        const deploymentsList = await CommonAPI.delete(`/apis/apps/v1/namespaces/${namespace}/deployments`, body);
        return deploymentsList.items;
    }


    /** READ **/

    /**
     * list or watch objects of kind Deployment in all namespaces
     * GET /apis/apps/v1/deployments
     * 
    */
    static listAllDeployment = async () => {
        const deploymentsList = await CommonAPI.get(`/apis/apps/v1/deployments`);
        return deploymentsList.items;
    }


    /**
     * list or watch objects of kind Deployment
     * GET /apis/apps/v1/namespaces/{namespace}/deployments
     * 
     * @param namespace 
    */
    static listDeployment = async (namespace) => {
        const deploymentsList = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments`);
        return deploymentsList.items;
    }


    /**
     * read the specified Deployment
     * GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}
     * 
     * @param namespace 
     * @param name
    */
    static readDeployment = async (namespace, name) => {
        const deployment = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}`);
        return deployment;
    }


    /** STATUS **/

    /**
     * Patch Deployment Status
     * PATCH /apis/apps/v1/namespaces/{namespace}/deployments/{name}/status
     * 
     * @param namespace 
     * @param name
     * @body Patch
     */
    static patchDeploymentStatus = async (namespace, name, body) => {
        const deployment = await CommonAPI.patch(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/status`, body);
        return deployment;
    }


    /**
     * read status of the specified Deployment
     * GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}/status
     * 
     * @param namespace 
     * @param name
    */
    static readDeploymentStatus = async (namespace, name) => {
        const deploymentStatus = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/status`);
        return deploymentStatus;
    }


    /**
     * Replace Deployment Status
     * PUT /apis/apps/v1/namespaces/{namespace}/deployments/{name}/status
     * 
     * @param namespace 
     * @param name
     * @body Deployment
     */
    static replaceDeploymentStatus = async (namespace, name, body) => {
        const deployment = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/status`, body);
        return deployment;
    }
    
    /** MISC **/

    /**
     * read scale of the specified Deployment
     * GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}/scale
     * 
     * @param namespace 
     * @param name
    */
    static readDeploymentScale = async (namespace, name) => {
        const deploymentScale = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/scale`);
        return deploymentScale;
    }


    /**
     * Replace Deployment Scale
     * PUT /apis/apps/v1/namespaces/{namespace}/deployments/{name}/scale
     * 
     * @param namespace 
     * @param name
     * @body Scale
     */
    static replaceDeploymentScale = async (namespace, name, body) => {
        const deployment = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/scale`, body);
        return deployment;
    }
    

    /**
     * Patch Deployment Scale
     * PATCH /apis/apps/v1/namespaces/{namespace}/deployments/{name}/scale
     * 
     * @param namespace 
     * @param name
     * @body Patch
     */
    static patchDeploymentScale = async (namespace, name, body) => {
        const deployment = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/scale`, body);
        return deployment;
    }

}
export default DeploymentApi;