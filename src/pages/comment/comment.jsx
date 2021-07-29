import "./comment.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as gConsts from "../../store/constants";
// import Editor from "../../components/editor";
//Ant design imports
import {
  Tag,
  Layout,
  Menu,
  Breadcrumb,
  Form,
  Input,
  Button,
  Radio,
  Rate,
  Cascader,
  Switch,
    Card
} from "antd";

import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import {PlaceData} from "./commentData";
import * as PropTypes from "prop-types";
import {useDispatch} from "react-redux";

const { TextArea } = Input;
const { Header, Footer } = Layout;

const questions=[
  {
    questionNO:1,
    question:"", //this canNotBeUpdated
    icons:{},
    iconsIndex:1,
    tooltips:[],
    tooltipsIndex:1,

  }
]

const responses=[
  {
    id:"",
    question:"",
    answer:""
  }
]

const toolips={
  1:["አስቀያሚ", "መጥፎ", "ምንም አይልም", "አሪፍ", "እጅግ በጣም አሪፍ"],
  2:["very bad", "bad", "average","good", "very good"]
}
const customFaceIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const iconsArray={
  1:customFaceIcons,
}



function SuggestionComponent(props) {
  return <Form.Item name={props.questionId} label={props.question}>
    <div style={{
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "baseline",
    }}>
      {/*<span className="ant-rate-text">{props.question}</span>*/}
      <Form.Item name="rate">
        <Rate
            defaultValue={3}
            character={props.character}
            tooltips={props.tooltips}
            onChange={props.onChange}
            value={props.value}
        />
      </Form.Item>

      {props.value ? (
          // display name for the value
          <span className="ant-rate-text">{props.tooltips[props.value - 1]}</span>
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

const TopBar = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  //components size
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  // the comments of the user
  const desc = ["አስቀያሚ", "መጥፎ", "ምንም አይልም", "አሪፍ", "እጅግ በጣም አሪፍ"];
  const questions=["ምን ያህል ተደስተካል?", "በቀናነት ተስተናግደካል?","በደንብ ተባብረውካል ?"]

  const [comment1, setComment1] = useState(1);
  const [comment2, setComment2] = useState(0);
  const [comment3, setComment3] = useState(0);

  const handleComment1Change = (value) => {
    dispatch({"2":2})
    setComment1(value);
  };
  const handleComment2Change = (value) => {
    dispatch({"2": 2})
    setComment2(value);
  };
  const handleComment3Change = (value) => {
    dispatch({"3":3})
      setComment3(value);
    };

  const [loadingState, setLoadingState] = useState("Submit");
  const [loadingColor, setLoadingColor] = useState("primary");


  const enterLoading = (loading) => {
    if(loading==="success"){

      setLoadingState("success");
      setLoadingColor("info");
    }else{
      setLoadingState("error");
      setLoadingColor("danger");
    }

    setTimeout(() => {
      setLoadingState("Submit");
      setLoadingColor("primary");
      
    }, 6000);
  };



  async function onFinish(formData) {
    console.log(formData);
    setLoadingState("loading")

    const comment={
      floor: formData.residence[0],
      room: formData.residence[1],
      desk: formData.residence[2],
      first_name: formData.first_name,
      last_name: formData.last_name,
    }
    try {
      const res = await axios.post("/comments", comment);
      var val=await res;
      enterLoading("success");
      
      form.resetFields();
      return val
    } catch (err) {
      enterLoading("error");
      
      console.log("err", err);
    }
  }

  return (
    <>
      {/* <Layout className=""> */}

      <Header>
        <div className="logo"/>

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Link to="/" style={{fontWeight: "bold", fontSize: "23px"}}>
            <Menu.Item> Home</Menu.Item>
          </Link>
        </Menu>
      </Header>
      {/* <Content style={{ padding: '0 50px' }}> */}

      <Breadcrumb style={{margin: "16px 0"}}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
        {/*<noform className="box-shadow" style={{ width: '90%', padding: 20 }}>*/}
        <Card hoverable style={{width: '65%'}}>
          <>
            <Form
                form={form}
                onFinish={onFinish}
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 10,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                  satisfied: false,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
              {/* Size radio Group */}
              <Form.Item rules={[{required: true}]} label=" Size ማስተካከያ" name="size">
                <Radio.Group>
                  <Radio.Button value="small">Small</Radio.Button>
                  <Radio.Button value="default">Default</Radio.Button>
                  <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <>
                 {/*user  name */}
                {/*<Form.Item label="Name">*/}
                {/*  <Input.Group size={componentSize}>*/}
                {/*    <div style={{*/}
                {/*      display: "flex",*/}
                {/*      justifyContent: "space-between",*/}
                {/*      alignItems: 'stretch',*/}
                {/*    }}>*/}
                {/*      <Form.Item style={{marginRight: "5%"}} rules={[{required: true}]} name="first_name">*/}
                {/*        <Input rules={[{required: true}]} placeholder="first name" name="first_name"/>*/}
                {/*      </Form.Item>*/}

                {/*      <Form.Item rules={[{required: true}]} name="last_name">*/}
                {/*        <Input placeholder="last name" name="last_name"/>*/}
                {/*      </Form.Item>*/}
                {/*    </div>*/}
                {/*  </Input.Group>*/}
                {/*</Form.Item>*/}
              </>




              {/*Room and Number*/}
              <Form.Item
                  style={{
                    display: "flex",
                    justifyContent: "stretch",
                    alignItems: "center",
                  }}
                  name="residence"
                  label="ህንጻ ቁጥር / ቢሮ ቁ / ጠረቤዛ ቁ."
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


              {/* Rate */}
              <SuggestionComponent questionId={1} question={questions[0]} character={({index}) => customFaceIcons[index + 1]} tooltips={desc} onChange={handleComment1Change}
                            value={comment1}/>
              <SuggestionComponent questionId={1} question={questions[1]} character={({index}) => customFaceIcons[index + 1]} tooltips={desc} onChange={handleComment2Change}
                            value={comment2}/>
              <SuggestionComponent questionId={1} question={questions[2]} character={({index}) => customFaceIcons[index + 1]} tooltips={desc} onChange={handleComment3Change}
                            value={comment3}/>


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
                <Button disabled={loadingState === 'loading'} loading={loadingState === 'loading'} type={loadingColor}
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
};
export default TopBar;
