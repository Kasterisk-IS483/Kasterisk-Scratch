import React, { Component } from "react";

import CommonAPI from "./CommonApi.js";
class ReplicasetApi extends Component {

    /** Write **/

    /**
     * Create
     * POST /apis/apps/v1/namespaces/{namespace}/replicasets
     * 
     * @param namespace 
     * @body ReplicaSet
     */
    static createReplicaSet = async (namespace, body) => {
        const replicasetsList = await CommonAPI.post(`/apis/apps/v1/namespaces/${namespace}/replicasets`, body);
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
        const replicasetsList = await CommonAPI.patch(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
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
        const replicasetsList = await CommonAPI.put(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
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
        const replicasetsList = await CommonAPI.delete(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
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
        const replicasetsList = await CommonAPI.delete(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
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
        const replicasetsList = await CommonAPI.get(`apis/apps/v1/namespaces/${namespace}/replicasets/${name}`);
        return replicasetsList.items;
    }

    /**
     * List
     * GET /apis/apps/v1/namespaces/{namespace}/replicasets
     * 
     * @param namespace 
     */
    static listReplicaSet = async (namespace) => {
        const replicasetsList = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets`);
        return replicasetsList.items;
    }

    /**
     * List All Namespaces
     * GET /apis/apps/v1/replicasets
     */
    static listAllReplicaSet = async () => {
        const replicasetsList = await CommonAPI.get(`/apis/apps/v1/replicasets`);
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
        const replicasetsList = await CommonAPI.patch(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/status`, body);
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
        const replicasetsList = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/status`);
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
        const replicasetsList = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/status`, body);
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
        const replicasetsList = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/scale`);
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
        const replicasetsList = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/scale`, body);
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
        const replicasetsList = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/scale`, body);
        return replicasetsList.items;
    }

}
export default ReplicasetApi;