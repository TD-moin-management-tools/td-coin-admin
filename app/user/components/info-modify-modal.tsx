import { Modal } from 'antd';
import { IDataType } from '../config';
import ModifyForm from './modify-form';

interface IInfoModifyModalProps {
    visible: boolean;
    info?: IDataType;
    onClose: (success: boolean) => void;
}

const InfoModifyModal = (props: IInfoModifyModalProps) => {
    const { visible, info, onClose } = props;

    return (
        <Modal centered open={visible} onCancel={() => onClose(false)} footer={null}>
            <div className='min-h-[200px]'>
                <div className='text-base font-bold mb-10'>信息修改</div>
                <div className='h-full'>
                    {info ? (
                        <ModifyForm
                            onOk={() => onClose(true)}
                            onCancel={() => onClose(false)}
                            info={info}
                        />
                    ) : (
                        <div>信息获取失败</div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default InfoModifyModal;
