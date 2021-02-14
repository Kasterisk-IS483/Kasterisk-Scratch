import React, { Component } from "react";
import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { urlOptions } from "../utils/constants.js";

class CommonAPI extends Component {
  static apiFetch = async ({ apiUrl, method, body = "" }) => {

    let mergeData = await AsyncStorage.getItem('@defaultCluster');
    if (mergeData == null) {
      throw new Error("Default cluster not found");
    }
    mergeData = JSON.parse(mergeData);
    let clusterData, userData, authType;
    try {
      clusterData = mergeData["clusterData"];
    } catch (err) {
      throw new Error("Error retrieving cluster info");
    }
    try {
      userData = mergeData["userData"];
    } catch (err) {
      throw new Error("Error retrieving user info");
    }
    try {
      authType = mergeData["authType"];
    } catch (err) {
      throw new Error("Error retrieving auth type");
    }
    let token;
    if (authType == "aws") {
      token = AwsApi.getAuthToken(clusterData.name, userData.awsCredentials);
    } else if (authType == "token") {
      token = "Bearer ".concat(userData.user.token);
    }

    let baseUrl = clusterData.cluster.server.replace(/^"+|"+$/gm, "");

    let callUrl = `${baseUrl}${apiUrl}`;

    return RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        method,
        callUrl,
        {
          Authorization: `Bearer ${token}`,
          insecureSkipTLSVerify: false,
        },
        body
      )
      .then((response) => {
        const statusCode = response.info().status;
        const data = response.json();
        console.log(data);
        const all = JSON.stringify(response);
        return data;
      })
      .catch((error) => {
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
