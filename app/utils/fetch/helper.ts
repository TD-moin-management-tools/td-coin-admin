import type { IApiResponseStruct } from '@/typings/fetch';
import { EApiCode } from '@/app/constants/api';

/**
 * @description 判断业务 code 是否正确
 */
export function checkCode<Response>(
    response: IApiResponseStruct<Response>,
    validApiCodes: number[] = [],
    dontCheckCode = false
): boolean {
    if (dontCheckCode) {
        return true;
    }
    const code = response.code;
    return code === EApiCode.Success || validApiCodes.includes(code);
}

/**
 * @description 获取业务 Data
 * 留个方法，后续可能会用上
 */
export function getData<Response>(
    response: IApiResponseStruct<Response>,
    wholeResponse: boolean
): Response | IApiResponseStruct<Response> {
    if (wholeResponse) {
        return response;
    }
    return response.data;
}
