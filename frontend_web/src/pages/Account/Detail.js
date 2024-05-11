import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Row,
  Col,
  Image,
  Upload,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd";
import avatarDemo from "../../assets/icons/avatar.svg";
import { showNotiError } from "../../components/Notification";
import dayjs from "dayjs";
import { getUserById } from "../../redux/reducer/userSlice";
import { loadStatus } from "../../redux/reducer/recordSlice";
import "./detail.scss";
import { convertGenderToString } from "../../utils/dateUtils";

const { Option } = Select;
export default function Detail() {
  const dispatch = useDispatch();

  const [accountData, setData] = useState({});
  const dataState = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  useEffect(() => {
    dispatch(getUserById());
  }, []);
  useEffect(() => {
    if (dataState.loadUserDataStatus === loadStatus.Success) {
      const rawData = dataState.userData?.metadata[0];
      setData(rawData);
    }
  }, [dataState.loadUserDataStatus]);
  const handleSubmitButton = () => {};
  const handleChangeInput = () => {};
  return (
    <div className="account-info">
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
                <Input value={accountData.username} name="name" />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item label="Giới tính">
                <Input
                  value={convertGenderToString(accountData.gender)}
                  name="gender"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item label="Số điện thoại">
                <Input value={accountData.phone_number} name="name" />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item label="Ngày sinh">
                <DatePicker
                  format={"DD/MM/YYYY"}
                  name="ngày sinh"
                  value={dayjs()}
                  onChange={(date, dateString) => {}}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item label="Số bản ghi">
                <Input value={accountData.email} name="email" disabled/>
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item label="Quyền truy cập">
                <Input value={accountData.role} name="gender" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password defaultValue={"12345678"} />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item>
                <Button
                  type="primary"
                  className="account-submit-button"
                  onClick={handleSubmitButton}
                >
                  Lưu
                </Button>

                <Button>Hủy bỏ</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </div>
  );
}
