import { Avatar, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { IUserListContent } from '@server/user/type';

type TActionFunc = (record: IUserListContent) => void;

export const getColumns = (
    actionFunc: TActionFunc,
    handleJumpUserDetail: TActionFunc
): ColumnsType<IUserListContent> => {
    return [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 70,
        },
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 100,
            align: 'center',
            render: (avatar: string) => {
                if (avatar.startsWith('http')) {
                    return <Avatar size={96} src={avatar} />;
                }
                return avatar;
            },
        },
        {
            title: '钱包地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'TD coin',
            dataIndex: 'coin',
            key: 'coin',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 80,
            render: (_, record) => (
                <div className='flex'>
                    <Button className='mr-2 px-2' type='primary' onClick={() => actionFunc(record)}>
                        修改
                    </Button>
                    <Button
                        className='px-2'
                        type='primary'
                        onClick={() => handleJumpUserDetail(record)}
                    >
                        查看详情
                    </Button>
                </div>
            ),
        },
    ];
};
