import { FormOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

export interface IDataType {
    key: string;
    id: string;
    name: string;
    avatar: number;
    address: string;
}

type TActionFunc = (record: IDataType) => void;

export const getColumns = (actionFunc: TActionFunc): ColumnsType<IDataType> => {
    return [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
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
        },
        {
            title: '钱包地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 80,
            render: (_, record) => (
                <div
                    className='px-2 cursor-pointer hover:text-[#1677ff]'
                    onClick={() => actionFunc(record)}
                >
                    <FormOutlined />
                </div>
            ),
        },
    ];
};
