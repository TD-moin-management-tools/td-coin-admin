'use client';
import { Table, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { UserApi } from '@server/user';
import type { IUserListContent } from '@server/user/type';
import { getColumns } from './config';
import InfoModifyModal from './components/info-modify-modal';

const UserManege = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState<IUserListContent[]>([]);
    // 是否展示修改 modal
    const [modalVisible, setModalVisible] = useState(false);
    // 要修改的的成员信息
    const [selectedInfo, setSelectedInfo] = useState<IUserListContent>();
    const [loading, setLoading] = useState(false);

    const fetchGetUserInfo = () => {
        setLoading(true);
        UserApi.getList()
            .then(res => {
                if (res.data?.list) {
                    setData(res.data.list);
                }
            })
            .catch(error => {
                console.log('fail', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchGetUserInfo();
    }, []);

    const handleModify = (record: IUserListContent) => {
        setModalVisible(true);
        setSelectedInfo(record);
    };

    const handleCloseModal = (success: boolean) => {
        if (success) {
            messageApi.open({
                type: 'success',
                content: '修改成功',
            });
            fetchGetUserInfo();
        }
        setModalVisible(false);
        setSelectedInfo(undefined);
    };

    const handleJumpUserDetail = () => {};

    const columnsConfig = useMemo(() => {
        return getColumns(handleModify, handleJumpUserDetail);
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
            <Table columns={columnsConfig} dataSource={data} loading={loading} />
        </div>
    );
};

export default UserManege;
