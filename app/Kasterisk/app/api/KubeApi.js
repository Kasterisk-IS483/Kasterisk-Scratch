import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";
import { Alert } from "react-native";
import AwsApi from './AwsApi';

export async function checkServerStatus() {
    let defaultContext = await AsyncStorage.getItem("@defaultContext");
    if (defaultContext == null) {
        throw new Error("Default cluster not assigned");
    }
    let mergeData = await AsyncStorage.getItem(defaultContext);
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
    let awsToken;
    if (authType == "aws") {
        awsToken = AwsApi.getAuthToken(clusterData.name, userData.awsCredentials)
    }

    Alert.alert("asd", JSON.stringify(userData));
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
