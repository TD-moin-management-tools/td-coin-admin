import { apiDomain } from '@/app/constants/api';
import type { IRequestConfig, IApiResponseStruct } from '@/typings/fetch';
import axios, { AxiosRequestConfig } from 'axios';
import { checkCode } from './helper';

export const client = axios.create({
    timeout: 5000,
    transformRequest: axios.defaults.transformRequest,
    withCredentials: true,
} as AxiosRequestConfig);

/**
 * 真正发出请求的方法，会额外添加公共参数
 */
export async function originFetch<Request, Response>(
    config: any
): Promise<IApiResponseStruct<Response>> {
    const finalDomain = config.domain || apiDomain;
    config.url = finalDomain + config.url;

    if (config.method === 'GET') {
        config.params = config.data;
    }

    return new Promise((resolve, reject) => {
        client(config)
            .then(resp => {
                const { status, data } = resp;
                if (status === 200 && data) {
                    resolve(data);
                    return;
                }
                reject(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * fetch方法，会调用originFetch发起请求，并处理返回信息
 */

export async function fetch<Request, Response>(
    config: IRequestConfig<Request>
): Promise<IApiResponseStruct<Response>> {
    const { validApiCodes = [], dontCheckCode = false, data, ...otherConfig } = config;

    try {
        const res = await originFetch<Request, Response>({
            ...otherConfig,
            data,
        });
        const checkCodeRes = checkCode<Response>(res, validApiCodes, dontCheckCode);
        if (!checkCodeRes) {
            return Promise.reject(res);
        }
        return res;
        // return getData(res, wholeResponse);
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * 用于业务代码中快速定义一个Api
 */

export function defineApi<RequestData, ResponseData>(config: IRequestConfig<RequestData>) {
    return (requestParams?: RequestData): Promise<IApiResponseStruct<ResponseData>> => {
        const formatConfig: IRequestConfig<RequestData> = { ...config, data: requestParams };
        return fetch<RequestData, ResponseData>(formatConfig as any); // 这个any是用来过ts类型重载error，不然只能用下面注释的代码
    };
}
