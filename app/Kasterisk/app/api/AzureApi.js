import { authorize } from "react-native-app-auth";
import {
    azureConfig,
    saveCredentials,
  } from "../utils/constants";

class AzureApi {
    static checkAzureCredentials = async () => {
        try {
          const authState = await authorize(azureConfig);
          alert(authState);
          let accessToken = authState.accessToken;
          let tokenExpiry = authState.accessTokenExpirationDate;
          let idToken = authState.idToken;
          let refreshToken = authState.refreshToken;
          let tokenType = authState.tokenType;
    
          let storageString = JSON.stringify({
            accessToken: authState.accessToken,
            tokenExpiry: authState.accessTokenExpirationDate,
            idToken: authState.idToken,
            refreshToken: authState.refreshToken,
            tokenType: authState.tokenType,
          });
    
          let saveResult = await saveCredentials(
            "@azureCredentials",
            storageString
          );
          if (saveResult) {
            return true;
          }
          return false;
        } catch (e) {
          throw new Error(e);
        }
      };
}

export default AzureApi;