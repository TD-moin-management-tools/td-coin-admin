'use client';
import { Button, Input, Card, message } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppApi } from '@server/app';

const { Password } = Input;

export default function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);

        AppApi.login({ user_name: userName, password: userPassword })
            .then(() => {
                messageApi.open({
                    type: 'success',
                    content: '登录成功,即将跳转',
                });

                setTimeout(() => {
                    router.replace('/user');
                }, 1000);
            })
            .catch(e => {
                messageApi.open({
                    type: 'error',
                    content: '登录失败，请确认用户名和密码',
                });
            })
            .finally(() => {
                setLoading(false);
            });
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
