import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Image, Upload, Form, Input, Button, Select, DatePicker } from "antd";
import avatarDemo from "../../assets/icons/avatar.svg";
import { showNotiError } from "../../components/Notification";
import dayjs from "dayjs";
import { getUserById } from "../../redux/reducer/userSlice";
const { Option } = Select;
export default function Detail() {
  const dispatch = useDispatch();

  const [accountData, setData] = useState([]);
  const dataState = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserById())
   }, []);

  return (
    <div>
    <Col span={22} offset={1}>
      <br />
      <Row>
        <Col>
          <div>
            <Image width={100} src={avatarDemo}></Image>
          </div>
        </Col>
        <Col>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // beforeUpload={beforeUpload}
            // onChange={handleChange}
          >
            {/* {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )} */}
          </Upload>
        </Col>
      </Row>
      <br />
      <Form layout="vertical">
        <Row>
          <Col span={10}>
            <Form.Item label="Họ và tên">
              <Input value={accountData.name} name="name" />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="Giới tính">
                <Input value={accountData.gender} name="gender" />
              </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item label="Email">
              <Input value={accountData.email} name="email" />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="Ngày sinh">
            <DatePicker
                format={"DD/MM/YYYY"}
                name="ngafy sinh"
                value={ dayjs()}
                onChange={(date, dateString) =>
                  {
                    
                  }
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item>
              <Button type="primary">Lưu</Button>
              <Button>Hủy bỏ</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Col>
  </div>
  );
}
