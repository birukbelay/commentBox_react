import "./comment.css";

import { Link } from "react-router-dom";
import axios from "axios";

// import Editor from "../../components/editor";
//Ant design imports
import { FormInstance } from 'antd/lib/form';
import {
    Tag,
    Layout,
    Menu,
    Form,
    Input,
    Button,
    Radio,
    Rate,
    Cascader,
    Switch,
    Card, Dropdown, Space, Typography, Avatar
} from "antd";


import {PlaceData} from "./commentData";
import * as PropTypes from "prop-types";

import {fetchQuestions} from "../../features/questions/questions.reducer";
import React from "react";
import {API_ROOT} from "../../Constants/constants";
import {FrownOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";
import Routes from "../../Constants/routes";


const { TextArea } = Input;
const { Header, Footer } = Layout;


const options = {
    eng:[
    { label: 'very bad', value: 'very bad' },
    { label: 'bad', value: 'bad' },
    { label: 'average', value: 'average' },
    { label: 'good', value: 'good' },
    { label: 'very good', value: 'very good' },
    ],
    amh:[
    { label: 'አስቀያሚ', value: 'very bad' },
    { label: 'መጥፎ', value: 'bad' },
    { label: 'ምንም አይልም', value: 'average' },
    { label: 'ጥሩ', value: 'good' },
    { label: 'በጣም ጥሩ', value: 'very good' },
    ],
}
const customFaceIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};

const toolips={
    0:["ተናድጃለሁ", "ደብሮኛል", "ምንም አይልም", "ደስ ብሎኛል", "ረክቻለሁ"],
    1:["አስቀያሚ", "መጥፎ", "ምንም አይልም", "አሪፍ", "እጅግ በጣም አሪፍ"],
    2:["very bad", "bad", "average","good", "very good"]
}

class App extends React.Component {

   state = {
       componentSize: 'middle',
        questions: [],
       answers: {},
       loadingState: 'Submit',
       rate:0,
       error:null
    };
   formRef = React.createRef<FormInstance>();
    // const dispatch = useDispatch();


    onReset = () => {
        this.formRef.current!.resetFields();
    };

    componentDidMount() {
        if (this.state.questions.length < 1) {
            fetchQuestions()
            axios.get(API_ROOT+"questions").then(res => {
                console.log("res.data",res.data)
                this.setState({
                    questions: res.data.message.data,
                });
            }).catch(e=>{
                console.log("err===--", e)
                this.enterLoading("error")
            });

            window.scrollTo({top: 0})
        }

    }
    handleComment = (e, question) => {
        let value={
            id:question.id,
            question:question.question,
            answer:e.target.value
        }
        const {answers}=this.state
        let cmnts=answers
        cmnts[question.id]=value

        this.setState({
            comments: cmnts,
        });
        console.log("comments:", answers)
        console.log("comments.questionid:", answers[question.id])
        console.log("comments:qid.answer", answers[question.id].answer)

    };
    changeRate = (e) => {

        this.setState({
            rate: e.target.value,
        });


    };

    enterLoading = (loading) => {

        if(loading==="loading"){
            this.setState({
                loadingState: "loading",
            });

        }if(loading==="success"){
            this.setState({
                loadingState: "success",

            });

        }else{
            this.setState({
                loadingState: "error",
            });

        }

        setTimeout(() => {
            this.setState({
                loadingState: "Submit",

            });

        }, 6000);
    };
    onFinish=(formData)=> {
        console.log(formData);
        try{
            // this.enterLoading("loading")
            const comments=this.state.answers
            const answers =Object.entries(comments).map(([name, objs]) => objs)
            console.log("ansers",answers)


            const comment={
                floor: formData.residence[0],
                room: formData.residence[1],
                desk: formData.residence[2],
                first_name: formData.first_name,
                last_name: formData.last_name,
                answers: answers,
                comment:formData.comment

            }
            axios.post(API_ROOT+"comments", comment).then(res => {
                console.log("res.data",res.data)
                this.enterLoading("success");
                this.setState({
                    answers:{}
                })
                this.onReset()
            }).catch(e=>{
                console.log("err", e)
                console.log("err==>", e.message)
                this.enterLoading("error")
            });
        }catch (e){
            console.log("err=>", e)
        }



    }
render(){
    const { rate, questions, answers, loadingState, error } = this.state;
    console.log("q---",questions)
    console.log("stt---",this.state)
    return (
        <>
            {/* <Layout className=""> */}

            <Header>
                <div className="logo"/>

                <Menu theme="dark" style={{display:"flex",  justifyContent:"flex-end", }} mode="horizontal" defaultSelectedKeys={["2"]}>


                    <Dropdown
                        overlay={
                            <Menu>
                                <Link to="/login">
                                    <Menu.Item> Login</Menu.Item>
                                </Link>

                            </Menu>
                        }
                    >
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Space direction="horizontal" size="middle">
                                <Typography.Text>admin</Typography.Text>
                                <Link to={Routes.ADMIN}>
                                    <Avatar size="default">A</Avatar>
                                </Link>


                            </Space>
                        </div>
                    </Dropdown>
                </Menu>
            </Header>

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
                marginTop: "5%",
            }}>
                {/*<noform className="box-shadow" style={{ width: '90%', padding: 20 }}>*/}
                <Card hoverable style={{width: '80%'}}>
                    <>
                        <Form
                            ref={this.formRef}
                            onFinish={this.onFinish}
                            labelCol={{
                              span: 7
                            }}
                            wrapperCol={{
                              span: 20,
                            }}
                            layout="horizontal"

