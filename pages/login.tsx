import React, { Component } from "react";
import Auth from "../components/layouts/Auth";
import {
    Form,
    Icon,
    Input,
    Button,
    Card,
    Row,
    Col,
    message,
    Alert
} from "antd";
import axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";

interface IProps {
    form: any;
}

function Login(props: IProps) {
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                const user: any = {
                    email: values.email,
                    password: values.password
                };
                axios
                    .post(`/login`, user)
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res);
                            const token = res.data.token;
                            cookie.set("token", token, { expires: 1 });
                            Router.push("/");
                            message.success("Login Successful");
                        } else {
                            message.error(res);
                        }
                    })
                    .catch(err => {
                        console.log(err.response.data.message);
                        message.error(err.response.data.message);
                    });
            }
        });
    };

    const { getFieldDecorator } = props.form;
    return (
        <>
            <Auth title="Login">
                <style jsx>{`
                    #components-form-demo-normal-login .login-form {
                        max-width: 300px;
                    }
                    #components-form-demo-normal-login .login-form-forgot {
                        float: right;
                    }
                    #components-form-demo-normal-login .login-form-button {
                        width: 100%;
                    }
                `}</style>
                <div style={{ marginTop: "10%" }}>
                    <Row>
                        <Col span={8} offset={8} style={{ paddingTop: "50px" }}>
                            <Card title="Login">
                                <Form
                                    onSubmit={handleSubmit}
                                    className="login-form"
                                >
                                    <Form.Item>
                                        {getFieldDecorator("email", {
                                            rules: [
                                                {
                                                    type: "email",
                                                    message:
                                                        "The input is not valid E-mail!"
                                                },
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your E-mail!"
                                                }
                                            ]
                                        })(
                                            <Input
                                                prefix={
                                                    <Icon
                                                        type="user"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                placeholder="E-mail Address"
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("password", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your Password!"
                                                }
                                            ]
                                        })(
                                            <Input
                                                prefix={
                                                    <Icon
                                                        type="lock"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                type="password"
                                                placeholder="Password"
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="login-form-button"
                                            style={{ width: "150px" }}
                                        >
                                            Log in
                                        </Button>
                                        <a
                                            className="login-form-forgot"
                                            href=""
                                            style={{ float: "right" }}
                                        >
                                            Forgot password
                                        </a>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Auth>
        </>
    );
}

const LoginForm = Form.create({ name: "normal_login" })(Login);

export default LoginForm;
