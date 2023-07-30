'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    // TODO: 初始化登录
    useEffect(() => {
        const res = sessionStorage.getItem('login');
        setTimeout(() => {
            if (res === 'true') {
                router.replace('/user');
            } else {
                router.replace('/login');
            }
        }, 1000);
    }, []);
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            登录信息校验中...
        </main>
    );
}
