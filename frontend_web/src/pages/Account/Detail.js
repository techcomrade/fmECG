import React, { useEffect, useState } from "react";
import { Row, Col, Image, Upload, Form, Input, Button, Select, DatePicker } from "antd";
import avatarDemo from "../../assets/icons/avatar.svg";
import { getLocalStorage } from "../../utils/storageUtils";
import { httpPostData } from "../../api/common.api";
import { showNotiError } from "../../components/Notification";
const { Option } = Select;
export default function Detail() {
  let [accountData, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const userName = getLocalStorage('username');
      await httpPostData('/user-token', {name: userName})
       .then(data => setData(data[0]))
       .catch(e => showNotiError(e.message))
    }
    fetchData();
    console.log(accountData);
   }, [refresh]);
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
                <Input value={accountData.birthday} name="birthday" />  
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
