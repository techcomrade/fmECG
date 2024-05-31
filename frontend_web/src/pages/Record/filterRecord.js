import { Button, Card, DatePicker, Form, Input } from "antd";
import { useState } from "react";
import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import './record.scss';

const FilterRecord = () => {
  const [form] = Form.useForm();
  const [isCollapse, setIsCollapse] = useState(true);

  const handleOnFinish = (values) => {
    const payload = {
      ...values,
      start_time: values.start_time?.valueOf(),
      end_time: values.end_time?.valueOf()
    }
    console.log(payload);
  }

  return (
    <Card 
      title="Tìm kiếm" 
      bordered={false}
      extra={
        <span className="collapse-icon" onClick={() => setIsCollapse(!isCollapse)}>
          {isCollapse ? <UpCircleOutlined /> : <DownCircleOutlined />}
        </span>
      }  
      className="card-filter"
    >
      {isCollapse && (
        <div>
          <Form 
            form={form}
            layout="vertical"
            className="form-filter"
            onFinish={handleOnFinish}
          >
            <Form.Item
              label={"Tên người dùng"}
              name={"user_id"}
              key={"user_id"}
            >
              <Input allowClear/>
            </Form.Item>
            <Form.Item
              label={"Tên thiết bị"}
              name={"device_id"}
              key={"device_id"}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              label={"Thời gian bắt đầu"}
              name={"start_time"}
              key={"start_time"}
            >
              <DatePicker
                allowClear
                format="DD/MM/YYYY"
                placeholder={"Select date"}
              />
            </Form.Item>
            <Form.Item
              label={"Thời gian kết thúc"}
              name={"end_time"}
              key={"end_time"}
            >
              <DatePicker
                allowClear
                format="DD/MM/YYYY"
                placeholder={"Select date"}
              />
            </Form.Item>
          </Form>
          <div className="filter-button">
            <Button
              className="button refresh"
              onClick={() => form.resetFields()}
            >
              Làm mới
            </Button>
            <Button className="button search" onClick={() => form.submit()}>
              Tìm kiếm
            </Button>
          </div>
        </div>
        
      )
      }
      
    </Card>
  );
}

export default FilterRecord;
