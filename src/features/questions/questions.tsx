import {Col, Row, Button, Space, Typography} from "antd";
import { PlusCircleTwoTone} from "@ant-design/icons";
import EditableTable from "./table";
import AddQuestion from "../../components/add-question";
import {useState} from "react";


export const QuestionsPage=() =>{
    const [modalOpen, setModal]= useState(false);
    return <div style={{margin: "0 16px"}}>

            <Row  justify="space-between" align="stretch"  >
                <Col>
                    <h2>Questions</h2>
                </Col>
                <Col>
                    <Button
                        type="default"
                        style={{ width: "150px" }}
                        onClick={() => setModal(true)}
                    >
                        <PlusCircleTwoTone />
                        Add Question
                    </Button>
                </Col>


            </Row>


        <AddQuestion id={""} editMode={false} isOpen={modalOpen} onClose={()=>setModal(false)}/>

        <Row>
            <Col span="4"/>
            <Col span="16">
                <EditableTable/>
            </Col>
            <Col span="4"/>
        </Row>
    </div>;
}