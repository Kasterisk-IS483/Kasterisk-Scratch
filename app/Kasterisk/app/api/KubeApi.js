import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";
import { Alert } from "react-native";
import AwsApi from "./AwsApi";

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
    let token;
    if (authType == "aws") {
        token = AwsApi.getAuthToken(clusterData.name, userData.awsCredentials);
    } else if (authType == "token") {
        token = "Bearer ".concat(userData.user.token);
    }

    // Alert.alert("asd", JSON.stringify(userData));
    let serverUrl =
        clusterData.cluster.server.replace(/^"+|"+$/gm, "") + "/livez";
        
    return RNFetchBlob.config({
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
        Authorization: token ? token : "",
    }, "")
    .then(response => {
        const statusCode = response.info().status;
        console.log(statusCode);
        console.log(response.data);
        return Promise.all([statusCode, response.data]);
    })
    .catch(error => {
        console.error(error);
        return { name: "network error", description: "API Call Failed" };
    });

}
