import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/** --------------  请求相关声明    -------------- */
/** 空请求参数 */
export type TEmptyParamReq = void;

/**
 * 在执行fetch方法时的请求配置项
 */
export interface IRequestConfig<Request> extends Omit<AxiosRequestConfig<Request>, 'data'> {
    /**
     * 请求参数
     */
    data?: Request;

    /**
     * 请求域名，默认为novel.snssdk.com
     */
    domain?: string;
    /**
     * 合法的ApiCodes，如果业务代码中期望对某些非0的ApiCode做处理，可以传递这样一个白名单数组
     *
     * 数组内的ApiCodes和ApiCode.SUCCESS一样都会被resolve掉
     *
     * @type {number[]}
     * @memberof IRequestConfig
     */
    validApiCodes?: number[];
    /**
     * 返回完整的response报文，留个口子，以后用
     */
    // wholeResponse?: boolean;
    /**
     * 是否检查Response Code
     */
    dontCheckCode?: boolean;
}

/** --------------  响应相关声明    -------------- */
/**
 * 后端下发的基础数据结构
 *
 * @export
 * @interface IApiResponseStruct
 * @template Data
 */
export interface IApiResponseStruct<Data> {
    /**
     * 自定义状态码
     *
     * @type {number}
     * @memberof IApiResponseStruct
     */
    code: number;
    /**
     * 下发的业务数据
     *
     * @type {Data}
     * @memberof IApiResponseStruct
     */
    data: Data;
    /**
     * 自定义错误消息
     *
     * @type {string}
     * @memberof IApiResponseStruct
     */
    message?: string;
}
