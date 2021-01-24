import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { AuthConfiguration } from 'react-native-app-auth';

export const GOOGLE_IOS_CLIENT = "447181180888-bou5e3olte901t7srk0e1mv3c413g0lt"
export const GOOGLE_ANDROID_CLIENT = "447181180888-ker4pf1d0d16u3d8pnek049q3kdpu07k"
export const GOOGLE_IOS_CLIENT_ID = GOOGLE_IOS_CLIENT + ".apps.googleusercontent.com";
export const GOOGLE_ANDROID_CLIENT_ID = GOOGLE_ANDROID_CLIENT + ".apps.googleusercontent.com";
export const GOOGLE_IOS_REDIRECT = "com.googleusercontent.apps." + GOOGLE_IOS_CLIENT + ":/oauth2redirect/google";
// export const GOOGLE_ANDROID_REDIRECT = "com.googleusercontent.apps." + GOOGLE_ANDROID_CLIENT +":/oauth2redirect/google";
export const GOOGLE_ANDROID_REDIRECT = "com.kasterisk.android" + ":/oauth2redirect/google";

export const WEB_CLIENT_ID = "447181180888-u710h5qo7vde690vk9t2j2rrlmiq094n.apps.googleusercontent.com";
export const WEB_CLIENT_SECRET = "zPT9I0zE2E5pNlpLW_-at593";

//export const AZURE_CLIENT_ID = '047ad4bd-b216-4efd-9f44-6093ec72eef6';
export const AZURE_CLIENT_ID = '519475b0-3c48-4ca5-a318-184e13dd0a77';
export const AZURE_TENANT_ID = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a';
export const AZURE_CLIENT_SECRET = 'K0Hsw1-jnPb5iQ7~5S9V.q3zID7fg5~.lB';
export const AZURE_DOMAIN_HINT = '';

export const googleConfig = {
  issuer: 'https://accounts.google.com/',
  // serviceConfiguration: {
  //   authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  //   tokenEndpoint: "https://oauth2.googleapis.com/token",
  //   revocationEndpoint: "https://oauth2.googleapis.com/revoke"
  // },
  clientId: Platform.OS === 'ios' ? GOOGLE_IOS_CLIENT_ID : GOOGLE_ANDROID_CLIENT_ID,
  redirectUrl: Platform.OS === 'ios' ? GOOGLE_IOS_REDIRECT : GOOGLE_ANDROID_REDIRECT,
  scopes: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/cloud-platform']
};

export const azureConfig: AuthConfiguration = {
  clientId: AZURE_CLIENT_ID,
  issuer: "https://login.microsoftonline.com/" + AZURE_TENANT_ID + "/v2.0",
  redirectUrl: Platform.OS === 'ios' ? 'urn:ietf:wg:oauth:2.0:oob' : 'kasterisk://react-native-auth',
  scopes: ["openid", "profile", "email", "offline_access","user.read"],
  // prompt: "login",
  additionalParameters: { prompt: 'select_account' },
  serviceConfiguration: {
    authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  }
};

export const saveCredentials = async(storageKey, credentials) => {
    try {
      await AsyncStorage.setItem(storageKey, credentials)
      return true
    } catch (e) {
      return false
    }
};

export const urlOptions = {
  baseUrl: "https://small-test.run.haas-242.pez.pivotal.io:8443",
  refreshToken: "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL3Rva2VuX2tleXMiLCJraWQiOiJrZXktMSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NjEyZTdlZTkwZTQ0MWZkOGY0ODhiMTFiNDlmYWNkMi1yIiwic3ViIjoiZTM5NzZjOTQtNjBjMC00OWI1LWJhMzYtYTJlNzFmZmVkYjk5IiwiaWF0IjoxNjExNDc0NjM2LCJleHAiOjE2MTE0OTYyMzYsImNpZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImNsaWVudF9pZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImlzcyI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbIm9wZW5pZCIsInBrc19jbHVzdGVyX2NsaWVudCJdLCJncmFudGVkX3Njb3BlcyI6WyJvcGVuaWQiLCJyb2xlcyJdLCJhbXIiOlsicHdkIl0sImF1dGhfdGltZSI6MTYxMTQ3NDYzNiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwidXNlcl9uYW1lIjoic211LWZ5cCIsIm9yaWdpbiI6InVhYSIsInVzZXJfaWQiOiJlMzk3NmM5NC02MGMwLTQ5YjUtYmEzNi1hMmU3MWZmZWRiOTkiLCJyZXZfc2lnIjoiYzJjY2U0OGQifQ.vS3pYOfaHbYw1V5S8_44MoVBQkSieUbGkwPsGHsk0dGYMS82O5gyZWtXpVO9oj3l0OdgyOwwcUW4vrtfrcG4BewUDlJ81Oy1sZpYT7IR_JJjERM3hFeA0UCuZw3il-iG6F7MfBuD7KUMtpa3z5zlfyfBi2KwIj3fIlcf_LRuaS4FivLTohHpJ04ylu7w4PFPsYafVr4mjNcCECGjcwaMvbBFAdR17fvfihSD9vWfIVmFKanz1fL2O7GKjoAhjSC3NeWpWE9ZfRzUdGVbHs1N9TlemLMvM9THJAtFc2M8QAr-FbtehfZqOR9Mvs704LM-u15JpZBNi-QdE5DcAsJMNg",
};