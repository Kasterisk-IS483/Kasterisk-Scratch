import { Cluster, User, Context } from "./config_types";
import yaml = require("js-yaml");
import https = require("https");

export class Kubeconfig {

    public 'clusters': Cluster[];

    public 'users': User[];

    public 'contexts': Context[];

    public 'currentContext': string;

    constructor() {
        this.contexts = [];
        this.clusters = [];
        this.users = [];
    }

    public getContexts(): Context[] {
        return this.contexts;
    }

    public getClusters(): Cluster[] {
        return this.clusters;
    }

    public getUsers(): User[] {
        return this.users;
    }

    public getCurrentContext(): string {
        return this.currentContext;
    }

    private getCurrentContextObject(): Context | null {
        return this.getContextObject(this.currentContext);
    }

    public setCurrentContext(context: string): void {
        this.currentContext = context;
    }

    public getContextObject(name: string): Context | null {
        if (!this.contexts) {
            return null;
        }
        return findObject(this.contexts, name, 'context');
    }

    public getCurrentCluster(): Cluster | null {
        const context = this.getCurrentContextObject();
        if (!context) {
            return null;
        }
        return this.getCluster(context.cluster);
    }

    public getCluster(name: string): Cluster | null {
        return findObject(this.clusters, name, 'cluster');
    }

    public getCurrentUser(): User | null {
        const ctx = this.getCurrentContextObject();
        if (!ctx) {
            return null;
        }
        return this.getUser(ctx.user);
    }

    public getUser(name: string): User | null {
        return findObject(this.users, name, 'user');
    }

    public async applytoHTTPSOptions(opts: https.RequestOptions): Promise<void> {
        const user = this.getCurrentUser();

        await this.applyOptions(opts);

        if (user && user.username) {
            opts.auth = `${user.username}:${user.password}`;
        }
    }

//     public async applyToRequest(opts: request.Options): Promise<void> {
//         const cluster = this.getCurrentCluster();
//         const user = this.getCurrentUser();

//         await this.applyOptions(opts);

//         if (cluster && cluster.skipTLSVerify) {
//             opts.strictSSL = false;
//         }

//         if (user && user.username) {
//             opts.auth = {
//                 password: user.password,
//                 username: user.username,
//             };
//         }
//     }

//     private applyHTTPSOptions(opts: {} | https.RequestOptions): void {
//         const cluster = this.getCurrentCluster();
//         const user = this.getCurrentUser();
//         if (!user) {
//             return;
//         }

//         if (cluster != null && cluster.skipTLSVerify) {
//             opts.rejectUnauthorized = false;
//         }
//         const ca = cluster != null ? bufferFromFileOrString(cluster.caFile, cluster.caData) : null;
//         if (ca) {
//             opts.ca = ca;
//         }
//         const cert = bufferFromFileOrString(user.certFile, user.certData);
//         if (cert) {
//             opts.cert = cert;
//         }
//         const key = bufferFromFileOrString(user.keyFile, user.keyData);
//         if (key) {
//             opts.key = key;
//         }
//     }

        
//     private async applyOptions(opts: {} | https.RequestOptions): Promise<void> {
//         this.applyHTTPSOptions(opts);
//         await this.applyAuthorizationHeader(opts);
//     }

// }

// export interface ApiType {
//     defaultHeaders: any;
//     setDefaultAuthentication(config: api.Authentication): void;
// }

// export interface Named {
//     name: string;
// }

// export function findObject<T extends Named>(list: T[], name: string, key: string): T | null {
//     if (!list) {
//         return null;
//     }
//     for (const obj of list) {
//         if (obj.name === name) {
//             if (obj[key]) {
//                 obj[key].name = name;
//                 return obj[key];
//             }
//             return obj;
//         }
//     }
//     return null;
// }