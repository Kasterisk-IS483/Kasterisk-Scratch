import React, { Component } from "react";

import CommonAPI from "./CommonApi.js";

class NamespaceApi extends Component {

    /** READ **/

    /**
     * Read Specified Namespace
     * GET /api/v1/namespaces/{name}
     * 
     * @param namespace 
     * @param name 
     */
    static readNamespace = async (name) => {
        const namespace = await CommonAPI.get(`/api/v1/namespaces/${name}`);
        return namespace;
    }

    /**
     * List All Namespaces
     * GET /api/v1/namespaces
     */
    static listAllNamespace = async () => {
        const namespaceList = await CommonAPI.get(`/api/v1/namespaces`);
        return namespaceList.items;
    }

}

export default NamespaceApi;