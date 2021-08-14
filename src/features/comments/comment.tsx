import {Col, Row, Table} from "antd";

import {commentData} from "./commentData"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {useEffect} from "react";
import {fetchComments} from "./comment.reducer";
import {LOG_g} from "../utils";
const columns = [
    // { title: 'userName', dataIndex: 'id', key: 'userName' },
    { title: 'floor', dataIndex: 'floor', key: 'floor' },
    { title: 'room', dataIndex: 'room', key: 'roomNo' },
    { title: 'desk', dataIndex: 'desk', key: 'desk' },
    { title: 'suggestion', dataIndex: 'comment', key: 'suggestion' },
    { title: 'date', dataIndex: 'createdAt', key: 'date' },
];

const questionColumns = [
    {
        title: 'question',
        dataIndex: 'question',
    },
    {
        title: 'answer',
        dataIndex: 'answer',
    },
];

export const CommentsPage=() =>{
    const dispatch = useDispatch()

    const {comments, error, loadingStatus, queryType} = useSelector(
        (state: RootState) => state.comments
    )


    useEffect(() => {
        if (comments.length < 1) {
            dispatch(fetchComments({}))
            dispatch(LOG_g("comment--->", comments))
        }
        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
    }, [dispatch, comments])

    return <div style={{margin: "0 16px"}}>

            <Row  justify="space-between" align="stretch"  >
                <Col>
                    <h2>Comments</h2>
                </Col>


            </Row>


        <Row>
            <Col span="2"/>
            <Col span="20">
                <Table
                    key={"id"}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <div style={{ marginLeft: "15%" }}><Table columns={questionColumns} dataSource={record.answers} size="middle" /></div>,
                        // rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={comments}
                    loading={false}
                />
            </Col>
            <Col span="2"/>

        </Row>
    </div>;
}