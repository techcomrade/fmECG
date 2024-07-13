import { Button, Card, DatePicker, Form, Input } from "antd";
import { useState } from "react";
import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import './record.scss';
import { useTranslation  } from "react-i18next";
import dayjs from "dayjs";

const FilterRecord = (props) => {
  const [form] = Form.useForm();
  const [isCollapse, setIsCollapse] = useState(true);
  const {t} = useTranslation();
  const handleOnFinish = (values) => {
    const payload = {
      ...values,
      start_time: values.start_time?.startOf('day').valueOf(),
      end_time: values.end_time?.endOf('day').valueOf()
    }
    props.filterFunction(payload);
  }

  const handleReset = () => {
    form.resetFields();
    props.filterFunction();
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
                disabledDate={(day) => {
                  const startDate = form.getFieldValue('start_time');
                  return day && day < dayjs(startDate);
                }}
              />
            </Form.Item>
          </Form>
          <div className="filter-button">
            <Button
              className="button refresh"
              onClick={handleReset}
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
