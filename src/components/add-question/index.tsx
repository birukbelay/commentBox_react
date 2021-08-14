import {Modal, Form, Input, Button, Checkbox} from "antd";
import {createQuestions, updateQuestions, getQuestion, deleteQuestions} from "../../features/questions/questions.reducer";
import {useDispatch, useSelector} from "react-redux";
import {QuestionModel} from "../../features/questions/question.model";
import {questionState} from "../../features/questions/questions.selectors";
import {useEffect, useState} from "react";
import {Query, Status} from "../../features/utils";

const AddQuestion = ({ isOpen, onClose, id, editMode }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const state = useSelector(state => state)
  const {queryType, error, loadingStatus, question } =questionState(state);


  const [status, setStatus]= useState({loading:false, error:null})
  const [fields, setFields]= useState({question:"", isRequired:false, id:""})



  useEffect(() => {
    form.setFieldsValue({ question: fields.question, required:fields.isRequired });
  }, [fields]);

  useEffect(() => {
    if(id){
      dispatch(getQuestion(id))
    }
  }, [fields]);

  useEffect(() => {
    if ("question" in question) {
      setFields({question: question.question, isRequired: question.isRequired, id: question.id});
    }
  }, [question]);

  useEffect(() => {
    if(queryType===Query.CREATE ||queryType===Query.UPDATE){
      switch (loadingStatus) {
        case Status.NORMAL:
          setStatus({loading:false, error: null});
          return
        case Status.ERROR:
          setStatus({loading:false, error: error});
          setTimeout(() => {
            setStatus({loading:false, error: null});
          }, 1000);
          return
        case Status.LOADING:
          setStatus({...status, loading:true});
          return
        case Status.SUCCESS:
          form.resetFields()
          setStatus({loading:false, error: null});
          return
        default:
          setStatus({loading:false, error: null});
      }
    }
  }, [loadingStatus]);

  const handleSubmit = (values) => {
    const data={
      question: values.question,
      isRequired:values.required
    }
    console.log("values==>", values)
    if(editMode){
      dispatch(updateQuestions(id, values))
    }
    else{
      dispatch(createQuestions(data))
    }

  }

  return (
    <>
      <Modal title="Add Question" visible={isOpen} onCancel={onClose} footer={[]}>
        <Form form={form} initialValues={{}} onFinish={handleSubmit}>
          {/*description*/}
          <Form.Item
              name="question"
              rules={[
                { required: true, message: "Please input question!" },
              ]}
          >
            <Input.TextArea rows={5} placeholder="Question" />
          </Form.Item>

          <Form.Item name="required"  valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox checked={false}>is this question required</Checkbox>
          </Form.Item>

          <Button
              type='primary'
              disabled={loadingStatus===Status.LOADING}
              danger={!!status.error}
              loading={status.loading}
              htmlType="submit"
              style={{ width: "200px" }}
          >
            {editMode?"Update Question":"Create Question"}
          </Button>
        </Form>
        {!!status.error?<div>{status.error}</div>:"" }


      </Modal>
    </>
  );
};

export default AddQuestion;
