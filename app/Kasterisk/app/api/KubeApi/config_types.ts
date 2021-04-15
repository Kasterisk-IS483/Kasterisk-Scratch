import * as _ from "underscore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkClusterIdentifier, addToClusterList } from "../../utils/constants";
import { Alert } from "react-native";

export enum ActionOnInvalid {
  THROW = "throw",
  FILTER = "filter",
}

export interface ConfigOptions {
  onInvalidEntry: ActionOnInvalid;
}

function defaultNewConfigOptions(): ConfigOptions {
  return {
    onInvalidEntry: ActionOnInvalid.THROW,
  };
}

export interface Cluster {
  readonly name: string;
  readonly caData?: string;
  caFile?: string;
  readonly server: string;
  readonly skipTLSVerify: boolean;
}

export function newClusters(a: any, opts?: Partial<ConfigOptions>): Cluster[] {
  const options = Object.assign(defaultNewConfigOptions(), opts || {});

  return _.compact(_.map(a, clusterIterator(options.onInvalidEntry)));
}

export function exportCluster(cluster: Cluster): any {
  return {
    name: cluster.name,
    cluster: {
      server: cluster.server,
      certificateAuthorityData: cluster.caData,
      caFile: cluster.caFile,
      insecureSkipTLSVerify: cluster.skipTLSVerify,
    },
  };
}

function clusterIterator(onInvalidEntry: ActionOnInvalid): _.ListIterator<any, Cluster | null> {
  return (elt: any, i: number, list: _.List<any>): Cluster | null => {
    try {
      if (!elt.name) {
        throw new Error(`clusters[${i}].name is missing`);
      }
      if (!elt.cluster) {
        throw new Error(`clusters[${i}].cluster is missing`);
      }
      if (!elt.cluster.server) {
        throw new Error(`clusters[${i}].cluster.server is missing`);
      }
      if (!elt.cluster["certificate-authority-data"] && (!elt.cluster["insecure-skip-tls-verify"] || elt.cluster["insecure-skip-tls-verify"] === false)) {
        throw new Error(`clusters[${i}].cluster has missing certificate authority data or TLS is set to true`);
      }
      return {
        caData: elt.cluster["certificate-authority-data"],
        caFile: elt.cluster["certificate-authority"],
        name: elt.name,
        server: elt.cluster.server,
        skipTLSVerify: elt.cluster["insecure-skip-tls-verify"] ? elt.cluster["insecure-skip-tls-verify"] : true,
      };
    } catch (err) {
      switch (onInvalidEntry) {
        case ActionOnInvalid.FILTER:
          return null;
        default:
        case ActionOnInvalid.THROW:
          throw err;
      }
    }
  };
}

export interface User {
  readonly name: string;
  readonly certData?: string;
  certFile?: string;
  readonly exec?: any;
  readonly keyData?: string;
  keyFile?: string;
  readonly authProvider?: any;
  readonly token?: string;
  readonly username?: string;
  readonly password?: string;
}

export function newUsers(a: any, opts?: Partial<ConfigOptions>): User[] {
  const options = Object.assign(defaultNewConfigOptions(), opts || {});

  return _.compact(_.map(a, userIterator(options.onInvalidEntry)));
}

export function exportUser(user: User): any {
  return {
    name: user.name,
    user: {
      "auth-provider": user.authProvider,
      clientCertificateData: user.certData,
      "client-certificate": user.certFile,
      exec: user.exec,
      clientKeyData: user.keyData,
      "client-key": user.keyFile,
      token: user.token,
      password: user.password,
      username: user.username,
    },
  };
}

function userIterator(onInvalidEntry: ActionOnInvalid): _.ListIterator<any, User | null> {
  return (elt: any, i: number, list: _.List<any>): User | null => {
    try {
      if (!elt.name) {
        throw new Error(`users[${i}].name is missing`);
      }
      return {
        authProvider: elt.user ? elt.user["auth-provider"] : null,
        certData: elt.user ? elt.user["client-certificate-data"] : null,
        certFile: elt.user ? elt.user["client-certificate"] : null,
        exec: elt.user ? elt.user.exec : null,
        keyData: elt.user ? elt.user["client-key-data"] : null,
        keyFile: elt.user ? elt.user["client-key"] : null,
        name: elt.name,
        token: findToken(elt.user),
        password: elt.user ? elt.user.password : null,
        username: elt.user ? elt.user.username : null,
      };
    } catch (err) {
      switch (onInvalidEntry) {
        case ActionOnInvalid.FILTER:
          return null;
        default:
        case ActionOnInvalid.THROW:
          throw err;
      }
    }
  };
}

function findToken(user: User | undefined): string | undefined {
  if (user) {
    if (user.token) {
      return user.token;
    }
  }
}

