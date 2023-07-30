'use client';
import { Table, message, Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getColumns, IDataType } from './config';
import mockdata from './mock.json';

const Gift = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState<IDataType[]>([]);
    // 要修改的的成员信息
    const [selectedInfo, setSelectedInfo] = useState<IDataType>();

    useEffect(() => {
        setTimeout(() => {
            setData(mockdata);
        }, 0);
    }, []);

    const handleModify = (record: IDataType) => {
        setSelectedInfo(record);
    };

    const handleCreate = () => {};

    const columnsConfig = useMemo(() => {
        return getColumns(handleModify);
    }, []);

    return (
        <div>
            {contextHolder}
            <div className='text-xl font-bold mb-10'>奖品与权益管理</div>
            <div className='text-right mb-5'>
                <Button type='primary' onClick={handleCreate}>
                    新建奖品/权益
                </Button>
            </div>
            <Table columns={columnsConfig} dataSource={data} />
        </div>
    );
};

export default Gift;
