import { HttpParams } from '@angular/common/http';

export interface IControlConfigs {
    [key: string]: any
}

export interface IDropdown {
    value: string;
    text: string;
}

export interface IHttpServiceParams<T> {
    url: string,
    queryString?: Record<string, string>,
    formData?: T
}

export interface IHttpOptions {
    params: HttpParams
}

export interface IConfigList {
    name: string,
    branch: string,
    buildScript: string,
    deployScript: string,
    type: string,
    _id: string,
    isRunning?: boolean
}

export interface IStoreRecord {
    name: string,
    value: string,
    isSecret?: boolean,
    _id?: string,
    isDelete?: boolean
}

export interface ISocketMessage {
    [message: string]: string
}

export interface ICredentialsData {
    username?: string;
    password: string;
}

export interface IWorkflow {
    name: string,
    description: string,
    steps: Array<IBuildStep>,
    _id?: string
}

export interface IBuildStep {
    step?: string;
}

export interface IHttpCollection {
    [key: string]: Promise<any>;
}