export interface Context {
  readonly cluster: string;
  readonly user: string;
  readonly name: string;
  readonly namespace?: string;
}

export function newContexts(a: any, opts?: Partial<ConfigOptions>): Context[] {
  const options = Object.assign(defaultNewConfigOptions(), opts || {});

  return _.compact(_.map(a, contextIterator(options.onInvalidEntry)));
}

export function exportContext(ctx: Context): any {
  return {
    name: ctx.name,
    context: ctx,
  };
}

function contextIterator(onInvalidEntry: ActionOnInvalid): _.ListIterator<any, Context | null> {
  return (elt: any, i: number, list: _.List<any>): Context | null => {
    try {
      if (!elt.name) {
        throw new Error(`contexts[${i}].name is missing`);
      }
      if (!elt.context) {
        throw new Error(`contexts[${i}].context is missing`);
      }
      if (!elt.context.cluster) {
        throw new Error(`contexts[${i}].context.cluster is missing`);
      }
      return {
        cluster: elt.context.cluster,
        name: elt.name,
        user: elt.context.user || undefined,
        namespace: elt.context.namespace || undefined,
      };
    } catch (err) {
      switch (onInvalidEntry) {
        case ActionOnInvalid.FILTER:
          return null;
        default:
        case ActionOnInvalid.THROW:
          throw err;
      }
    }
  };
}

export async function saveKubeconfigFileToLocal(cluster: Cluster[], user: User[], context: Context[]): Promise<void> {
  var newClusters = [];
  for (const aContext of context) {
    let clusterName = aContext.cluster;
    let userName = aContext.user;
    let mergeData, clusterData, userData, authType;
    for (const aCluster of cluster) {
      if (aCluster.name != clusterName) {
        continue;
      }
      
      clusterData = exportCluster(aCluster);
      break;
    }
    for (const aUser of user) {
      if (aUser.name != userName) {
        continue;
      }
      
      userData = exportUser(aUser);
      if (userData.user.clientCertificateData != null) {
        authType = "cert";
      } else if (userData.user.token != null) {
        authType = "token";
      } else {
        authType = "username";
      }
      break;
    }
    let clusterIdentifier = clusterName + "::" + userName + "::kubernetes";
    mergeData = {
      clusterIdentifier: clusterIdentifier,
      clusterData: clusterData,
      userData: userData,
      authType: authType,
      serviceProvider: "kubernetes",
    };
    let result = await checkClusterIdentifier(clusterIdentifier, clusterName, userName, mergeData);
    if (result){
      newClusters.push(clusterIdentifier);
    }
  }
  await addToClusterList(newClusters);
}

export async function saveKubeconfigContentToLocal(clusterData: Cluster, userData: User, authType: string): Promise<void> {
  var newClusters = [];
  let clusterIdentifier = clusterData.name + "::" + userData.name + "::kubernetes";
  let mergeData = {
    clusterIdentifier: clusterIdentifier,
    clusterData: clusterData,
    userData: userData,
    authType: authType,
    serviceProvider: "kubernetes",
  };
  
  try {
    let check = await AsyncStorage.getItem("@" + clusterIdentifier);
    if (check != null) {
      throw new Error( "Cluster with name " + clusterData.name + " belonging to user " + userData.name + " already exists in storage.");
    }
    await AsyncStorage.setItem("@" + clusterIdentifier, JSON.stringify(mergeData));
    newClusters.push(clusterIdentifier);
  } catch (e) {
    Alert.alert("Storage Error", "Failed to save cluster with name " + clusterData.name + " to storage");
  }
  if (newClusters.length > 0) {
    let storedClusters = await AsyncStorage.getItem("@clusters");
    if (storedClusters != null) {
      let clusterArray = JSON.parse(storedClusters);
      newClusters = newClusters.concat(clusterArray);
    }
    await AsyncStorage.setItem("@clusters", JSON.stringify(newClusters));
  }
}

// export async function saveURLToken(): Promise<void> {
//     let clusters = JSON.parse(
//         (await AsyncStorage.getItem("@clusters")) || "{}"
//     );
//     let firstCluster = JSON.parse(
//         (await AsyncStorage.getItem(clusters[0])) || "{}"
//     );
//     let url = firstCluster["cluster"]["server"];

//     let users = JSON.parse((await AsyncStorage.getItem("@users")) || "{}");
//     let firstUser = JSON.parse((await AsyncStorage.getItem(users[0])) || "{}");
//     let refreshToken =
//         firstUser["user"]["auth-provider"]["config"]["refresh-token"];

//     await Promise.all([
//         saveCredentials("baseURL", url),
//         saveCredentials("refreshToken", refreshToken),
//     ]);
// }
