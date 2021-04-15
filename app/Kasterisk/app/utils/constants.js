import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, Text, Alert } from "react-native";
import React from "react";

import LabelButton from "../components/Buttons/LabelButton";
import TooltipOverlay from "../components/Elements/TooltipOverlay";

export const GOOGLE_IOS_CLIENT =
  "447181180888-bou5e3olte901t7srk0e1mv3c413g0lt";
export const GOOGLE_ANDROID_CLIENT =
  "447181180888-ker4pf1d0d16u3d8pnek049q3kdpu07k";
export const GOOGLE_IOS_CLIENT_ID =
  GOOGLE_IOS_CLIENT + ".apps.googleusercontent.com";
export const GOOGLE_ANDROID_CLIENT_ID =
  GOOGLE_ANDROID_CLIENT + ".apps.googleusercontent.com";
export const GOOGLE_IOS_REDIRECT =
  "com.googleusercontent.apps." + GOOGLE_IOS_CLIENT + ":/oauth2redirect/google";
export const GOOGLE_ANDROID_REDIRECT =
  "com.kasterisk.android" + ":/oauth2redirect/google";

export const WEB_CLIENT_ID =
  "447181180888-u710h5qo7vde690vk9t2j2rrlmiq094n.apps.googleusercontent.com";
export const WEB_CLIENT_SECRET = "zPT9I0zE2E5pNlpLW_-at593";

export const AZURE_CLIENT_ID = "519475b0-3c48-4ca5-a318-184e13dd0a77";
export const AZURE_TENANT_ID = "f8cdef31-a31e-4b4a-93e4-5f571e91255a";

export const googleConfig = {
  issuer: "https://accounts.google.com/",
  clientId:
    Platform.OS === "ios" ? GOOGLE_IOS_CLIENT_ID : GOOGLE_ANDROID_CLIENT_ID,
  redirectUrl:
    Platform.OS === "ios" ? GOOGLE_IOS_REDIRECT : GOOGLE_ANDROID_REDIRECT,
  scopes: [
    "openid",
    "email",
    "profile",
    "https://www.googleapis.com/auth/cloud-platform",
  ],
};

export const azureConfig = {
  clientId: AZURE_CLIENT_ID,
  issuer: "https://login.microsoftonline.com/" + AZURE_TENANT_ID + "/v2.0",
  redirectUrl:
    Platform.OS === "ios"
      ? "urn:ietf:wg:oauth:2.0:oob"
      : "com.kasterisk.android://oauth/redirect/",
  scopes: ["openid", "profile", "email", "offline_access", "user.read"],
  additionalParameters: { prompt: "select_account" },
  serviceConfiguration: {
    authorizationEndpoint:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  },
};

export const saveCredentials = async (storageKey, credentials) => {
  try {
    await AsyncStorage.setItem(storageKey, credentials);
    return true;
  } catch (e) {
    return false;
  }
};

export const getLabelButtons = (cols, numToDisplay, isFull) => {
  return Object.keys(cols).map((labelItem, labelIndex) => (
    getIndivLabelButton(cols, labelItem, labelIndex, numToDisplay, isFull)
  ))
};

export const getIndivLabelButton = (cols, labelItem, labelIndex, numToDisplay, isFull) => {
  let countLabel = labelIndex + 1;
  let count = Object.keys(cols).length - numToDisplay;
  if (count > 0 && countLabel == Object.keys(cols).length) {
    return <LabelButton key={labelIndex} displayMore={true} text={count + "+"} />;
  }
  if (countLabel > numToDisplay) {
    return <Text key={labelIndex}></Text>;
  }
  return (
    <TooltipOverlay key={labelIndex} text={labelItem + ":" + cols[labelItem]}>
      <LabelButton full={isFull} text={labelItem + ":" + cols[labelItem]} />
    </TooltipOverlay>
  );
};

/** CALCULATE AGE FOR DEPLOYMENT, POD, REPLICASET **/
export const calculateAge = (creationDT) => {
  creationDT = new Date(creationDT);
  var current = new Date();
  // To calculate the time difference of two dates 
  let differenceInTime = current.getTime() - creationDT.getTime();
  // To calculate the no. of days between two dates 
  let differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
}

export const getAgeText = (ageInput) => {
  let difference = calculateAge(ageInput);
  let age = Math.floor(difference);
  let day = "Days";
  if (age <= 1) day = "Day";
  return age + " " + day;
};

export const checkDefaultCluster = async() => {
  let defaultCluster = await AsyncStorage.getItem("@defaultCluster");
  if (defaultCluster == null) {
    Alert.alert("Error", "Default cluster not found");
    return false;
  }
  return defaultCluster;
}

