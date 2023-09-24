import { defineApi } from '@utils/fetch';
import { IGetListResponse, IUpdateUserInfoParams } from './type';

export const UserApi = {
    // 后面再吧 unknown 替换了
    getList: defineApi<unknown, IGetListResponse>({
        url: '/user/manage/get_list',
    }),
    updateUserInfo: defineApi<IUpdateUserInfoParams, unknown>({
        url: '/user/manage/update_user_info',
        method: 'POST',
    }),
};
