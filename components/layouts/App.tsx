import React, { Component, ReactNode } from "react";
import Link from "next/link";
import { withRouter, Router as RouterType } from "next/router";
import Router from "next/router";
import { Modal, Button, message } from "antd";
const { confirm } = Modal;
import { Layout, Menu, Icon } from "antd";
import NProgress from "nprogress";
const { Content, Sider } = Layout;
import Head from "next/head";
import cookie from "js-cookie";

interface IProps {
    title?: string;
    children: ReactNode;
    router: RouterType;
}

Router.events.on("routeChangeStart", (url: any) => {
    console.log("App is changing to: ", url);
    NProgress.start();
});

Router.events.on("routeChangeComplete", (url: any) => {
    NProgress.done();
});

function showLogoutConfirm(): void {
    confirm({
        title: "Logout Confirmation",
        content: "Are sure you want to logout ?",
        okText: "Confirm",
        okType: "danger",
        cancelText: "Cancel",
        onOk() {
            cookie.remove("token");
            Router.push("/auth/login");
            message.warning("Logout Successfully");
        },
        onCancel() {
            console.log("Cancel");
        }
    });
}

const handleMenueChange = ({ key }: any) => {
    if (key === "/logout") {
        showLogoutConfirm();
    } else {
        Router.push(key);
    }
};

function App(props: IProps) {
    return (
        <>
            <Head>
                <title>
                    {props.title} | {process.env.APP_NAME}
                </title>
                <link
                    ref="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                />
            </Head>
            <Layout>
                <Layout>
                    <Sider width={200} style={{ background: "#fff" }}>
                        <div className="piston-logo">
                            <h3>
                                <span>
                                    <Link href="/">
                                        <a>{process.env.APP_NAME}</a>
                                    </Link>
                                </span>
                            </h3>
                        </div>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[props.router.route]}
                            style={{ height: "100vh" }}
                            className="ps-sidebar"
                            onSelect={handleMenueChange}
                        >
                            <Menu.Item key="/">
                                <span>
                                    <Icon type="dashboard" /> DASHBOARD
                                </span>
                            </Menu.Item>

                            <Menu.Item key="/logout">
                                <span>
                                    <Icon type="logout" />
                                    Logout
                                </span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: "0 24px 24px" }}>
                        <Content style={{ margin: 0, minHeight: 280 }}>
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
}

export default withRouter(App);
