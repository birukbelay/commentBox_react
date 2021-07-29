import React, {useEffect, useState} from 'react';
import { Layout, Breadcrumb, Menu, Space, Table, Tag, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {questions} from "./questionData";
import * as PropTypes from "prop-types";
import EditableTable from "./table";

const { Content, Header, Sider } = Layout;
const { Column, ColumnGroup } = Table;
const { SubMenu } = Menu;
// const { Link } = Anchor



const Dashboard=({account})=> {

    return (
        <Layout style={{minHeight: "100vh"}}>

            {/* SIde bar */}
            <Sider collapsible>

                <div style={{height: "32px", margin: "16px"}}/>
                <Menu defaultOpenKeys={['accounts']} defaultSelectedKeys={[questions.id ? questions.id.toString() : '']}
                      theme="dark" mode="inline">
                    <SubMenu key="accounts" icon={<UserOutlined/>} title="Accounts">
                        <Menu.Item>{account?.name}</Menu.Item>

                    </SubMenu>
                </Menu>
            </Sider>

            {/*  */}
            <Layout className="site-layout">
                <Header className="header">
                    {/*<div className="logo" />*/}
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                {/* <SiteHeader /> */}
                <Content style={{margin: '0 16px'}}>


                    <Row>
                        <Col>
                            <h2>Questions</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="4"/>
                        <Col span="16">
                            <EditableTable/>

                            {/*<NewComponent render={() => (*/}
                            {/*    <Space size="middle">*/}
                            {/*        <a>Update </a>*/}
                            {/*        <a>Delete</a>*/}
                            {/*    </Space>*/}
                            {/*)}/>*/}

                        </Col>
                        <Col span="4"/>
                    </Row>
                </Content>

            </Layout>

        </Layout>
    );
};
export default Dashboard;


function NewComponent(props) {
    return <Table dataSource={questions}>
        <ColumnGroup title="Name">
            <Column title="id" dataIndex="id" key="id"/>
            <Column title="question" dataIndex="question" key="question"/>
        </ColumnGroup>
        <Column
            title="Action"
            key="action"
            render={props.render}
        />
    </Table>;
}
NewComponent.propTypes = {render: PropTypes.func};