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

  /** GET list of managed clusters in the specified subscription. 
      API reference link https://docs.microsoft.com/en-us/rest/api/aks/managedclusters/list **/
  static fetchAzureClusters = async (subscriptionId) => {
    try {
        const clusters = await fetch(`https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.ContainerService/managedClusters?api-version=2021-03-01`, {
      });
      return clusters; 
    }
    catch (err) {
      return Promise.reject(err);
    }
  };
}

export default AzureApi;