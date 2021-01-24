import React, { Component } from "react";
import RNFetchBlob from "react-native-fetch-blob";

import { urlOptions } from "../utils/constants.js";

class ReplicasetApi extends Component {

    static apiFetch = async ({ apiUrl, method, body="" }) => {

        try {
            let callUrl = `${urlOptions.baseUrl}/${apiUrl}`;

            const response = await RNFetchBlob.config({
                trusty: true,
            }).fetch(method, callUrl, {
                Authorization:
                    `Bearer ${urlOptions.refreshToken}`,
                insecureSkipTLSVerify: false
            }, body);
            return response.json();

        }
        catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    };

    static get(apiUrl, body="") {
        return this.apiFetch({ method: 'GET', apiUrl, body });
    }
    static post(apiUrl, body="") {
        return this.apiFetch({ method: 'POST', apiUrl, body });
    }
    static put(apiUrl, body="") {
        return this.apiFetch({ method: 'PUT', apiUrl, body });
    }
    static delete(apiUrl, body="") {
        return this.apiFetch({ method: 'DELETE', apiUrl, body });
    }
    static patch(apiUrl, body="") {
        return this.apiFetch({ method: 'PATCH', apiUrl, body });
    }

    /** Write **/

    /**
     * Create
     * POST /apis/apps/v1/namespaces/{namespace}/replicasets
     * 
     * @param namespace 
     * @body ReplicaSet
     */
    static createReplicaSet = async (namespace, body) => {
        const replicasetsList = await this.post(`apis/apps/v1/namespaces/${namespace}/replicasets`, body);
        return replicasetsList.items;
    }

    /**
     * Patch
     * PATCH /apis/apps/v1/namespaces/{namespace}/replicasets/{name}
     * 
     * @param namespace 
     * @body Patch
     */
    static patchReplicaSet = async (namespace, body) => {
        const replicasetsList = await this.patch(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
        return replicasetsList.items;
    }

    /**
     * Replace
     * PUT /apis/apps/v1/namespaces/{namespace}/replicasets/{name}
     * 
     * @param namespace 
     * @body ReplicaSet
     */
    static replaceReplicaSet = async (namespace, body) => {
        const replicasetsList = await this.put(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
        return replicasetsList.items;
    }

    /**
     * Delete
     * DELETE /apis/apps/v1/namespaces/{namespace}/replicasets/{name}
     * 
     * @param namespace 
     * @body DeleteOptions
     */
    static deleteReplicaSet = async (namespace, body) => {
        const replicasetsList = await this.delete(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
        return replicasetsList.items;
    }

    /**
     * Delete Collection
     * DELETE /apis/apps/v1/namespaces/{namespace}/replicasets
     * 
     * @param namespace 
     * @body DeleteOptions
     */
    static deleteReplicaSetCollection = async (namespace, body) => {
        const replicasetsList = await this.delete(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
        return replicasetsList.items;
    }
    
    /** Read **/

    /**
     * Read
     * GET /apis/apps/v1/namespaces/{namespace}/replicasets/{name}
     * 
     * @param namespace 
     * @param name 
     */
    static readReplicaSet = async (namespace, name) => {
        const replicasetsList = await this.get(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}`);
        return replicasetsList.items;
    }

    /**
     * List
     * GET /apis/apps/v1/namespaces/{namespace}/replicasets
     * 
     * @param namespace 
     */
    static listReplicaSet = async (namespace) => {
        const replicasetsList = await this.get(`apis/apps/v1/namespaces/${namespace}/replicasets`);
        return replicasetsList.items;
    }

    /**
     * List All Namespaces
     * GET /apis/apps/v1/replicasets
     */
    static listAllReplicaSet = async () => {
        const replicasetsList = await this.get(`apis/apps/v1/replicasets`);
        return replicasetsList.items;
    }

    /** Status **/
    
    /**
     * Patch Status
     * PATCH /apis/apps/v1/namespaces/{namespace}/replicasets/{name}/status
     * 
     * @param namespace 
     * @param name
     * @body Patch
     */
    static patchReplicaSetStatus = async (namespace, name, body) => {
        const replicasetsList = await this.get(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}/status`, body);
        return replicasetsList.items;
    }

    /**
     * Read Status
     * GET /apis/apps/v1/namespaces/{namespace}/replicasets/{name}/status
     * 
     * @param namespace 
     * @param name
    */
    static readReplicaSetStatus = async (namespace, name) => {
        const replicasetsList = await this.get(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}/status`);
        return replicasetsList.items;
    }

    /**
     * Replace Status
     * PUT /apis/apps/v1/namespaces/{namespace}/replicasets/{name}/status
     * 
     * @param namespace 
     * @param name
     * @body ReplicaSet
     */
    static replaceReplicaSet = async (namespace, name, body) => {
        const replicasetsList = await this.get(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}/status`, body);
        return replicasetsList.items;
    }
    
    /** Misc **/

    /**
     * Read Scale
     * GET /apis/apps/v1/namespaces/{namespace}/replicasets/{name}/scale
     * 
     * @param namespace 
     * @param name
     */
    static readReplicaSetScale = async (namespace, name) => {
        const replicasetsList = await this.get(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}/scale`);
        return replicasetsList.items;
    }

    /**
     * Replace Scale
     * PUT /apis/apps/v1/namespaces/{namespace}/replicasets/{name}/scale
     * 
     * @param namespace 
     * @param name
     * @body Scale
     */
    static listreplaceReplicaSetScaleAllReplicaSet = async (namespace, name, body) => {
        const replicasetsList = await this.get(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}/scale`, body);
        return replicasetsList.items;
    }
    
    /**
     * Patch Scale
     * PATCH /apis/apps/v1/namespaces/{namespace}/replicasets/{name}/scale
     * 
     * @param namespace 
     * @param name
     * @body Patch
     */
    static patchReplicaSetScale = async (namespace, name, body) => {
        const replicasetsList = await this.get(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}/scale`, body);
        return replicasetsList.items;
    }

}
export default ReplicasetApi;