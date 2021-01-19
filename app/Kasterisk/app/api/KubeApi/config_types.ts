export interface Cluster {
    readonly name: string;
    readonly caData?: string;
    caFile?: string;
    readonly server: string;
    readonly skipTLSVerify: boolean;
}

export interface User {
    readonly name: string;
    readonly certData?: string;
    certFile?: string;
    readonly exec?: any;
    readonly keyData?: string;
    keyFile?: string;
    readonly authProvider?: any;
    readonly token?: string;
    readonly username?: string;
    readonly password?: string;
}

export interface Context {
    readonly cluster: string;
    readonly user: string;
    readonly name: string;
    readonly namespace?: string;
}