export interface IUserListContent {
    id: number;
    name: string;
    avatar: string; // 头像地址
    address: string; // 钱包地址
    coin: string; // 积分数
}

export interface IGetListResponse {
    list: IUserListContent[];
}

export interface IUpdateUserInfoParams {
    id: number;
    name?: string;
}
