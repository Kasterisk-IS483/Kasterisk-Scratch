// import { RNFetchBlob } from 'rn-fetch-blob';

import React, { Component } from "react";
class PodApi extends Component {


    // API URL Function
    // static apiFetch = async ({ apiUrl, cluster, method = 'get', body }) => {
    //     const { url: endpoint, token } = cluster;

    //     const url = endpoint.indexOf('https') !== -1
    //         ? endpoint
    //         : `https://${endpoint}`;

    //     const authHeader = {
    //         Authorization: `Bearer ${token}`,
    //     };

    //     try {
    //         const res = await RNFetchBlob.config({
    //             trusty: true,
    //         })
    //             .fetch(method, `${url}${apiUrl}`, authHeader, body);
    //         return res.json();
    //     }
    //     catch (err) {
    //         return Promise.reject(err);
    //     }
    // };
    static apiFetch = async ({ apiUrl, method = 'get' }) => {

        state = {credentials : []};
        try {
            const url = "http://127.0.0.1:32768/api/v1" + `${apiUrl}`;
            const requestOptions = {
                method: 'GET',
                headers: {
                    'client-certificate': this.state.credentials["client-certificate-data"],
                    'client-key': this.state.credentials["client-key-data"]
                },
            };

            let response = await fetch(url,requestOptions);
            let json = await response.json();

            return json;

            // const response = await fetch("GET",`${url}${apiUrl}`).then(res => res.json());
            //return response;
        }
        catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    };

    static get(apiUrl) {
        return this.apiFetch({ method: 'get', apiUrl });
    }

    static listAllNamespace = async () => {
        const podsList = await this.get(`/api/v1/pods`);
        return podsList.items;
    }

  }
export default PodApi;