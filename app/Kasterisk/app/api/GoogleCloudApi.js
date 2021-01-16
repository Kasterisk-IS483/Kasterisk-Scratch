import * as Google from "expo-google-app-auth";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, WEB_CLIENT_ID, WEB_CLIENT_SECRET, 
    ClusterAuthProviderGoogle, saveTemporaryCredentials } from "../utils/constants";

class GoogleCloudApi {

    static checkGoogleCredentials = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID,
                androidClientId: ANDROID_CLIENT_ID,
                scopes: ["profile", "email"],
            });

            if (result.type === "success") {
                console.log("WelcomeScreen.js.js 21 | ", result.user.givenName);

                // set credentials for google after logged in
                ClusterAuthProviderGoogle["accessToken"] = result.accessToken;
                ClusterAuthProviderGoogle["idToken"] = result.idToken;
                ClusterAuthProviderGoogle["refreshToken"] = result.refreshToken;

                // save credentials into localStorage
                saveTemporaryCredentials(
                    "ClusterAuthProviderGoogle",
                    ClusterAuthProviderGoogle
                );

                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log("WelcomeScreen.js.js 30 | Error with login", e);
            return { error: true };
        }
    };

    static refreshAccessToken = async refreshToken => {
        const url = 'https://oauth2.googleapis.com/token?' +
          `client_id=${WEB_CLIENT_ID}&` +
          `client_secret=${WEB_CLIENT_SECRET}&` +
          `refresh_token=${refreshToken}&` +
          'grant_type=refresh_token';
    
        const newAccessToken = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(res => res.json());
    
        return newAccessToken.access_token;
    };

    static gcpFetch = async ({ url, method = 'get', body, refreshToken }) => {
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
            : 'https://cloudresourcemanager.googleapis.com/v1/projects?pageSize=50';

        try {
            const projects = await this.gcpFetch({ url, refreshToken });
            if (projects.error) {
                return alert(projects.error.message);
            }
            return projects;
        } catch (err) {
            Promise.reject(err);
        }
    }

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
    }

    static fetchGkeClusters = async ({ projectId, zone = '-', refreshToken }) => {
        try {
            const url = `https://container.googleapis.com/v1/projects/${projectId}/locations/${zone}/clusters`;
            const clusters = await this.gcpFetch({ url, refreshToken });
            if (!clusters.clusters) { return []; }
            const clusterList = clusters.clusters.map(cluster => {
            return {
                url: cluster.endpoint,
                name: cluster.name,
                status: cluster.status,
                createdAt: cluster.createTime,
                cloudProvider: 'gcp',
                namespaces: [],
            };
            });
            if (clusters.error) {
                return alert(clusters.error.message);
            }
            return clusterList;
        } catch (err) {
            return Promise.reject(err);
        }
    }

}

export default GoogleCloudApi;