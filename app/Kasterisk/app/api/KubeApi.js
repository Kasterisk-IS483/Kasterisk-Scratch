import { LexRuntime } from "aws-sdk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";
import { Alert } from "react-native";

export async function checkServerStatus() {
    let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
    if (defaultCluster == null) {
        throw new Error("Default cluster not assigned");
    }
    let mergeData = await AsyncStorage.getItem(defaultCluster);
    if (mergeData == null) {
        throw new Error("Default cluster not found");
    }
    mergeData = JSON.parse(mergeData);
    let clusterData, userData;
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

    Alert.alert("asd", JSON.stringify(clusterData));
    let serverUrl =
        clusterData.cluster.server.replace(/^"+|"+$/gm, "") + "/livez";
    const response = await RNFetchBlob.config({
        trusty: clusterData.cluster.insecureSkipTLSVerify
            ? clusterData.cluster.insecureSkipTLSVerify
            : true,
    }).fetch("GET", serverUrl, {
        certificateAuthorityData: clusterData.cluster.certificateAuthorityData
            ? clusterData.cluster.certificateAuthorityData
            : "",
        clientCertificateData: userData.user.clientCertificateData
            ? userData.user.clientCertificateData
            : "",
        clientKeyData: userData.user.clientKeyData
            ? userData.user.clientKeyData
            : "",
        username: userData.user.username ? userData.user.username : "",
        password: userData.user.password ? userData.user.password : "",
        token: userData.user.token ? userData.user.token : "",
        Authorization: userData.user["id-token"]
            ? "Bearer " + userData.user["id-token"]
            : "",
    });
    return response.json();
}
