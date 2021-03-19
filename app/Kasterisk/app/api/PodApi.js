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
        const eviction = await CommonAPI.post(url, body);
        return eviction;
    }

    /**
     * Patch Pod
     * PATCH /api/v1/namespaces/{namespace}/pods/{name}
     * 
     * @param namespace 
     * @param name
     * @body patch
     */
    static patchPod = async (namespace, name, body) => {
        const url = `/api/v1/namespaces/${namespace}/pods/${name}`;
        const pod = await CommonAPI.patch(url, body);
        return pod;
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
        const pod = await CommonAPI.put(url, body);
        return pod;
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
        const status = await CommonAPI.delete(url, body);
        return status;
    }

    /**
     * Delete Collection of Pods
     * DELETE /api/v1/namespaces/{namespace}/pods
     * 
     * @param namespace 
     * @body DeleteOptions
     */
    static deletePodCollection = async (namespace, body) => {
        const status = await CommonAPI.delete(`/api/v1/namespaces/${namespace}/pods`, body);
        return status;
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
        const pod = await CommonAPI.get(`/api/v1/namespaces/${namespace}/pods/${name}`);
        return pod;
    }

    /**
    * List Pod of specific namespace
    * GET /api/v1/namespaces/{namespace}/pods
    * 
    * @param namespace 
    */
    static listPod = async (namespace) => {
        const podList = await CommonAPI.get(`/api/v1/namespaces/${namespace}/pods`);
        return podList.items;
    }

    /**
     * List All Pods
     * GET /api/v1/pods
     */
    static listAllPod = async () => {
        const podList = await CommonAPI.get(`/api/v1/pods`);
        return podList.items;
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
        const pod = await CommonAPI.get(`/api/v1/namespaces/${namespace}/pods/${name}/status`);
        return pod;
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
        const pod = await CommonAPI.put(url, body);
        return pod;
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
        const podLog = await CommonAPI.get(`/api/v1/namespaces/${namespace}/pods/${name}/log`);
        return podLog;
    }

    /**
     * Read Pod Log Text
     * GET /api/v1/namespaces/{namespace}/pods/{name}/log
     * 
     * @param namespace 
     * @param name
    */
    static readPodLogText = async (namespace, name) => {
        const podLog = await CommonAPI.getText(`/api/v1/namespaces/${namespace}/pods/${name}/log`, "text");
        return podLog;
    }

}
export default PodApi;