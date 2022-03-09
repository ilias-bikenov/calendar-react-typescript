import { Calendar } from 'antd';
import React, { FC } from 'react';
import { IEvent } from '../models/IEvents';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
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

  return <Calendar dateCellRender={dateCellRender} />;
};

export default EventCalendar;
