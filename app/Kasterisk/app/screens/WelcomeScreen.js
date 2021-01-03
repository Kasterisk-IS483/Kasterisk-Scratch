import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
// import * as Linking from "expo-linking";
import * as AppAuth from "expo-app-auth";
import Button from "../components/Button";
import styles from "../styles.js";

const onPress = () => {
  alert("clicked");
};

// const prefix = Linking.makeUrl("/");
// Expo client: "exp://127.0.0.1:19002"
// Standalone: "kasterisk://"

export default function WelcomeScreen({ navigation }) {
  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <ImageBackground
          style={styles.container}
          source={require("../assets/welcome-title-landscape.png")}
          imageStyle={{ resizeMode: "cover" }}
        />
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.buttonContainer}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Button
              image={require("../assets/welcome-button-google.png")}
              text="Log in With Google"
              onPress={async () => {
                const _authState = await googleSignInAsync();
                setAuthState(_authState);
              }}
            />
            <Button
              image={require("../assets/welcome-button-aws.png")}
              text="Log in With Amazon"
              onPress={() =>
                navigation.navigate("AWS Login")
              }
            />
            <Button
              image={require("../assets/welcome-button-azure.png")}
              text="Log in With Azure AD"
              onPress={onPress}
            />
            <View style={styles.lineStyle} />
            <Button
              image={require("../assets/welcome-button-kube.png")}
              text="Upload Kubeconfig File"
              onPress={() =>
                navigation.navigate("KubeconfigUpload")
              }
            />
            <Button
              image={require("../assets/welcome-button-kube.png")}
              text="Add Kubeconfig Content"
              onPress={() =>
                navigation.navigate("KubeconfigContent")
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}


let googleConfig = {
    issuer: "https://accounts.google.com",
    scopes: ["openid", "profile", "email"],
    //redirectUrl: "https://auth.expo.io",
    clientId:
        "587877229134-8gdl14qhb0oq1bqtfoh1lr8nrbnfi8m4.apps.googleusercontent.com",
};

let StorageKey = "@Kasterisk:CustomGoogleOAuthKey";

export async function googleSignInAsync() {
    // try {
    //     let authState = await AppAuth.authAsync(googleConfig);
    // } catch ({ message }) {
    //     alert(message)
    // }
    let authState = await AppAuth.authAsync(googleConfig);
    console.log("test");
    await cacheAuthAsync(authState);
    console.log("googleSignInAsync", authState);
    return authState;
}

async function cacheAuthAsync(authState) {
    return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
    let value = await AsyncStorage.getItem(StorageKey);
    let authState = JSON.parse(value);
    console.log("getCachedAuthAsync", authState);
    if (authState) {
        if (checkIfTokenExpired(authState)) {
        return refreshAuthAsync(authState);
        } else {
        return authState;
        }
    }
    return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    console.log("refreshAuth", authState);
    await cacheAuthAsync(authState);
    return authState;
}

export async function signOutAsync({ accessToken }) {
  try {
        await AppAuth.revokeAsync(config, {
        token: accessToken,
        isClientIdProvided: true,
        });
        await AsyncStorage.removeItem(StorageKey);
        return null;
    } catch (e) {
        alert(`Failed to revoke token: ${e.message}`);
    }
}
