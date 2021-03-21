import { authorize } from "react-native-app-auth";
import {
  azureConfig,
  saveCredentials,
} from "../utils/constants";

class AzureApi {
  static checkAzureCredentials = async () => {
    try {
      const authState = await authorize(azureConfig);

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