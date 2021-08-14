import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Table, Input, Popconfirm, Form, Typography, Space, Tag, Select, Alert} from 'antd';
import {RootState} from 'app/rootReducer';
import {fetchQuestions, updateQuestions, deleteQuestions} from "./questions.reducer";

import {QuestionModel} from "./question.model";
import AddQuestion from "../../components/add-question";
import {Query, Status} from "../utils";


const originData = [
    {
        "isRequired": true,

        "question": "does they make effort to make you feel confortable",
        "id": "610d0d6e39cbb8406445efa1"
    },
];

const EditableTable = () => {
    const dispatch = useDispatch()
    const {questions, error, loadingStatus, queryType} = useSelector(
        (state: RootState) => state.questions
    )
    useEffect(() => {
        if (questions.length < 1) {
            dispatch(fetchQuestions())
            // dispatch(LOG_g("questions", questions))
        }
        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
    }, [dispatch, questions])


    type alertType= "success" | "info" | "warning" | "error"
    const [alert, setAlert] = useState<{visible:boolean, message:string, type:alertType}>({visible:false, message:"",type:"success" });
    useEffect(() => {
        if (loadingStatus==Status.SUCCESS && queryType==Query.UPDATE) {
            setAlert({visible:true, type:"success", message:"update successful"})
        }else if (loadingStatus==Status.ERROR && queryType==Query.UPDATE) {
            setAlert({visible:true, type:"error", message:"update Error please try again"})
        }else if (loadingStatus==Status.SUCCESS && queryType==Query.CREATE) {
            setAlert({visible:true, type:"success", message:"create successful"})
        }else if (loadingStatus==Status.ERROR && queryType==Query.CREATE) {
            setAlert({visible:true, type:"error", message:"create Error"})
        }else if (loadingStatus==Status.SUCCESS && queryType==Query.DELETE) {
            setAlert({visible:true, type:"success", message:"deleted successfully"})
        }else if (loadingStatus==Status.ERROR && queryType==Query.DELETE) {
            setAlert({visible:true, type:"error", message:"delete Error"})
        }
        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
        setTimeout(() => {
            setAlert({visible:false, ...alert});
        }, 6000);
    }, [dispatch, loadingStatus])
    const handleClose = () => {
        setAlert({...alert, visible: false});
    };



    const [form] = Form.useForm();

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;


    const [modalOpen, setModal]= useState(false);

    const edit = (record) => {
        form.setFieldsValue({
            question: '',
            id: '',
            isRequired: '',
            ...record,
        });
        setEditingKey(record.id);
        // setModal(true)
    };



    const cancel = () => {
        setEditingKey('');
    };

    const Delete = (record) => {
        dispatch(deleteQuestions(record.id))

    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            console.log("row==>", row, editingKey)
            dispatch(updateQuestions(editingKey, row))
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
       {
            title: 'question',
            dataIndex: 'question',
            width: '70%',
            editable: true,
        },
        {
            title: 'Required question',
            dataIndex: 'isRequired',
            width: '15%',
            editable: true,
            render: (_: any, record: {  id:string, isRequired:boolean }) => {
                const editable = isEditing(record);
                let color = record.isRequired ? 'volcano' : 'green';
                // @ts-ignore
                return (
                    <Tag color={color}>
                    {record.isRequired.toString()}
                </Tag>)


            },
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: {  id:string }) => {
                const editable = isEditing(record);
                // @ts-ignore
                return editable ? (
                    <span>
                           <Popconfirm title="Sure to change?" onConfirm={() => save(record.id)}>
                            <a
                                href="javascript:;"
                                // onClick={() => save(record.key)}
                                style={{
                                    marginRight: 8,
                                }}
                            >
                              Save
                            </a>
                           </Popconfirm>
                           <a onClick={() => cancel()}>  Cancel</a>

                  </span>
                ) : (
                    <Space size={"middle"}>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={()=>Delete(record)}>
                            <a >  Delete</a>
                        </Popconfirm>

                    </Space>

                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'isRequired' ? 'boolean' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });




    return (
        <>
            {alert.visible ? (
                <Alert message={alert.message} type={alert.type} closable afterClose={handleClose} />
            ) : null}
            <AddQuestion id={editingKey} editMode={true} isOpen={modalOpen} onClose={()=>setModal(false)}/>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}

                    bordered
                    dataSource={questions}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </>

    );
};

export default EditableTable;


const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {

    const inputNode = inputType === 'boolean' ?
        <Select defaultValue={record.isRequired.toString()} className="select-before">
        <Select.Option value="true">yes</Select.Option>
        <Select.Option value={"false"}>no</Select.Option>
    </Select>: <Input/>


    return (
        <td {...restProps}>
            {
                editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
