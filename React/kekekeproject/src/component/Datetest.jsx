import React, { useState,  forwardRef} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // CSS 파일을 import 해야 합니다.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

function Datetest() {
    const [pickupDate, setPickupDate] = useState(new Date());
  
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
      <button className="to-custom-input to-day" ref={ref} onClick={onClick}>
        {value}
        <FontAwesomeIcon icon={faCalendarAlt} className='to-day-icon' />
      </button>
    ));
  
    return (
      <div>
        <label>픽업 날짜</label>
        <DatePicker
  selected={pickupDate}
  onChange={(date) => setPickupDate(date)}
  className="to-day"
  value={pickupDate}
  dateFormat="yyyy/MM/dd"
  customInput={<CustomInput value={pickupDate} />}
/>
      </div>
    );
  }
  

export default Datetest;
