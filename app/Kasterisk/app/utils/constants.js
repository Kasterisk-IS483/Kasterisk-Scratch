import * as SecureStore from 'expo-secure-store';
import { Platform, Linking } from 'react-native';

export const GOOGLE_IOS_CLIENT = "447181180888-bou5e3olte901t7srk0e1mv3c413g0lt"
export const GOOGLE_ANDROID_CLIENT = "447181180888-ker4pf1d0d16u3d8pnek049q3kdpu07k"
export const GOOGLE_IOS_CLIENT_ID = GOOGLE_IOS_CLIENT + ".apps.googleusercontent.com";
export const GOOGLE_ANDROID_CLIENT_ID = GOOGLE_ANDROID_CLIENT + ".apps.googleusercontent.com";
export const GOOGLE_IOS_REDIRECT = "com.googleusercontent.apps." + GOOGLE_IOS_CLIENT + ":/oauth2redirect/google";
export const GOOGLE_ANDROID_REDIRECT = "com.googleusercontent.apps." + GOOGLE_ANDROID_CLIENT +":/oauth2redirect/google";
// export const GOOGLE_ANDROID_REDIRECT = "com.kasterisk.android:/oauth2redirect/google"


export const WEB_CLIENT_ID = "447181180888-u710h5qo7vde690vk9t2j2rrlmiq094n.apps.googleusercontent.com";
export const WEB_CLIENT_SECRET = "zPT9I0zE2E5pNlpLW_-at593";

export const AZURE_CLIENT_ID = '047ad4bd-b216-4efd-9f44-6093ec72eef6';
export const AZURE_TENANT_ID = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a';
export const AZURE_CLIENT_SECRET = 'K0Hsw1-jnPb5iQ7~5S9V.q3zID7fg5~.lB';
export const AZURE_DOMAIN_HINT = '';

export const googleConfig = {
  issuer: 'https://accounts.google.com',
  clientId: Platform.OS === 'ios' ? GOOGLE_IOS_CLIENT_ID : GOOGLE_ANDROID_CLIENT_ID,
  redirectUrl: Platform.OS === 'ios' ? GOOGLE_IOS_REDIRECT : GOOGLE_ANDROID_REDIRECT,
  scopes: ['openid', 'profile', 'https://www.googleapis.com/auth/cloud-platform'],
  additionalParameters: { 'response-type': 'code' },
};



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