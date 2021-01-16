import * as Google from "expo-google-app-auth";
import * as SecureStore from 'expo-secure-store';
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, ClusterAuthProviderGoogle, saveTemporaryCredentials } from "../utils/constants";

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

}

export default GoogleCloudApi;