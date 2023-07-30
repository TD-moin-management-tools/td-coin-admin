'use client';
import { Table, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getColumns, IDataType } from './config';
import InfoModifyModal from './components/info-modify-modal';
import mockdata from './mock.json';

const UserManege = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState<IDataType[]>([]);
    // 是否展示修改 modal
    const [modalVisible, setModalVisible] = useState(false);
    // 要修改的的成员信息
    const [selectedInfo, setSelectedInfo] = useState<IDataType>();

    useEffect(() => {
        setTimeout(() => {
            setData(mockdata);
        }, 0);
    }, []);

    const handleModify = (record: IDataType) => {
        setModalVisible(true);
        setSelectedInfo(record);
    };

    const handleCloseModal = (success: boolean) => {
        if (success) {
            messageApi.open({
                type: 'success',
                content: '修改成功',
            });
        }
        setModalVisible(false);
    };

    const columnsConfig = useMemo(() => {
        return getColumns(handleModify);
    }, []);

    return (
        <div>
            {contextHolder}
            <div className='text-xl font-bold mb-10'>用户管理</div>
            <InfoModifyModal
                visible={modalVisible}
                info={selectedInfo}
                onClose={handleCloseModal}
            />
            <Table columns={columnsConfig} dataSource={data} />
        </div>
    );
};

export default UserManege;
