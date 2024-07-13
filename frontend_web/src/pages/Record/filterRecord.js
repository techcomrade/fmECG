import { Button, Card, DatePicker, Form, Input } from "antd";
import { useState } from "react";
import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import './record.scss';
import { useTranslation  } from "react-i18next";

const FilterRecord = () => {
  const [form] = Form.useForm();
  const [isCollapse, setIsCollapse] = useState(true);
  const {t} = useTranslation();
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
      title={t("button.search")}
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
              label={t("column.user-name")}
              name={"user_id"}
              key={"user_id"}
            >
              <Input allowClear/>
            </Form.Item>
            <Form.Item
              label={t("column.device-name")}
              name={"device_id"}
              key={"device_id"}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              label={t("column.date-started")}
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
              label={t("column.date-finished")}
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
              {t("button.refresh")}
            </Button>
            <Button className="button search" onClick={() => form.submit()}>
            {t("button.search")}
            </Button>
          </div>
        </div>
        
      )
      }
      
    </Card>
  );
}

export default FilterRecord;
