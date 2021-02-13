import React, { Component } from "react";
import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { urlOptions } from "../utils/constants.js";

class CommonAPI extends Component {
    static apiFetch = async ({ apiUrl, method, body = "" }) => {

        let baseURL = await AsyncStorage.getItem("baseUrl");
        let callUrl = `${baseURL}${`/apis/apps/v1/deployments`}`;
        let token = await AsyncStorage.getItem("token");

        return RNFetchBlob.config({
            trusty: true,
        }).fetch(
            method,
            callUrl,
            {
                Authorization: `Bearer ${token}`,
                insecureSkipTLSVerify: false,
            },
            body
        ).then(response => {
            const statusCode = response.info().status;
            const data = response.json();
            console.log(data);
            const all = JSON.stringify(response)
            return data;
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
