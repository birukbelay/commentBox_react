import { Component, useState } from 'react';
import {Form, InputNumber} from "antd";

const AntDesingComponents =()=> {

    const [floor_number, setNumber] = useState({ value: 11 });

    const onNumberChange = (value) => {
        setNumber({ value });
    };

        return (
            <div>
                <Form.Item
                    name="floor"
                    label="floor 1 - 8"
                    rules={[{ required: true }]}
                    validateStatus={floor_number.validateStatus}
                    help={floor_number.errorMsg || ""}
                >
                    <InputNumber
                        defaultValue={3}
                        min={0}
                        max={8}
                        value={floor_number.value}
                        onChange={onNumberChange}
                    />
                </Form.Item>
            </div>
        );

}

export default AntDesingComponents;