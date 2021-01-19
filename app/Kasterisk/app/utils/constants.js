import * as SecureStore from 'expo-secure-store';

export const IOS_CLIENT_ID = "447181180888-bou5e3olte901t7srk0e1mv3c413g0lt.apps.googleusercontent.com";
export const ANDROID_CLIENT_ID = "447181180888-ker4pf1d0d16u3d8pnek049q3kdpu07k.apps.googleusercontent.com";
export const WEB_CLIENT_ID = "447181180888-u710h5qo7vde690vk9t2j2rrlmiq094n.apps.googleusercontent.com";
export const WEB_CLIENT_SECRET = "zPT9I0zE2E5pNlpLW_-at593";

export const AZURE_CLIENT_ID = '047ad4bd-b216-4efd-9f44-6093ec72eef6';
export const AZURE_TENANT_ID = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a';
export const AZURE_CLIENT_SECRET = 'K0Hsw1-jnPb5iQ7~5S9V.q3zID7fg5~.lB';
export const AZURE_DOMAIN_HINT = '';

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