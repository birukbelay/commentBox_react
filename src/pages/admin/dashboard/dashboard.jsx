import React from 'react';
import {Link, Route, Switch, useRouteMatch} from 'react-router-dom'

import {questions} from "../questions/questionData";
import * as PropTypes from "prop-types";
import Routes from "../../../Constants/routes";
import Profile from "../profile/Profile";
import {QuestionsPage} from "../questions/questions";
import "./dash.css"
import {Layout, Menu, Table, Breadcrumb} from 'antd';
import {UserOutlined} from '@ant-design/icons';
const { Content, Header, Sider } = Layout;
const { Column, ColumnGroup } = Table;
const { SubMenu } = Menu;

// const { Link } = Anchor


const Dashboard=({account})=> {
    let match = useRouteMatch();
    return (
        <Layout >
            {/* SIde bar */}
            <Sider style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }} collapsible >
                <div className="logo" >
                    Comment box
                </div>

                <Menu defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']}
                      theme="dark" mode="inline">
                    <SubMenu key="sub1" icon={<UserOutlined/>} title="Accounts">

                        <Menu.Item key="1">
                            <Link to={`${match.path}/`} >
                                questions
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={`${match.path}/`} >
                                comments
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={`${match.path}/profile/9`} >
                                profile
                            </Link>
                        </Menu.Item>

                    </SubMenu>
                </Menu>
            </Sider>






            {/*  */}
            <Layout className="site-layout" style={{ marginLeft: 200 }} >
                {/* <SiteHeader /> */}
                <Header style={{display:"flex" , alignItems:'stretch', justifyContent:'space-between',

                }} className="header">
                    <div className="logo" ></div>
                    <div className=" logo" >logout</div>

                    {/*<Menu theme="light"  mode="horizontal" defaultSelectedKeys={['2']}>*/}
                    {/*    <Menu.Item key="1">nav 1</Menu.Item>*/}
                    {/*    <Menu.Item key="2">nav 2</Menu.Item>*/}
                    {/*    <Menu.Item key="3">nav 3</Menu.Item>*/}
                    {/*</Menu>*/}

                </Header>
                <Layout style={{ padding: '0 24px 24px' }}>


                <Content className="site-layout-background"
                         style={{
                             padding: 24,
                             margin: 0,
                             minHeight: 280,
                         }}>
                <Switch>
                    <Route exact path={`${match.path}/`} component={QuestionsPage} />
                    <Route path={`${match.path}${Routes.PROFILE}`} component={Profile} />

                </Switch>
                </Content>



            </Layout>
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