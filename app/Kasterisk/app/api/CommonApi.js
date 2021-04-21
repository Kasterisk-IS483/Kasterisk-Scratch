import React, { Component } from "react";
import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwsApi from "./AwsApi";
import GoogleCloudApi from "./GoogleCloudApi";

class CommonAPI extends Component {
  static apiFetch = async ({ apiUrl, method, body = "", parameters, text }) => {

    let defaultCluster = await AsyncStorage.getItem('@defaultCluster');
    if (defaultCluster == null) {
      throw new Error("Default cluster not found");
    }
    let mergeData = await AsyncStorage.getItem(defaultCluster);

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
      token = AwsApi.getAuthToken(clusterData.name, userData.user.awsCredentials, userData.user.region);
    } else if (authType == "token") {
      token = userData.user.token;
    } else if (authType == "google") {
      token = await GoogleCloudApi.refreshAccessToken(userData.user.gcpCredentials);
    }

    let baseUrl = clusterData.cluster.server.replace(/^"+|"+$/gm, "");

    let callUrl = `${baseUrl}${apiUrl}`;

    if (parameters != undefined) {
      callUrl += "?";
      Object.keys(parameters).forEach(function (key) {
        callUrl += key + "=" + parameters[key] + "&";
      });
      callUrl = callUrl.slice(0, -1);
    }

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
        let data;
        if (text == "text") {
          data = response.text();
        }
        else { data = response.json(); }
        return data;
      })
      .catch((error) => {
        console.error(error);
        return { name: "network error", description: error };
      });
  };

  static get(apiUrl, parameters, text, body = "") {
    return this.apiFetch({ method: "GET", apiUrl, body, parameters, text });
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
