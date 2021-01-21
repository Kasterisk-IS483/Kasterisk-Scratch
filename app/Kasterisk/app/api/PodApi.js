import RNFetchBlob from "react-native-fetch-blob";

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
                        "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL3Rva2VuX2tleXMiLCJraWQiOiJrZXktMSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNDdkYmE2MjM1MjQ0YjFkOGY1ZjEyMjIwMmFjNjZkMS1yIiwic3ViIjoiZTM5NzZjOTQtNjBjMC00OWI1LWJhMzYtYTJlNzFmZmVkYjk5IiwiaWF0IjoxNjExMjQwOTk2LCJleHAiOjE2MTEyNjI1OTYsImNpZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImNsaWVudF9pZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImlzcyI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbIm9wZW5pZCIsInBrc19jbHVzdGVyX2NsaWVudCJdLCJncmFudGVkX3Njb3BlcyI6WyJvcGVuaWQiLCJyb2xlcyJdLCJhbXIiOlsicHdkIl0sImF1dGhfdGltZSI6MTYxMTI0MDk5NiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwidXNlcl9uYW1lIjoic211LWZ5cCIsIm9yaWdpbiI6InVhYSIsInVzZXJfaWQiOiJlMzk3NmM5NC02MGMwLTQ5YjUtYmEzNi1hMmU3MWZmZWRiOTkiLCJyZXZfc2lnIjoiYzJjY2U0OGQifQ.z4HpRFLQ2Ppd-CYuctB_QjNtf1sl2U4xqylK1o5ZwcvLnXAHCS0nXtZxA-Ka3EZ2QAuA7FM7jmAj1QeRxpafZFB-eRHzOk4FP_pYQuNEK6-T89RQQOPyow206WfbxOK3TbbOGWmEUKsetqKQbYNsneDxPRhbqjq1aDdtnB89pgmh_ciXRIh8cEJAbF8RzTX7LE1Mkl9_gjbRXAkzmF-gslACDa-HLgIHIOqRRU3YgvSw-sn6slBLL3beyutS1D3ywpF_1DKJ1FC4-iKpkkSU4idM3hxOGtYco8U6hmDv2RJvjxD3OU4jWLtMEEzWzxPA9igjEJHZFgH3sw-lARXTlg",
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
        const podsList = await this.get(`/api/v1/pods`);
        return podsList.items;
    }


}
export default PodApi;