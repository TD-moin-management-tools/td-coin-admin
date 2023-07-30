'use client';
import { GiftOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        icon: <UserOutlined />,
        key: 'user',
        label: '成员管理',
    },
    {
        icon: <GiftOutlined />,
        key: 'gift',
        label: '奖品与权益管理',
    },
];

const CustomMenu = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [selected, setSelected] = useState(['user']);

    useEffect(() => {
        setSelected([pathname.replace('/', '')]);
    }, [pathname]);

    const handleClick = (item: MenuInfo) => {
        setSelected([item.key]);
        router.push('/' + item.key);
    };

    return <Menu mode='inline' items={items} selectedKeys={selected} onClick={handleClick} />;
};

export default CustomMenu;
