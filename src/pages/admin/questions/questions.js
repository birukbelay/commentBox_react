import {Col, Row} from "antd";
import EditableTable from "./table";
import React from "react";

export function QuestionsPage() {
    return <div style={{margin: "0 16px"}}>
        <Row>
            <Col>
                <h2>Questions</h2>
            </Col>
        </Row>

        <Row>
            <Col span="4"/>
            <Col span="16">
                <EditableTable/>


            </Col>
            <Col span="4"/>
        </Row>
    </div>;
}