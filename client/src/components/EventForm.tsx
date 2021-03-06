import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import moment, { Moment } from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvents';
import { IUser } from '../models/IUser';
import { formatDate } from '../utils/date';
import { rules } from '../utils/rules';

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}
const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: '',
  } as IEvent);
  const { date: stateDate } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    selectDate(stateDate);
  }, [stateDate]);

  const selectDate = (date: Moment | null | undefined) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate()) });
    }
  };

  const submitForm = () => {
    props.submit({ ...event, author: user.username });
    form.resetFields();
  };

  return (
    <Form onFinish={submitForm} form={form}>
      <Form.Item
        label="Event description"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        initialValue={stateDate}
        label="Event date"
        name="date"
        rules={[
          rules.required(),
          rules.isFuture('Can not create an event on a past date'),
        ]}
      >
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>

      <Form.Item label="Choose guest" name="guest" rules={[rules.required()]}>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row justify="end">
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
