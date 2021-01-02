import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
// import * as Linking from 'expo-linking';
import * as AppAuth from "expo-app-auth";
import Button from "../../src/components/Button";

const onPress = () => {
  alert("clicked");
};

// const prefix = Linking.makeUrl("/");
// Expo client: 'exp://127.0.0.1:19002'
// Standalone: 'kasterisk://'

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
          source={require("../assets/login-title.png")}
          imageStyle={{ resizeMode: "cover" }}
        />
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.buttonContainer}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Button
              image={require("../assets/login-button-google.png")}
              text="Log in With Google"
              onPress={async () => {
                const _authState = await googleSignInAsync();
                setAuthState(_authState);
              }}
            />
            <Button
              image={require("../assets/login-button-aws.png")}
              text="Log in With Amazon"
              onPress={onPress}
            />
            <Button
              image={require("../assets/login-button-azure.png")}
              text="Log in With Azure AD"
              onPress={onPress}
            />
            <View style={styles.lineStyle} />
            <Button
              image={require("../assets/login-button-kube.png")}
              text="Upload Kubeconfig File"
              onPress={() =>
                navigation.navigate('KubeconfigUpload')
              }
            />
            <Button
              image={require("../assets/login-button-kube.png")}
              text="Add Kubeconfig Content"
              onPress={() =>
                navigation.navigate('KubeconfigContent')
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1.5,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: "#265395",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    width: 200,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "#FFFFFF",
    width: "90%",
    margin: 10,
  },
});

let googleConfig = {
    issuer: "https://accounts.google.com",
    scopes: ["openid", "profile", "email"],
    redirectUrl: "https://auth.expo.io",
    clientId:
        "587877229134-s4buqm9o9oinls1j1it4uiidug7ba7n9.apps.googleusercontent.com",
};

let StorageKey = "@Kasterisk:CustomGoogleOAuthKey";

export async function googleSignInAsync() {
    try {
        let authState = await AppAuth.authAsync(googleConfig);
    } catch ({ message }) {
        alert(message)
    }
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
