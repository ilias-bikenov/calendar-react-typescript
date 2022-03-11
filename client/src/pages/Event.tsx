import { Button, Layout, Modal, Row, Space } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvents';

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(null);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { guests, events } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);
  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    setModalVisible(false);
    createEvent(event);
  };

  return (
    <Layout>
      <Row justify="end" style={{ padding: 12, paddingRight: 56 }}>
        <Space direction="vertical" size={122}>
          <Button onClick={() => setModalVisible(true)}>Add event</Button>
        </Space>
      </Row>
      <EventCalendar events={events} setModalVisible={setModalVisible} />
      <Modal
        title="Add event"
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
