import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { showNotiSuccess } from "../../components/Notification";
const { Option } = Select;
const {httpPostData} = require('../../api/common.api')
export default function CreateUser() {
    const [name,setName] = useState('');
    const [code,setCode] = useState('');
    const [gender,setGender] = useState('');
    const [birthday,setBirthday] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [school,setSchool] = useState('');
    const [faculty,setFaculty] = useState('');

    const navigate = useNavigate();
    const HandleSubmit = async (e)=>{
        e.preventDefault();
        const data = {
            name: name,
            code: code,
            gender: gender,
            birthday: birthday,
            email: email,
            password: password,
            school: school,
            faculty: faculty,
        }
        console.log(data);
        let dataInsert = await httpPostData('/create-user', data);
        console.log(dataInsert);
        showNotiSuccess('Bạn đã tạo người dùng mới thành công')
        navigate('/users');
    }
  return (
    <div>
    <Col span={22} offset={1}>
      <Form layout="vertical">
        <Row>
          <Col span={10}>
            <Form.Item label="Họ và tên">
              <Input name="name"  onChange={e => setName(e.target.value)}/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          
          <Col span={10} offset={0}>
            <Form.Item label="Giới tính">
                {/* <Select
                placeholder="Chọn giới tính"
                allowClear
                name="gender"
                >
                    <Option value={'male'} selected>Nam</Option>
                    <Option value={'female'}>Nữ</Option>
                </Select> */}
                <Input name="gender" onChange={(e) => setGender(e.target.value)}/>
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="Ngày sinh">
                {/* <DatePicker name="birthday" onChange={(e) => setBirthday(e.target.value)}/>   */}
                <Input name="birthday" onChange={(e) => setBirthday(e.target.value)}/>

            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item label="Email">
              <Input name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="Mật khẩu">
              <Input
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item>
              <Button type="primary" onClick={(e) => HandleSubmit(e)}>Thêm</Button>
              <Button>Hủy bỏ</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Col>
  </div>
  );
}
