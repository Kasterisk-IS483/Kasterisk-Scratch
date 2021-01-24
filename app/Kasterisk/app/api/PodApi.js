import React, { Component } from "react";

import CommonAPI from "./CommonApi.js";

class PodApi extends Component {

    /** WRITE **/

    /**
     * Create Pod
     * POST /api/v1/namespaces/{namespace}/pods
     * 
     * @param namespace 
     * @body Pod
     */
    static createPod = async (namespace, body) => {
        const url = `/api/v1/namespaces/${namespace}/pods`;
        return await CommonAPI.post(url, body);
    }

    /**
     * Create Pod Eviction
     * POST /api/v1/namespaces/{namespace}/pods/{name}/eviction
     * 
     * @param namespace 
     * @param name
     * @body Pod Eviction
     */
    static createPodEviction = async (namespace, name, body) => {
        const url = `/api/v1/namespaces/${namespace}/pods/${name}/eviction`;
        const podsList = await CommonAPI.post(url, body);
        return podsList.items;
    }

    /**
     * Patch Pod
     * PATCH /api/v1/namespaces/{namespace}/pods/{name}
     * 
     * @param namespace 
     * @param name
     * @body Pod
     */
    static patchPod = async (namespace, name, body) => {
        const url = `/api/v1/namespaces/${namespace}/pods/${name}`;
        const podsList = await CommonAPI.patch(url, body);
        return podsList.items;
    }

    /**
     * Replace Pod
     * PUT /api/v1/namespaces/{namespace}/pods/{name}
     * 
     * @param namespace 
     * @param name
     * @body Pod
     */
    static replacePod = async (namespace, name, body) => {
        const url = `/api/v1/namespaces/${namespace}/pods/${name}`;
        const podsList = await CommonAPI.put(url, body);
        return podsList.items;
    }

    /**
     * Delete Pod
     * DELETE /api/v1/namespaces/{namespace}/pods/{name}
     * 
     * @param namespace 
     * @param name
     * @body DeleteOptions
     */
    static deletePod = async (namespace, name, body) => {
        const url = `/api/v1/namespaces/${namespace}/pods/${name}`;
        const podsList = await CommonAPI.delete(url, body);
        return podsList.items;
    }

    /**
     * Delete Pod Collection
     * DELETE /api/v1/namespaces/{namespace}/pods
     * 
     * @param namespace 
     * @param name
     * @body DeleteOptions
     */
    static deletePodCollection = async (namespace, body) => {
        const url = `/api/v1/namespaces/${namespace}/pods`;
        const podsList = await CommonAPI.delete(url, body);
        return podsList.items;
    }

    /** READ **/

    /**
     * Read Pod
     * GET /api/v1/namespaces/{namespace}/pods/{name}
     * 
     * @param namespace 
     * @param name 
     */
    static readPod = async (namespace, name) => {
        const podsList = await CommonAPI.get(`/api/v1/namespaces/${namespace}/pods/${name}`);
        return podsList.items;
    }

    /**
    * List Pod
    * GET /api/v1/namespaces/{namespace}/pods
    * 
    * @param namespace 
    */
    static listPod = async (namespace) => {
        const podsList = await CommonAPI.get(`/api/v1/namespaces/${namespace}/pods`);
        return podsList.items;
    }

    /**
     * List All Pods
     * GET /api/v1/pods
     */
    static listAllNamespace = async () => {
        const podsList = await CommonAPI.get(`/api/v1/pods`);
        return podsList.items;
    }

    /** STATUS **/

    /**
     * Patch Pod Status
     * PATCH /api/v1/namespaces/{namespace}/pods/{name}/status
     * 
     * @param namespace 
     * @param name
     * @body Patch
     */
    static patchPodStatus = async (namespace, name, body) => {
        const url = `/api/v1/namespaces/${namespace}/pods/${name}/status`;
        return await CommonAPI.patch(url, body);
    }

    /**
     * Read Pod Status
     * GET /api/v1/namespaces/{namespace}/pods/{name}/status
     * 
     * @param namespace 
     * @param name
    */
    static readPodStatus = async (namespace, name) => {
        const podsList = await CommonAPI.get(`/api/v1/namespaces/${namespace}/pods/${name}/status`);
        return podsList.items;
    }

    /**
     * Replace Pod Status
     * PUT /api/v1/namespaces/{namespace}/pods/{name}/status
     * 
     * @param namespace 
     * @param name
     * @body Pod
    */
    static replacePodStatus = async (namespace, name, body) => {
        const url = `/api/v1/namespaces/${namespace}/pods/${name}/status`;
        const podsList = await CommonAPI.put(url, body);
        return podsList.items;
    }

    /** MISC **/

    /**
     * Read Pod Log
     * GET /api/v1/namespaces/{namespace}/pods/{name}/log
     * 
     * @param namespace 
     * @param name
    */
    static readPodLog = async (namespace, name) => {
        const podsList = await CommonAPI.get(`/api/v1/namespaces/${namespace}/pods/${name}/log`);
        return podsList.items;
    }

}
export default PodApi;