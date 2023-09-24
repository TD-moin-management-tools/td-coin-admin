export interface IUserListContent {
    id: number;
    name: string;
    avatar: string;
    address: string;
}

export interface IGetListResponse {
    list: IUserListContent[];
}

export interface IUpdateUserInfoParams {
    id: number;
    name?: string;
}
