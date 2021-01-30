import { LexRuntime } from "aws-sdk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";

async function getStored(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return false;
  }
}

// export async function checkServerStatus() {
//   let serverUrl = await getStored("server-url");
//   if (serverUrl == false) {
//     return "Failed to obtain server URL from device storage";
//   }
//   serverUrl = serverUrl.replace(/^"+|"+$/gm, "");
//   // test
//   serverUrl = "https://small-test.run.haas-242.pez.pivotal.io:8443";
//   let callUrl = "https://small-test.run.haas-242.pez.pivotal.io:8443/livez";
//   alert(callUrl);
//   const response = await RNFetchBlob.config({
//     trusty: true,
//   }).fetch("POST", callUrl, {
//     Authorization:
//       "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL3Rva2VuX2tleXMiLCJraWQiOiJrZXktMSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMzk3NmM5NC02MGMwLTQ5YjUtYmEzNi1hMmU3MWZmZWRiOTkiLCJhdWQiOlsicGtzX2NsdXN0ZXJfY2xpZW50Il0sImlzcyI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL29hdXRoL3Rva2VuIiwiZXhwIjoxNjExMDgwOTY5LCJpYXQiOjE2MTEwODAzNjksImFtciI6WyJwd2QiXSwiYXpwIjoicGtzX2NsdXN0ZXJfY2xpZW50Iiwic2NvcGUiOlsib3BlbmlkIl0sImVtYWlsIjoic211LWZ5cEBleGFtcGxlLmNvbSIsInppZCI6InVhYSIsIm9yaWdpbiI6InVhYSIsImp0aSI6ImM4ZTgyYmY5NzYxNTQ5ZDdhMTRmZmViMDg4YjM4ZDY2IiwicHJldmlvdXNfbG9nb25fdGltZSI6MTYxMTA2NTQ0MjA1OSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNsaWVudF9pZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImNpZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfbmFtZSI6InNtdS1meXAiLCJyZXZfc2lnIjoiYzJjY2U0OGQiLCJ1c2VyX2lkIjoiZTM5NzZjOTQtNjBjMC00OWI1LWJhMzYtYTJlNzFmZmVkYjk5IiwiYXV0aF90aW1lIjoxNjExMDgwMzY5fQ.E9AamI8EsDfgz15dxnpjDsTzaN7-V88GQXDgaKGXYMAPUTZYIhqKuse1xJvuUXSPZgnSe9cSze1aiMpB3qpIKRQmchLcQ8BlzY-HLOE9yWdexDcpdHhIs_1_Qhx-7vNO_nKPQCsDp9db37MHmyD7T9PjZjNaFvyidLAmgoIVytTb4BXWvy6v1Uw50BJHwtSHFA6IXhV2aXO7U4s1kftljvabYCIz5tQQmj0170EptKKcaYHc1DuKOwFtB-EssacDBVw8_ZLPOuGTKeBpoMujfAKNbzEq7hZMnl8TKfJ2xAfDmr4_VxiMpSVxJ65B0jUBhXtXBUDQrxhMvXqUO9Gd8A",
//     insecureSkipTLSVerify: false
//   });
//   return response.json();
// }
