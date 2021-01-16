export const IOS_CLIENT_ID = "447181180888-bou5e3olte901t7srk0e1mv3c413g0lt.apps.googleusercontent.com";
export const ANDROID_CLIENT_ID = "447181180888-ker4pf1d0d16u3d8pnek049q3kdpu07k.apps.googleusercontent.com";

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