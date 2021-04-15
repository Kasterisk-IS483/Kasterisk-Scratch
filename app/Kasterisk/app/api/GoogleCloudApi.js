import { authorize, refresh } from "react-native-app-auth";
import { Alert } from "react-native";
import {
  googleConfig,
  saveCredentials,
} from "../utils/constants";

class GoogleCloudApi {
  static checkGoogleCredentials = async () => {
    try {
      const authState = await authorize(googleConfig);

      let storageString = JSON.stringify({
        accessToken: authState.accessToken,
        tokenExpiry: authState.accessTokenExpirationDate,
        idToken: authState.idToken,
        refreshToken: authState.refreshToken,
        tokenType: authState.tokenType,
      });

      let saveResult = await saveCredentials(
        "@googleCredentials",
        storageString
      );
      if (saveResult) {
        return true;
      }
      return false;
    } catch (e) {
      throw new Error(e);
    }
  };

  static refreshAccessToken = async (refreshToken) => {
    const result = await refresh(googleConfig, {
      refreshToken: refreshToken,
    });
    return result.accessToken;
  };

  static gcpFetch = async ({ url, method = "get", body, refreshToken }) => {
    const accessToken = await this.refreshAccessToken(refreshToken);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await fetch(url, {
      headers,
      method,
      body,
    });

    return res.json();
  };

  static fetchProjects = async ({ pageToken, refreshToken }) => {
    const url = pageToken
      ? `https://cloudresourcemanager.googleapis.com/v1/projects?pageSize=50&pageToken=${pageToken}`
      : "https://cloudresourcemanager.googleapis.com/v1/projects?pageSize=50";

    try {
      const projects = await this.gcpFetch({ url, refreshToken });
      if (projects.error) {
        return alert(projects.error.message);
      }
      return projects;
    } catch (err) {
      Alert.alert("Google Cloud Provider Error", "Please enable your project list.");
      //Promise.reject(err);
    }
  };

  static fetchZones = async ({ projectId, pageToken, refreshToken }) => {
    const url = pageToken
      ? `https://compute.googleapis.com/compute/v1/projects/${projectId}/zones?pageToken=${pageToken}`
      : `https://compute.googleapis.com/compute/v1/projects/${projectId}/zones`;

    try {
      const zones = await this.gcpFetch({ url, refreshToken });
      if (zones.error) {
        return alert(zones.error.message);
      }
      return zones;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  static fetchGkeClusters = async (projectId, refreshToken, zone = "-") => {
    try {
      const url = `https://container.googleapis.com/v1/projects/${projectId}/locations/${zone}/clusters`;
      const clusters = await this.gcpFetch({ url, refreshToken });
      if (!clusters.clusters) {
        return [];
      }
      const clusterList = clusters.clusters.map((cluster) => {
        return {
          url: "https://"+ cluster.endpoint,
          name: cluster.name,
          status: cluster.status,
          createdAt: cluster.createTime,
          cloudProvider: "gcp",
          namespaces: [],
        };
      });
      if (clusters.error) {
        return alert(clusters.error.message);
      }
      return clusterList;
    } catch (err) {
      Alert.alert("Google Cloud Provider Error", "Please enable your Kubernetes Engine API.");
      //return Promise.reject(err);
    }
  };
}

export default GoogleCloudApi;
