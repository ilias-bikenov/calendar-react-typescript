import { Calendar } from 'antd';
import React, { FC } from 'react';
import { IEvent } from '../models/IEvents';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';
import { useActions } from '../hooks/useActions';

interface EventCalendarProps {
  events: IEvent[];
  setModalVisible: any;
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
  const { setDate } = useActions();

  const onSelect = (value: Moment) => {
    setDate(value);
    props.setModalVisible(true);
  };

  function dateCellRender(date: Moment) {
    const formatedDate = formatDate(date.toDate());
    const currentDayEvents = props.events.filter(
      (event) => event.date === formatedDate
    );
    return (
      <div>
        {currentDayEvents.map((event, index) => (
          <div key={index}>{event.description}</div>
        ))}
      </div>
    );
  }

  return <Calendar onSelect={onSelect} dateCellRender={dateCellRender} />;
};

export default EventCalendar;
