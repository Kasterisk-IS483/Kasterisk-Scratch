import React, { Component } from "react";

import CommonAPI from "./CommonApi";

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
    const status = await CommonAPI.delete(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}`, body);
    return status;
  }


  /**
   * Delete Collection of Deployments
   * DELETE /apis/apps/v1/namespaces/{namespace}/deployments
   * 
   * @param namespace 
   * @body DeleteOptions
   */
  static deleteDeploymentCollection = async (namespace, body) => {
    const status = await CommonAPI.delete(`/apis/apps/v1/namespaces/${namespace}/deployments`, body);
    return status;
  }


  /** READ **/

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

  /**
   * list or watch objects of kind Deployment
   * GET /apis/apps/v1/namespaces/{namespace}/deployments
   * 
   * @param namespace
   * @param parameters
  */
  static listDeployment = async (namespace, parameters) => {
    const deploymentList = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments`, parameters);
    return deploymentList.items;
  }

  /**
   * list or watch objects of kind Deployment in all namespaces
   * GET /apis/apps/v1/deployments
   * 
   * @param parameters
  */
  static listAllDeployment = async (parameters) => {
    const deploymentList = await CommonAPI.get(`/apis/apps/v1/deployments`, parameters);
    return deploymentList.items;
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
    const deployment = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/status`);
    return deployment;
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
    const scale = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/scale`);
    return scale;
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
    const scale = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/scale`, body);
    return scale;
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
    const scale = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}/scale`, body);
    return scale;
  }

}
export default DeploymentApi;