export const AWSRegions = [
  { label: "US East (Ohio) - us-east-2", value: "us-east-2" },
  { label: "US East (N. Virginia) - us-east-1", value: "us-east-1" },
  { label: "US West (N. California) - us-west-1", value: "us-west-1" },
  { label: "US West (Oregon) - US West (Oregon)", value: "us-west-2" },
  { label: "Africa (Cape Town) - af-south-1", value: "af-south-1" },
  { label: "Asia Pacific (Hong Kong) - ap-east-1", value: "ap-east-1" },
  { label: "Asia Pacific (Mumbai) - ap-south-1", value: "ap-south-1" },
  {
    label: "Asia Pacific (Osaka-Local) - ap-northeast-3",
    value: "ap-northeast-3",
  },
  { label: "Asia Pacific (Seoul) - ap-northeast-2", value: "ap-northeast-2" },
  {
    label: "Asia Pacific (Singapore) - ap-southeast-1",
    value: "ap-southeast-1",
  },
  { label: "Asia Pacific (Sydney) - ap-southeast-2", value: "ap-southeast-2" },
  { label: "Asia Pacific (Tokyo) - ap-northeast-1", value: "ap-northeast-1" },
  { label: "Canada (Central) - ca-central-1", value: "ca-central-1" },
  { label: "China (Beijing) - cn-north-1", value: "cn-north-1" },
  { label: "China (Ningxia) - cn-northwest-1", value: "cn-northwest-1" },
  { label: "Europe (Frankfurt) - eu-central-1", value: "eu-central-1" },
  { label: "Europe (Ireland) - eu-west-1", value: "eu-west-1" },
  { label: "Europe (London) - eu-west-2", value: "eu-west-2" },
  { label: "Europe (Milan) - eu-south-1", value: "eu-south-1" },
  { label: "Europe (Paris) - eu-west-3", value: "eu-west-3" },
  { label: "Europe (Stockholm) - eu-north-1", value: "eu-north-1" },
  { label: "Middle East (Bahrain) - me-south-1", value: "me-south-1" },
  { label: "South America (São Paulo) - sa-east-1", value: "sa-east-1" },
  { label: "AWS GovCloud (US-East) - us-gov-east-1", value: "us-gov-east-1" },
  { label: "AWS GovCloud (US-West) - us-gov-west-1", value: "us-gov-west-1" },
];

export const urlOptions = {
  baseUrl: "https://small-test.run.haas-242.pez.pivotal.io:8443",
  refreshToken:
    "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL3Rva2VuX2tleXMiLCJraWQiOiJrZXktMSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZGE2YjUwYmEyNGE0YTdhYTgwYWU1YmU4NDM1ODMzZS1yIiwic3ViIjoiZTM5NzZjOTQtNjBjMC00OWI1LWJhMzYtYTJlNzFmZmVkYjk5IiwiaWF0IjoxNjExNTQ5ODk2LCJleHAiOjE2MTE1NzE0OTYsImNpZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImNsaWVudF9pZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImlzcyI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbIm9wZW5pZCIsInBrc19jbHVzdGVyX2NsaWVudCJdLCJncmFudGVkX3Njb3BlcyI6WyJvcGVuaWQiLCJyb2xlcyJdLCJhbXIiOlsicHdkIl0sImF1dGhfdGltZSI6MTYxMTU0OTg5NiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwidXNlcl9uYW1lIjoic211LWZ5cCIsIm9yaWdpbiI6InVhYSIsInVzZXJfaWQiOiJlMzk3NmM5NC02MGMwLTQ5YjUtYmEzNi1hMmU3MWZmZWRiOTkiLCJyZXZfc2lnIjoiYzJjY2U0OGQifQ.PiR439qcFTV7S-WV5Ag3slFPcQOH8FFWW8NLS13LAy-eCSyaapn2QBSZ7Cl5LZotP85NaHSRNhpuzYClMM6obouLyZjPFdnEIo2YkyZFVA8gUZRKKwz790mI3SAyXQliJOZjwNy2rO8o_cnmdlR6p73W2LXbUy0i9N3VWdl1U9V3nvduETo5D2UVuZLJlY6_fzgJy0iJpBCaQcyYwmAGoY6GpweqcmofEamF5sDVs-lJvKqB3EJfCZfrDCX6lHzLiVC4ZhXbv9T0F0arlXUURZAPUiw9GJH-43hVjtgz31d62ow2rX72yibdKcxgV9XLL_uwSsVn_evBNEr1RVSXIQ",
};

export const checkClusterIdentifier = async(clusterIdentifier, clusterName, userName, mergeData) => {
  try {
    let check = await AsyncStorage.getItem("@" + clusterIdentifier);
    if (check != null) {
      Alert.alert("Storage Error", "Cluster with name " + clusterName + " belonging to user " + userName + " already exists in storage, skipping.");
      return false;
    }
    await AsyncStorage.setItem("@" + clusterIdentifier, JSON.stringify(mergeData));
    return true;
  } catch (e) {
    Alert.alert("Storage Error", "Failed to save cluster with name " + clusterName + " to storage");
  }
}

export const addToClusterList = async(newClusters) => {
  if (newClusters.length > 0) {
    let storedClusters = await AsyncStorage.getItem("@clusters");
    if (storedClusters != null) {
      let clusterArray = JSON.parse(storedClusters);
      newClusters = newClusters.concat(clusterArray);
    }
    await AsyncStorage.setItem("@clusters", JSON.stringify(newClusters));
  }
}
