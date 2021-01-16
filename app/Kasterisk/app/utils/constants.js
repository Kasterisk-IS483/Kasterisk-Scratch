import * as SecureStore from 'expo-secure-store';

export const IOS_CLIENT_ID = "447181180888-bou5e3olte901t7srk0e1mv3c413g0lt.apps.googleusercontent.com";
export const ANDROID_CLIENT_ID = "447181180888-ker4pf1d0d16u3d8pnek049q3kdpu07k.apps.googleusercontent.com";
export const WEB_CLIENT_ID = "447181180888-u710h5qo7vde690vk9t2j2rrlmiq094n.apps.googleusercontent.com";
export const WEB_CLIENT_SECRET = "zPT9I0zE2E5pNlpLW_-at593";

export var ClusterAuthProviderGoogle = {
    accessToken: "",
    expires: 0,
    idToken: "",
    refreshToken: "",
};

export const saveTemporaryCredentials = async(toSave, credentials) => {
    try {
      await SecureStore.setItemAsync(toSave, JSON.stringify(credentials));
    } catch (e) {
      console.log(e)
    }
}