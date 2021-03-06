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
        const replicaSet = await CommonAPI.post(`/apis/apps/v1/namespaces/${namespace}/replicasets`, body);
        return replicaSet;
    }

    /**
     * Patch
     * PATCH /apis/apps/v1/namespaces/{namespace}/replicasets/{name}
     * 
     * @param namespace
     * @param name 
     * @body Patch
     */
    static patchReplicaSet = async (namespace, name, body) => {
        const replicaSet = await CommonAPI.patch(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
        return replicaSet;
    }

    /**
     * Replace
     * PUT /apis/apps/v1/namespaces/{namespace}/replicasets/{name}
     * 
     * @param namespace
     * @param name 
     * @body ReplicaSet
     */
    static replaceReplicaSet = async (namespace, name, body) => {
        const replicaSet = await CommonAPI.put(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
        return replicaSet;
    }

    /**
     * Delete
     * DELETE /apis/apps/v1/namespaces/{namespace}/replicasets/{name}
     * 
     * @param namespace
     * @param name 
     * @body DeleteOptions
     */
    static deleteReplicaSet = async (namespace, name, body) => {
        const status = await CommonAPI.delete(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}`, body);
        return status;
    }

    /**
     * Delete Collection
     * DELETE /apis/apps/v1/namespaces/{namespace}/replicasets
     * 
     * @param namespace 
     * @body DeleteOptions
     */
    static deleteReplicaSetCollection = async (namespace, body) => {
        const status = await CommonAPI.delete(`/apis/apps/v1/namespaces/${namespace}/replicasets`, body);
        return status;
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
        const replicaSet = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}`);
        return replicaSet;
    }

    /**
     * List
     * GET /apis/apps/v1/namespaces/{namespace}/replicasets
     * 
     * @param namespace 
     */
    static listReplicaSet = async (namespace) => {
        const replicaSetList = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets`);
        return replicaSetList.items;
    }

    /**
     * List All Namespaces
     * GET /apis/apps/v1/replicasets
     */
    static listAllReplicaSet = async () => {
        const replicaSetList = await CommonAPI.get(`/apis/apps/v1/replicasets`);
        return replicaSetList.items;
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
        const replicaSet = await CommonAPI.patch(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/status`, body);
        return replicaSet;
    }

    /**
     * Read Status
     * GET /apis/apps/v1/namespaces/{namespace}/replicasets/{name}/status
     * 
     * @param namespace 
     * @param name
    */
    static readReplicaSetStatus = async (namespace, name) => {
        const replicaSet = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/status`);
        return replicaSet;
    }

    /**
     * Replace Status
     * PUT /apis/apps/v1/namespaces/{namespace}/replicasets/{name}/status
     * 
     * @param namespace 
     * @param name
     * @body ReplicaSet
     */
    static replaceReplicaSetStatus = async (namespace, name, body) => {
        const replicaSet = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/status`, body);
        return replicaSet;
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
        const scale = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/scale`);
        return scale;
    }

    /**
     * Replace Scale
     * PUT /apis/apps/v1/namespaces/{namespace}/replicasets/{name}/scale
     * 
     * @param namespace 
     * @param name
     * @body Scale
     */
    static replaceReplicaSetScale = async (namespace, name, body) => {
        const scale = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/scale`, body);
        return scale;
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
        const scale = await CommonAPI.get(`/apis/apps/v1/namespaces/${namespace}/replicasets/${name}/scale`, body);
        return scale;
    }

}
export default ReplicasetApi;