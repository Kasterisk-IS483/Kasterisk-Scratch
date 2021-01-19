import { LexRuntime } from "aws-sdk";
import * as SecureStore from "expo-secure-store";
import RNFetchBlob from "react-native-fetch-blob";

async function getStored(key) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    return false;
  }
}

export async function checkServerStatus() {
  let serverUrl = await getStored("server-url");
  if (serverUrl == false) {
    return "Failed to obtain server URL from device storage";
  }
  serverUrl = serverUrl.replace(/^"+|"+$/gm, "");
  // test
  serverUrl = "https://small-test.run.haas-242.pez.pivotal.io:8443";
  let callUrl = "https://small-test.run.haas-242.pez.pivotal.io:8443/livez";
  alert(callUrl);
  const response = await RNFetchBlob.config({
    trusty: true,
  }).fetch("POST", callUrl, {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL3Rva2VuX2tleXMiLCJraWQiOiJrZXktMSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMzk3NmM5NC02MGMwLTQ5YjUtYmEzNi1hMmU3MWZmZWRiOTkiLCJhdWQiOlsicGtzX2NsdXN0ZXJfY2xpZW50Il0sImlzcyI6Imh0dHBzOi8vYXBpLnJ1bi5oYWFzLTI0Mi5wZXoucGl2b3RhbC5pbzo4NDQzL29hdXRoL3Rva2VuIiwiZXhwIjoxNjExMDY2MDQyLCJpYXQiOjE2MTEwNjU0NDIsImFtciI6WyJwd2QiXSwiYXpwIjoicGtzX2NsdXN0ZXJfY2xpZW50Iiwic2NvcGUiOlsib3BlbmlkIl0sImVtYWlsIjoic211LWZ5cEBleGFtcGxlLmNvbSIsInppZCI6InVhYSIsIm9yaWdpbiI6InVhYSIsImp0aSI6ImRmNTk0NmJiNWYyNzRiNzQ5N2JhYjE4N2RkYTgyY2M0IiwicHJldmlvdXNfbG9nb25fdGltZSI6MTYxMTA1OTIwMjUxNywiZW1haWxfdmVyaWZpZWQiOnRydWUsImNsaWVudF9pZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImNpZCI6InBrc19jbHVzdGVyX2NsaWVudCIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfbmFtZSI6InNtdS1meXAiLCJyZXZfc2lnIjoiYzJjY2U0OGQiLCJ1c2VyX2lkIjoiZTM5NzZjOTQtNjBjMC00OWI1LWJhMzYtYTJlNzFmZmVkYjk5IiwiYXV0aF90aW1lIjoxNjExMDY1NDQyfQ.LnmLx-t_Ztvqggdm_u8FnL-yYgXL2suTsFGR8SB01NtdFZTlKq2sWyQwHAXhazzU1rfevOKXoztgrO2b7ygyKo3Mg3M9T7w4y0d_daOE3BxBKH_sG7XJXLNrMBnEELOS4ww4pAD8xDzpDx6CAdazr1p2EeLd8Ckh__78qHA9ZuOgnuUal6oiV2q5Au-b6nSh3eqclpYdcYiHwkaWJfYRCEoJIyb_2UXJ-ssVcsHrBUYS9OtJzzs8hU9YXvLzfP1QUAVJ_ff_48epgBpHoEPWLhzyoKUzBrDGpLjsrKom5_kx0D_D596A1M9zAGAPMfNVPZeTVr6WUPxmdmgralUZ1Q",
    insecureSkipTLSVerify: false
  });
  return response;
}
