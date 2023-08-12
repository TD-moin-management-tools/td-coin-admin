'use client';
import { Button, Input, Card, message } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const { Password } = Input;

export default function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // todo 请求登录信息
    const handleLogin = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            messageApi.open({
                type: 'success',
                content: '登录成功,即将跳转',
            });

            // TODO: 临时做法
            sessionStorage.setItem('login', 'true');

            setTimeout(() => {
                router.replace('/user');
            }, 1000);
        }, 2000);
    };

    return (
        <main className='flex flex-col items-center justify-center min-h-screen'>
            {contextHolder}
            <Card className='w-[400px]'>
                <div className='text-4xl mb-10'>登录</div>

                <div className='flex flex-col items-center'>
                    <Input
                        className='mb-5'
                        size='large'
                        value={userName}
                        onChange={e => {
                            setUserName(e.target.value);
                        }}
                        placeholder='请输入用户名'
                    />
                    <Password
                        className='mb-5'
                        size='large'
                        value={userPassword}
                        onChange={e => {
                            setUserPassword(e.target.value);
                        }}
                        placeholder='请输入密码'
                    />
                    <Button
                        className='mb-5 w-1/2'
                        type='primary'
                        size='large'
                        loading={loading}
                        onClick={handleLogin}
                    >
                        登录
                    </Button>
                </div>
            </Card>
        </main>
    );
}
