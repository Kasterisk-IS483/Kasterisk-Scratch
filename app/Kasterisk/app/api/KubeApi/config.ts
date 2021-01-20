import { Cluster, User, Context } from "./config_types";
import * as yaml from "js-yaml";

interface KConfig {
    apiVersion: string;
    clusters: Cluster[];
    contexts: Context[],
    users: User[];
    "current-context": string;
}

export class Kubeconfig {

    public 'apiVersion' : string;
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

    public loadFromFile(fileContents: string): boolean {
        try {
            let kubeFile = yaml.load(fileContents) as KConfig
            console.log(kubeFile)
            if (kubeFile == null) {
                return false;
            }
            this.apiVersion = kubeFile.apiVersion
            this.clusters = kubeFile.clusters
            this.contexts = kubeFile.contexts
            this.users = kubeFile.users
            this.currentContext = kubeFile["current-context"]
        }
        catch (e) {
            return false;
        }

        

        return true
        
    }


}

export interface ApiType {
    defaultHeaders: any;
    setDefaultAuthentication(config: api.Authentication): void;
}

export interface Named {
    name: string;
}

export function findObject<T extends Named>(list: T[], name: string, key: string): T | null {
    if (!list) {
        return null;
    }
    for (const obj of list) {
        if (obj.name === name) {
            if (obj[key]) {
                obj[key].name = name;
                return obj[key];
            }
            return obj;
        }
    }
    return null;
}