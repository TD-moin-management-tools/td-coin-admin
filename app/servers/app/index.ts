import { defineApi } from '@utils/fetch';

export const AppApi = {
    login: defineApi<unknown, unknown>({
        url: '/user/admin/login',
        method: 'POST',
    }),
    checkLogin: defineApi<unknown, unknown>({
        url: '/user/admin/check_login',
        method: 'POST',
    }),
};
