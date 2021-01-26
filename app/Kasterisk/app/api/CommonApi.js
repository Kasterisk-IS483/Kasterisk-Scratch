import React, { Component } from "react";
import RNFetchBlob from "react-native-fetch-blob";

import { urlOptions } from "../utils/constants.js";

class CommonAPI extends Component {
    static apiFetch = async ({ apiUrl, method, body = "" }) => {

        let callUrl = `${urlOptions.baseUrl}${apiUrl}`;

        return RNFetchBlob.config({
            trusty: true,
        }).fetch(
            method,
            callUrl,
            {
                Authorization: `Bearer ${urlOptions.refreshToken}`,
                insecureSkipTLSVerify: false,
            },
            body
        ).then(response => {
            const statusCode = response.info().status;
            const data = response.json();
            const all = JSON.stringify(response)
            return Promise.all([statusCode, all]);
        })
        .catch(error => {
            console.error(error);
            return { name: "network error", description: "API Call Failed" };
        });
    };

    static get(apiUrl, body = "") {
        return this.apiFetch({ method: "GET", apiUrl, body });
    }
    static post(apiUrl, body = "") {
        return this.apiFetch({ method: "POST", apiUrl, body });
    }
    static put(apiUrl, body = "") {
        return this.apiFetch({ method: "PUT", apiUrl, body });
    }
    static delete(apiUrl, body = "") {
        return this.apiFetch({ method: "DELETE", apiUrl, body });
    }
    static patch(apiUrl, body = "") {
        return this.apiFetch({ method: "PATCH", apiUrl, body });
    }
}
export default CommonAPI;
