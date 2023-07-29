"use client";
import { Button, Input, Card } from "antd";
import { useState } from "react";

const { Password } = Input;

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogin = () => {
    // todo 请求登录信息
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <div className="text-4xl mb-10">登录</div>

        <div className="flex flex-col items-center">
          <Input
            className="mb-5"
            size="large"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="请输入用户名"
          />
          <Password
            className="mb-5"
            size="large"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            placeholder="请输入密码"
          />
          <Button
            className="mb-5 w-1/2"
            type="primary"
            size="large"
            onClick={handleLogin}
          >
            登录
          </Button>
        </div>
      </Card>
    </main>
  );
}
