import "./comment.css";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import Editor from "../../components/editor";
//Ant design imports
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
    Card
} from "antd";

import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import {PlaceData} from "./commentData";
import * as PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {fetchQuestions} from "../../features/questions/questions.reducer";

const { TextArea } = Input;
const { Header, Footer } = Layout;


const options = [
  { label: 'very bad', value: 'very bad' },
  { label: 'bad', value: 'bad' },
  { label: 'average', value: 'average' },
  { label: 'good', value: 'good' },
  { label: 'very good', value: 'very good' },
];
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



const TopBar = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };
  //components size
  type sizes ="small" | "middle" | "large" | undefined
  const [componentSize, setComponentSize] = useState<sizes>("middle");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  // the comments of the user
  const desc = ["አስቀያሚ", "መጥፎ", "ምንም አይልም", "አሪፍ", "እጅግ በጣም አሪፍ"];


  const {questions, error, loadingStatus, queryType} = useSelector(
      (state:RootState) => state.questions
  )
  useEffect(() => {
    if (questions.length < 1) {
      dispatch(fetchQuestions())
      // dispatch(LOG_g("questions", questions))
    }
    // Since we may have the issue already, ensure we're scrolled to the top
    window.scrollTo({top: 0})
  }, [dispatch, questions])

  const [comments, setComments] = useState({});

  const handleComment = (e, question) => {
    let value={
      id:question.id,
      question:question.question,
      answer:e.target.value
    }
    let cmnts=comments
    cmnts[question.id]=value

    setComments(cmnts);
    console.log("comments:", comments)
    console.log("comments.questionid:", comments[question.id])
    console.log("comments:qid.answer", comments[question.id].answer)

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
                // labelCol={{
                //   span: 6,
                // }}
                // wrapperCol={{
                //   span: 10,
                // }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                  satisfied: false,
                }}
                onValuesChange={onFormLayoutChange}

                size={componentSize}
            >
              <>
              {/* Size radio Group */}
              {/*<Form.Item rules={[{required: true}]} label=" Size ማስተካከያ" name="size">*/}
              {/*  <Radio.Group>*/}
              {/*    <Radio.Button value="small">Small</Radio.Button>*/}
              {/*    <Radio.Button value="default">Default</Radio.Button>*/}
              {/*    <Radio.Button value="large">Large</Radio.Button>*/}
              {/*  </Radio.Group>*/}
              {/*</Form.Item>*/}

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




              {/*Room and Desk */}
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
              <div>
                {questions.map((question) => (
                    <div>
                      <Form.Item label={question.question} style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "baseline",
                      }}>
                        <Radio.Group name="radiogroup" value={comments[question.id]?.answer}  onChange={(e => handleComment(e, question))} defaultValue={toolips[2][0]}>
                          <Radio value={toolips[2][0]}>{toolips[2][0]}</Radio>
                          <Radio value={toolips[2][1]}>{toolips[2][1]}</Radio>
                          <Radio value={toolips[2][2]}>{toolips[2][2]}</Radio>
                          <Radio value={toolips[2][3]}>{toolips[2][3]}</Radio>
                          <Radio value={toolips[2][4]}>{toolips[2][4]}</Radio>
                        </Radio.Group>
                        {console.log("ss--comments-", comments)}
                        {console.log("ss-- id->", question.id)}
                        {console.log("ss-- com[id].->", comments[question.id])}
                        {console.log("ss-- com[id].ans->", comments[question.id]?.answer)}
                        {/*<Radio.Group value={comments[question.id]?.answer}    options={options} onChange={(e => handleComment(e, question))}  />*/}
                      </Form.Item>

                    </div>

                ))}
              </div>


              {/* Rate */}

              {/*confirm success*/}
              <Form.Item label="የመጣህበትን ጉዳይ አሳክተሃል ወይ?" style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "baseline",
              }}>

                {questions.map(question => (
                    <>
                      {/*<SuggestionComponent questionId={question.id} question={question} character={({index}) => customFaceIcons[index + 1]} tooltips={desc} onChange={handleComment}*/}
                      {/*                     answer={5}                 />*/}
                    </>                  ))}
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
                <Button disabled={loadingState === 'loading'} loading={loadingState === 'loading'} danger={loadingColor=="danger"}
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
