import React, { Component, useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, Dimensions } from "react-native";
import * as Google from "expo-google-app-auth";
// import * as Linking from "expo-linking";
import Button from "../components/Button";
import { landscapeStyles, portraitStyles } from "../styles.js";

const onPress = () => {
  // alert(this.getOrientation());
};

// const prefix = Linking.makeUrl("/");
// Expo client: "exp://127.0.0.1:19002"
// Standalone: "kasterisk://"

const IOS_CLIENT_ID =
  "587877229134-8gdl14qhb0oq1bqtfoh1lr8nrbnfi8m4.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "587877229134-budjhfr2o2trslj0jrk4llflflm8lca0.apps.googleusercontent.com";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: ''
    };
    Dimensions.addEventListener("change", (e) => {
      this.setState(e.window);
  });
  }
  
  getOrientation() {
    if (Dimensions.get('window').width > Dimensions.get('window').height) {
      return 'LANDSCAPE';
    } else {
      return 'PORTRAIT';
    }
  }

  getStyle() {
    if (this.getOrientation() === 'LANDSCAPE') {
      return landscapeStyles;
    } else {
      return portraitStyles;
    }
  }
  onLayout() {
    this.setState({ orientation: this.getOrientation()});
  }
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("WelcomeScreen.js.js 21 | ", result.user.givenName, result.idToken);
        this.props.navigation.navigate("HomeScreen", {
          idToken: result.idToken
        }); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('WelcomeScreen.js.js 30 | Error with login', e);
      return { error: true };
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={this.getStyle().container}>
        <View style={this.getStyle().leftContainer}>
          <ImageBackground
            style={this.getStyle().container}
            source={require("../assets/welcome-bg-landscape.png")}
            imageStyle={{ resizeMode: "cover" }}
          />
          <Image
            style={this.getStyle().logo_kasterisk}
            source={require('../assets/logo_kasterisk.png')}
          />
          <Text style={this.getStyle().logo_kasterisk_text}>Access, manage and monitor your Kubernetes clusters.</Text>
        </View>

        <View style={this.getStyle().rightContainer}>
          <View style={this.getStyle().buttonContainer}>
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <Button
                image={require("../assets/welcome-button-google.png")}
                text="Log in With Google"
                onPress={this.signInWithGoogle}
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
              <View style={landscapeStyles.lineStyle} />
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
}


// export default function WelcomeScreen({ navigation }) {
//   let [authState, setAuthState] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let cachedAuth = await getCachedAuthAsync();
//       if (cachedAuth && !authState) {
//         setAuthState(cachedAuth);
//       }
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftContainer}>
//         <ImageBackground
//           style={styles.container}
//           source={require("../assets/welcome-title-landscape.png")}
//           imageStyle={{ resizeMode: "cover" }}
//         />
//       </View>

//       <View style={styles.rightContainer}>
//         <View style={styles.buttonContainer}>
//           <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//           >
//             <Button
//               image={require("../assets/welcome-button-google.png")}
//               text="Log in With Google"
//               onPress={async () => {
//                 const _authState = await googleSignInAsync();
//                 setAuthState(_authState);
//               }}
//             />
//             <Button
//               image={require("../assets/welcome-button-aws.png")}
//               text="Log in With Amazon"
//               onPress={() =>
//                 navigation.navigate("AWS Login")
//               }
//             />
//             <Button
//               image={require("../assets/welcome-button-azure.png")}
//               text="Log in With Azure AD"
//               onPress={onPress}
//             />
//             <View style={styles.lineStyle} />
//             <Button
//               image={require("../assets/welcome-button-kube.png")}
//               text="Upload Kubeconfig File"
//               onPress={() =>
//                 navigation.navigate("KubeconfigUpload")
//               }
//             />
//             <Button
//               image={require("../assets/welcome-button-kube.png")}
//               text="Add Kubeconfig Content"
//               onPress={() =>
//                 navigation.navigate("KubeconfigContent")
//               }
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }


// let googleConfig = {
//     issuer: "https://accounts.google.com",
//     scopes: ["openid", "profile", "email"],
//     //redirectUrl: "https://auth.expo.io",
//     clientId:
//         "587877229134-8gdl14qhb0oq1bqtfoh1lr8nrbnfi8m4.apps.googleusercontent.com",
// };

// let StorageKey = "@Kasterisk:CustomGoogleOAuthKey";

// export async function googleSignInAsync() {
//     // try {
//     //     let authState = await AppAuth.authAsync(googleConfig);
//     // } catch ({ message }) {
//     //     alert(message)
//     // }
//     let authState = await AppAuth.authAsync(googleConfig);
//     console.log("test");
//     await cacheAuthAsync(authState);
//     console.log("googleSignInAsync", authState);
//     return authState;
// }

// async function cacheAuthAsync(authState) {
//     return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
// }

// export async function getCachedAuthAsync() {
//     let value = await AsyncStorage.getItem(StorageKey);
//     let authState = JSON.parse(value);
//     console.log("getCachedAuthAsync", authState);
//     if (authState) {
//         if (checkIfTokenExpired(authState)) {
//         return refreshAuthAsync(authState);
//         } else {
//         return authState;
//         }
//     }
//     return null;
// }

// function checkIfTokenExpired({ accessTokenExpirationDate }) {
//     return new Date(accessTokenExpirationDate) < new Date();
// }

// async function refreshAuthAsync({ refreshToken }) {
//     let authState = await AppAuth.refreshAsync(config, refreshToken);
//     console.log("refreshAuth", authState);
//     await cacheAuthAsync(authState);
//     return authState;
// }

// export async function signOutAsync({ accessToken }) {
//   try {
//         await AppAuth.revokeAsync(config, {
//         token: accessToken,
//         isClientIdProvided: true,
//         });
//         await AsyncStorage.removeItem(StorageKey);
//         return null;
//     } catch (e) {
//         alert(`Failed to revoke token: ${e.message}`);
//     }
// }
