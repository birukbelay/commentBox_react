import React, {useEffect, useState} from 'react';
import { Layout, Breadcrumb, Menu, Anchor, Table, Tag, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import locAccounts from "./accounts";
const { Content, Header, Sider } = Layout;
const { SubMenu } = Menu;
// const { Link } = Anchor

const Dashboard=({account})=> {



    const [selectedAccount, setSelectedAccount] = useState({});
    const [allAccounts, setAccounts] = useState(locAccounts);
    useEffect(() => {
        if (account) {
            setSelectedAccount(account.filter(account => account.id === account)[0])
        }
        else {
            setSelectedAccount( locAccounts[0])
        }
    },[])


    // this.state = {
    //     selectedAccount: selectedAccount,
    //     accounts: accounts,
    //     viewingTransactions: false
    // }


    const changeDashboard = (e) => {
        var key = e.key;
        setSelectedAccount(allAccounts.filter(account => account.id ===key)[0]);
    }


    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            sorter: {
                compare: (a, b) => a.amount - b.amount
            },
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: tags => {
                return tags.map(tag => {
                    return (<Tag color="blue" key={tag}>
                        {tag}
                    </Tag>);
                })
            }
        },
    ];

    var table = selectedAccount.transactions ? <Table dataSource={selectedAccount.transactions} columns={columns}/> : ''

    return (
        <Layout style={{ minHeight: "100vh" }}>

            {/* SIde bar */}
            <Sider collapsible>

                <div style={{ height: "32px", margin: "16px" }}/>
                <Menu defaultOpenKeys={['accounts']} defaultSelectedKeys={[selectedAccount.id ? selectedAccount.id.toString() : '']} theme="dark" mode="inline">
                    <SubMenu key="accounts" icon={<UserOutlined />} title="Accounts">
                        {
                            allAccounts.map((account, i) => {
                                return <Menu.Item onClick={(e) => changeDashboard(e)} key={account.id}>{account.name}</Menu.Item>
                            })
                        }
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
                <Content style={{ margin: '0 16px' }}>

                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>
                            <a href="/">Dashboard</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Row>
                        <Col>
                            <h2>{selectedAccount.name}</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="4"/>
                        <Col span="16">{table}</Col>
                        <Col span="4"/>
                    </Row>
                </Content>

            </Layout>

        </Layout >
    );
};
export default Dashboard;