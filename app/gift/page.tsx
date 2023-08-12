'use client';
import { Table, message, Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getColumns, IDataType } from './config';
import { useRouter } from 'next/navigation';
import { objectToQueryString } from '@/app/utils/transform';
import Link from 'next/link';
import mockdata from './mock.json';

const Gift = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState<IDataType[]>([]);

    // TODO：初始化列表
    useEffect(() => {
        setTimeout(() => {
            setData(mockdata);
        }, 0);
    }, []);

    const handleModify = (record: IDataType) => {
        const query = objectToQueryString(record);
        const path = `/gift/update?${query}`;
        router.push(path);
    };

    const columnsConfig = useMemo(() => {
        return getColumns(handleModify);
    }, []);

    return (
        <div>
            {contextHolder}
            <div className='text-xl font-bold mb-10'>奖品与权益管理</div>
            <div className='text-right mb-5'>
                <Link href='/gift/update'>
                    <Button type='primary'>新建奖品/权益</Button>
                </Link>
            </div>
            <Table columns={columnsConfig} dataSource={data} />
        </div>
    );
};

export default Gift;