                        >

                            {/*Room and Desk */}
                            <Form.Item
                                style={{
                                    display: "flex",
                                    justifyContent: "stretch",
                                    alignItems: "center",
                                }}
                                name="residence"
                                label="ፎቅ ቁጥር / ቢሮ ቁ / ጠረቤዛ ቁ."
                                rules={[
                                    {
                                        type: "array",
                                        required: true,
                                        message: "Please enter the floor / room / desk!",
                                    },
                                ]}
                            >
                                <Cascader
                                    options={PlaceData}
                                    placeholder="Floor / RoomNumber / TableNumber"
                                />
                            </Form.Item>

                            <div>
                                {questions.map((question) => (
                                    <div>
                                        <Form.Item label={question.question}
                                                   rules={[
                                                       {
                                                           required: question.isRequired,
                                                           message: "this question is required",
                                                       },
                                                   ]}
                                                   style={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            alignItems: "baseline",
                                        }}>
                                            <Radio.Group value={answers[question.id]?.answer} options={options["eng"]} onChange={(e => this.handleComment(e, question))}  />
                                        </Form.Item>

                                    </div>

                                ))
                                }


                            </div>


                            {/*/!* Rate *!/*/}
                            {/*<Form.Item name="rate">*/}
                            {/*    <Rate*/}
                            {/*        defaultValue={3}*/}
                            {/*        character={customFaceIcons}*/}
                            {/*        tooltips={toolips[0]}*/}
                            {/*        onChange={(e => this.changeRate(e))}*/}
                            {/*        value={rate}*/}
                            {/*    />*/}
                            {/*</Form.Item>*/}

                            {/*confirm success*/}
                            <Form.Item label="የመጣህበትን ጉዳይ አሳክተሃል ወይ?" style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "baseline",
                            }}>


                                <Tag color="error">
                                    አይ
                                </Tag>
                                <Switch/>
                                <Tag color="success">
                                    አዎ
                                </Tag>


                            </Form.Item>

                            <Form.Item name="comment" label="ተጨማሪ አስተያየት">
                                <TextArea rows={7}/>
                            </Form.Item>


                            <Form.Item label="Submit">
                                <Button type={"primary"}
                                        loading={loadingState === 'loading'}
                                        danger={loadingState=="error"}
                                        htmlType="submit">
                                    {loadingState}
                                </Button>
                            </Form.Item>

                        </Form>
                    </>
                </Card>
                {/*<Link to="/signup">Register here</Link>*/}
                {/*</noform>*/}
            </div>


            {/*<div className="site-layout-content"></div>*/}

            {/* </Content> */}
            <Footer style={{textAlign: "center"}}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
            {/* </Layout>/ */}
        </>
    );
    }
};
export default App;




function SuggestionComponent({questionId, question, answer, character, onChange, tooltips, value}) {
    return <Form.Item name={questionId} label={question}>
        <div style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "baseline",
        }}>
            {/*<span className="ant-rate-text">{props.question}</span>*/}
            <Form.Item name="rate">
                <Rate
                    defaultValue={3}
                    character={character}
                    tooltips={tooltips}
                    onChange={(e => onChange(e, question))}
                    value={answer}
                />
            </Form.Item>

            {answer ? (
                // display name for the answer
                <span className="ant-rate-text">{tooltips[answer - 1]}</span>
            ) : (
                ""
            )}
        </div>

    </Form.Item>;
}

SuggestionComponent.propTypes = {
    character: PropTypes.func,
    tooltips: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    value: PropTypes.number
};
