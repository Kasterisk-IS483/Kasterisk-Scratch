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
};

export const urlOptions = {
  baseUrl: "https://small-test.run.haas-242.pez.pivotal.io:8443",
  refreshToken: "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL3Rva2VuX2tleXMiLCJraWQiOiJrZXktMSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZTFlYmY5Y2VmMDc0MjI2ODc1YjNjZmIxOWM4MjA4Ny1yIiwic3ViIjoiZTM5NzZjOTQtNjBjMC00OWI1LWJhMzYtYTJlNzFmZmVkYjk5IiwiaWF0IjoxNjExNDYwMDE1LCJleHAiOjE2MTE0ODE2MTUsImNpZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImNsaWVudF9pZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImlzcyI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbIm9wZW5pZCIsInBrc19jbHVzdGVyX2NsaWVudCJdLCJncmFudGVkX3Njb3BlcyI6WyJvcGVuaWQiLCJyb2xlcyJdLCJhbXIiOlsicHdkIl0sImF1dGhfdGltZSI6MTYxMTQ2MDAxNSwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwidXNlcl9uYW1lIjoic211LWZ5cCIsIm9yaWdpbiI6InVhYSIsInVzZXJfaWQiOiJlMzk3NmM5NC02MGMwLTQ5YjUtYmEzNi1hMmU3MWZmZWRiOTkiLCJyZXZfc2lnIjoiYzJjY2U0OGQifQ.pLfm-a4IjbjniUkfpTCXiaNVFFZ2zIW_rdRJCeeHEQPbnhZ3uYNju6tmaAeXz9ajn-c1c_OB45Nxlc_uRV64VZpOoh5aW573gb8u2SWdHouwNik5a7ituNfHhbF0ndK50jsoZISZ8Cc2AhEAiLZwhfqYmDTVUP-KBrxj_AAlPVYO9avjOnCqkdIPLBWs4wewLzfE3JnR9Zv0RFnkmBp-ZtfjEuue6Jhrksy4wR6SFcZj5cDZIPiPQtwrVZEy9t7Yqwz1usmM0TNdngcGvfezYyBhKyTqc7cZ8YG2HnqqZDsd1wkqR5ZaezTBTxgtZCaU4x9-rv1kMXgUibcrziQtZA",
};