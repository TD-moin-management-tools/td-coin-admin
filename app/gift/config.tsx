import { FormOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

export interface IDataType {
    key: string;
    id: string;
    name: string;
    type: keyof typeof GIFT_TYPE;
    status: keyof typeof GIFT_STATUS;
    count?: number;
    exchange_office: string;
    update_stamp: number;
}

type TActionFunc = (record: IDataType) => void;

const GIFT_TYPE = {
    1: '权益',
    2: '奖品',
};

const GIFT_STATUS = {
    1: '可用',
    2: '结束',
};

export const getColumns = (actionFunc: TActionFunc): ColumnsType<IDataType> => {
    return [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (text: keyof typeof GIFT_TYPE) => `${GIFT_TYPE[text]}`,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text: keyof typeof GIFT_STATUS) => `${GIFT_STATUS[text]}`,
        },
        {
            title: '数量',
            dataIndex: 'count',
            key: 'count',
            render: text => {
                if (typeof text === 'number') {
                    return text;
                }
                return '-';
            },
        },
        {
            title: '兑换人',
            dataIndex: 'exchange_office',
            key: 'exchange_office',
        },
        {
            title: '更新时间',
            dataIndex: 'update_stamp',
            key: 'update_stamp',
            render: text => {
                return dayjs(text).format('YYYY-MM-DD HH:mm');
            },
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
