import React, { useState } from 'react'
import '../ad_css/AdCalendar.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const AdCalendar = () => {

  return (
    
    <div className='admin-cal-containder'>
        
        <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
    />
    </div>
  )
}

export default AdCalendar