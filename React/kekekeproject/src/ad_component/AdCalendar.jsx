import React, { useState } from 'react'
import '../ad_css/AdCalendar.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import timeGridPlugin from '@fullcalendar/timegrid'; // 주 및 일 뷰를 위한 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 사용자 상호작용 플러그인


// 간단한 모달 컴포넌트 예시입니다. 실제 사용할 모달은 이보다 복잡할 수 있습니다.
const QuantityModal = ({ isOpen, onClose, date, onQuantitySubmit }) => {
  const [quantity, setQuantity] = useState('');
  
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setQuantity(parseInt(value, 10));
    }
  };
  


  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className='modalmt' >수량 등록</div>
        <input
            className='modalinput'
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
              min="0" // 최소값을 0으로 설정
              step="1" // 증가하는 단위를 1로 설정하여 정수만 입력받음
          />
      <button onClick={() => onQuantitySubmit(date, quantity)} className='modalokbtn'>등록</button>
      <button onClick={onClose} className='modalnobtn'>닫기</button>
    </div>
  );
};

const AdCalendar = () => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [events, setEvents] = useState([]); // 달력 이벤트를 저장할 상태
  

  // 날짜 클릭 이벤트 핸들러
 const handleDateClick1 = (arg) => {
    setSelectedDate(arg.dateStr); // 선택된 날짜 저장
    setModalOpen(true); // 모달 열기
  };


  // 달력의 날짜 셀에 적용할 클래스를 동적으로 결정하는 함수
  const dayCellClass = (date) => {
    return date.dateStr === selectedDate ? 'selected-date' : '';
  };



   // 수량 등록 이벤트 핸들러
  const handleQuantitySubmit = (date, quantity) => {

            // quantity가 문자열이므로 숫자로 변환
          const numericQuantity = parseInt(quantity, 10);

          // 수량이 0일 경우 품절로 표시하고, 그렇지 않으면 수량을 표시합니다.
          const eventTitle = numericQuantity === 0 ? '품절' : `수량: ${quantity}`;
          const existingEventIndex = events.findIndex(event => event.start === date);
          
          if (existingEventIndex > -1) {
            // 기존 이벤트가 있으면, 그 이벤트의 제목을 업데이트합니다.
            const updatedEvents = [...events];
            updatedEvents[existingEventIndex] = { ...updatedEvents[existingEventIndex], title: eventTitle };
            setEvents(updatedEvents);
          } else {
            // 기존 이벤트가 없으면, 새 이벤트를 추가합니다.
            const newEvent = {
              title: eventTitle,
              start: date,
              allDay: true
            };
            setEvents([...events, newEvent]);
          }
          setModalOpen(false); // 모달 닫기
};


  return (
    <div className='admin-cal-containder'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={koLocale}
        dateClick={handleDateClick1} // dateClick 이벤트에 핸들러 연결
        events={events}
        dayCellClassNames={dayCellClass} // 여기에서 날짜 셀 클래스를 동적으로 설정합니다.
      />
      <QuantityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        date={selectedDate}
        onQuantitySubmit={handleQuantitySubmit}
       
      />
    </div>
  );
};

export default AdCalendar;