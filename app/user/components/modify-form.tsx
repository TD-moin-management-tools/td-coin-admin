import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { IDataType } from '../config';

interface IModifyFormProps {
    info: IDataType;
    onOk: () => void;
    onCancel: () => void;
}

const ModifyForm = (props: IModifyFormProps) => {
    const { info, onOk, onCancel } = props;
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (info) {
            form.setFieldsValue({
                name: info.name,
            });
            setLoading(false);
        }
    }, [info]);

    // TODO: 先用any了
    const onFinish = (value: any) => {
        setLoading(true);

        setLoading(false);
        onOk();
    };

    // TODO: 先用any了
    const onFinishFailed = (fail: any) => {
        console.log(fail);
    };

    return (
        <Form
            name='modifyForm'
            form={form}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Form.Item
                label='用户名'
                name='name'
                rules={[{ required: true, message: '请输入用户名' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item labelCol={{ push: 8 }}>
                <Button className='mr-3' type='primary' htmlType='submit' loading={loading}>
                    提交
                </Button>
                <Button htmlType='button' onClick={onCancel}>
                    取消
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ModifyForm;
