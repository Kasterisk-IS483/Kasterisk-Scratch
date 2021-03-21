import { sign } from 'aws4-react-native';
import { Alert } from 'react-native';
import { Base64 } from 'js-base64';

class AwsApi {

  /**
   *
   * AWS Kubernetes API Authorization from Outside a Cluster:
   * https://github.com/kubernetes-sigs/aws-iam-authenticator#api-authorization-from-outside-a-cluster
   *
   */

  static getAuthToken = (clusterName, AwsCredentials, region) => {
    /* Declare options for STS API Query */
    try {
      const queryOptions = {
        host: `sts.${region}.amazonaws.com`,
        service: 'sts',
        path: '/?Action=GetCallerIdentity&Version=2011-06-15&X-Amz-Expires=60',
        headers: {
          'x-k8s-aws-id': clusterName,
        },
        signQuery: true,
        region: region,
      };
      /* Sign STS API Query with AWS4 Signature */

      const signedQuery = sign(queryOptions, AwsCredentials);

      /* Pull out signed host & path */
      const signedURL = `https://${signedQuery.host}${signedQuery.path}`;
      /* Base64 encode signed URL */
      const encodedURL = Base64.encodeURI(signedURL);
      /* Remove any Base64 encoding padding */
      const token = encodedURL.replace(/=+$/, '');
      /* Prepend result with required string */
      const authToken = `k8s-aws-v1.${token}`;
      return authToken;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  static eksFetch = async (region, path, AwsCredentials) => {
    const queryOptions = {
      host: `eks.${region}.amazonaws.com`,
      path: path,
    };
    const query = sign(queryOptions, AwsCredentials);
    try {
      const res = await fetch(`https://eks.${region}.amazonaws.com${path}`, {
        headers: query.headers,
      });
      return res.json();
    }
    catch (err) {
      return Promise.reject(err);
    }
  };

  static fetchEksClusterNames = async (region, AwsCredentials) => {
    try {
      const clusters = await this.eksFetch(region, '/clusters', AwsCredentials);
      return clusters.clusters;
    }
    catch (err) {
      return Promise.reject(err);
    }
  };

  static describeAllEksClusters = async (region, AwsCredentials) => {
    try {
      const clusterNameList = await this.fetchEksClusterNames(region, AwsCredentials);
      const clusterList = await Promise.all(clusterNameList.map(async clusterName => {
        const cluster = await this.eksFetch(region, `/clusters/${clusterName}`, AwsCredentials);
        const newCluster = {
          url: cluster.cluster.endpoint,
          name: cluster.cluster.name,
          status: cluster.cluster.status,
          createdAt: cluster.cluster.createdAt,
          cloudProvider: 'aws',
          namespaces: [],
        };
        return newCluster;
      }));
      return clusterList;
    }
    catch (err) {
      return Promise.reject(err);
    }
  };
  static checkAwsCredentials = async (credentials, region) => {
    try {
      const data = await this.fetchEksClusterNames(region, credentials);
      if (data) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
}

export default AwsApi;

