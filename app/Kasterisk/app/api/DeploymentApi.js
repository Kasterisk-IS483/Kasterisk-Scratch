import RNFetchBlob from "react-native-fetch-blob";

import React, { Component } from "react";
class DeploymentApi extends Component {


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
    static apiFetch = async ({ apiUrl, method = 'get', body }) => {

        //state = { credentials: [] };
        try {
            let url = "https://small-test.run.haas-242.pez.pivotal.io:8443" + `${apiUrl}`;

            //let url = "https://10.0.2.2:32768" + `${apiUrl}`;
            // const requestOptions = {
            //     method: 'GET',
            //     headers: {
            //         'client-certificate': this.state.credentials["client-certificate-data"],
            //         'client-key': this.state.credentials["client-key-data"]
            //     },
            // };

            const response = await RNFetchBlob.config({
                trusty: true,
            }).fetch("GET", url,
                {
                    Authorization:
                    "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL3Rva2VuX2tleXMiLCJraWQiOiJrZXktMSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkOWRiZmFmZDlhMzE0N2Q4YTdlM2Q1YWFlNGNmYTQ0Ni1yIiwic3ViIjoiZTM5NzZjOTQtNjBjMC00OWI1LWJhMzYtYTJlNzFmZmVkYjk5IiwiaWF0IjoxNjExNDY1NjA1LCJleHAiOjE2MTE0ODcyMDUsImNpZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImNsaWVudF9pZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImlzcyI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbIm9wZW5pZCIsInBrc19jbHVzdGVyX2NsaWVudCJdLCJncmFudGVkX3Njb3BlcyI6WyJvcGVuaWQiLCJyb2xlcyJdLCJhbXIiOlsicHdkIl0sImF1dGhfdGltZSI6MTYxMTQ2NTYwNSwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwidXNlcl9uYW1lIjoic211LWZ5cCIsIm9yaWdpbiI6InVhYSIsInVzZXJfaWQiOiJlMzk3NmM5NC02MGMwLTQ5YjUtYmEzNi1hMmU3MWZmZWRiOTkiLCJyZXZfc2lnIjoiYzJjY2U0OGQifQ.ghTzbW-NWv-wj7vMD5uq_luTAIJ8tdekp45U4ez0RlmgcLSeSOMUbKfj43f--BrbycE1pLNUMSNZ301OdFB0nfjhOWZ0P9qxuZaNAZOniD80Snk7g5mAyBHO1RRAkBiQzyn7QD0OctMEcLw0VeJ_xHGdy4bMnG4BYlMvh3pmpEilwvg1cHDfGr1wKJdDCLUrNclQGtcEiUHTYpLD55f-1zvi2R2Rbedwt8OULjhFoC_A_GECJ2cACQXqLRk7FWHAfWNq7ZQRPMdAW8mWMBsXtIUCBzs7ptfdsjYB86jnPezuz6HXzrMMTZwyC6nrSM0kWGqPqgVdgzfDnz9WC_td2A",
                    insecureSkipTLSVerify: false
                }
            );
            return response.json();

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
        const DeploymentsList = await this.get(`/apis/apps/v1/deployments`);
        return DeploymentsList.items;
    }


}
export default DeploymentApi;