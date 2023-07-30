'use client';
import './globals.css';
import './clear-antd.css';
import { Inter } from 'next/font/google';
import { Breadcrumb, Layout, theme } from 'antd';
import { usePathname } from 'next/navigation';
import CustomMenu from './components/menu';

const { Header, Content, Footer, Sider } = Layout;
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const renderElm = () => {
        if (pathname === '/' || pathname === '/login') {
            return children;
        }
        return (
            <Layout className='min-h-screen'>
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='text-lg'>TokenDance 后台管理系统</div>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: colorBgContainer }}>
                        <CustomMenu />
                    </Sider>
                    <Layout className='p-[24px]'>
                        <Content className='p-[24px] min-h-[280px] bg-white'>{children}</Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    };

    return (
        <html lang='en'>
            <body className={inter.className + ' min-h-screen'}>{renderElm()}</body>
        </html>
    );
}
