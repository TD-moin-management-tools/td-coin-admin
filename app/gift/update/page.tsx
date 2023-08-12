'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { LeftSquareOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Radio, Select, message } from 'antd';

const Gift = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    // 是否是新建 gift
    const [isCreate, setIsCreate] = useState(true);
    // 初始值
    const [initValue, setInitValue] = useState<Record<string, string | number>>({
        status: '1',
        type: '1',
    });

    // 当前的状态
    const currentStatus = Form.useWatch('status', form);
    // 状态为不可用后内容不可填写
    const disable = currentStatus === '2';

    // 当前的类型
    const currentType = Form.useWatch('type', form);
    // 权益类型不可填写数量
    const hideCount = currentType === '1';

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const newValue: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            newValue[key] = value;
        });

        if (newValue.id) {
            const { status, name, type, count, exchange_office } = newValue;
            setIsCreate(false);
            setInitValue(newValue);

            form.setFieldsValue({
                status,
                name,
                type,
                count,
                exchange_office,
            });
        } else {
            form.setFieldsValue(initValue);
        }
    }, []);

    const handleGoBack = () => {
        router.back();
    };

    const onReset = () => {
        form.resetFields();
        form.setFieldsValue(initValue);
    };

    // TODO 调用接口更新
    const onFinish = (values: any) => {
        setLoading(true);

        console.log(values);
        setTimeout(() => {
            setLoading(false);
            messageApi.open({
                type: 'success',
                content: `${isCreate ? '新建' : '更新'}成功`,
            });
            setTimeout(() => {
                router.back();
            }, 1000);
        }, 2000);
    };

    return (
        <div>
            {contextHolder}
            <div
                className='text-large mb-10 inline-flex items-center px-2 cursor-pointer hover:text-[#1677ff]'
                onClick={handleGoBack}
            >
                <LeftSquareOutlined className='mr-2' />
                返回上一页
            </div>
            <div className='text-xl font-bold mb-10'>
                {isCreate ? '新建奖品/权益' : '更新奖品/权益'}
            </div>

            <Form
                form={form}
                name='gift-form'
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout='horizontal'
                style={{ maxWidth: 600 }}
            >
                <Form.Item label='状态' name='status'>
                    <Radio.Group>
                        <Radio.Button value='1'>进行中</Radio.Button>
                        <Radio.Button value='2'>已结束</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label='名称'
                    name='name'
                    rules={[{ required: true, message: '请输入名称' }]}
                >
                    <Input disabled={disable} />
                </Form.Item>
                <Form.Item label='类型' name='type'>
                    <Select disabled={disable}>
                        <Select.Option value='1'>权益</Select.Option>
                        <Select.Option value='2'>奖品</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='数量' name='count' hidden={hideCount}>
                    <InputNumber disabled={disable} />
                </Form.Item>
                <Form.Item
                    label='兑换人'
                    name='exchange_office'
                    rules={[{ required: true, message: '请输入兑换人' }]}
                >
                    <Input disabled={disable} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2 }}>
                    <Button className='mr-2' type='primary' htmlType='submit' loading={loading}>
                        {isCreate ? '创建' : '更新'}
                    </Button>
                    <Button htmlType='button' onClick={onReset}>
                        还原
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Gift;
