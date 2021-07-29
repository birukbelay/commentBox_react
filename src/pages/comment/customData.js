import {Form, Rate} from "antd";
import React from "react";
import {FrownOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";


const comment={
    userid:"", userName:"",
    floor:"",
    roomNo:"",
    Desk:"",
    date:"",

    sujestion:"",
    answers:[
        {
            id:"_id",
            question:"question",
            answer:"the answer given"
        }
    ]





}

const questi=["ምን ያህል ተደስተካል?", "በቀናነት ተስተናግደካል?","በደንብ ተባብረውካል ?"]

const questions=[
    {
        questionId:1,
        question:"ምን ያህል ተደስተካል?", //this canNotBeUpdated
        iconsIndex:1,
        tooltipsIndex:1,
        isRequired:true

    },{
        questionId:1,
        question:"በቀናነት ተስተናግደካል?", //this canNotBeUpdated
        tooltipsIndex:1,
        iconsIndex:1,
        isRequired:true
    },{
        questionId:1,
        question:"በደንብ ተባብረውካል ?", //this canNotBeUpdated
        tooltipsIndex:1,
        iconsIndex:1,
        isRequired:true,

        icons:{},
        tooltips:[],
    },
]


const responses={
    questionId:"response"
}

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

const iconsCollection={
    "face":customFaceIcons,
}


function SuggestionComponent(props) {


    return <Form.Item name="rate" label="rate">
        <div style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "baseline",
        }}>
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
