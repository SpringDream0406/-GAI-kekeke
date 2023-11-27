import React, { useState } from 'react'
import AdMenubar from '../component/AdMenubar'
import AdBG from '../ad_component/AdBG'
import AdMT from '../ad_component/AdMT'
import AdBarChart from '../ad_component/AdBarChart'
import '../ad_css/AdMain.css'
import { Link } from 'react-router-dom';
import AdHeader from '../component/AdHeader'



const AdMain = () => {

  const [activeSection, setActiveSection] = useState('ongoing'); // 'ongoing' 또는 'completed'

  // 임시 주문 데이터 상태
  const [orders] = useState([
    { id: 1, cakeName: 'ㅇㅇ케이크', userName: '정건식', orderDate: '2023.03.10' },
    { id: 2, cakeName: 'ㅇㅇ케이크', userName: '서유정', orderDate: '2023.03.10' },
    { id: 3, cakeName: 'ㅇㅇ케이크', userName: '송민아', orderDate: '2023.03.10' },
    { id: 4, cakeName: 'ㅇㅇ케이크', userName: '김은호', orderDate: '2023.03.10' },
    { id: 5, cakeName: 'ㅇㅇ케이크', userName: '김용민', orderDate: '2023.03.10' },
  ]);
  const renderOrderList = () => {
    return orders.map((order) => (
      <div key={order.id} className='admain-list-all'> {/* 임시 */}
  
        <div className='adlist-cname'>{order.cakeName}</div>
        <div className='adlist-uname'>{order.userName}</div>
        <div className='adlist-listday'>{order.orderDate}</div>
        <hr className='adlist-hr' />
      </div>
    ));
  };
  


  return (
    <div>

      <AdHeader></AdHeader>
      <AdMenubar />

      <AdMT>주문현황</AdMT>

      <AdBG height={1430}>


        <div className='ad-main-continer'>
          {/* activeSection 상태에 따라 조건부 렌더링 */}

          <div className={`admain-bfmsg ${activeSection === 'ongoing' ? 'active' : ''}`} onClick={() => setActiveSection('ongoing')}>상담중 10</div>
          <div className={`admain-afmsg ${activeSection === 'completed' ? 'active' : ''}`} onClick={() => setActiveSection('completed')}>주문완료 10</div>

          <Link className='admsgPlus' to='/admin/message'>+ 더보기</Link>

          {activeSection === 'ongoing' && (
            <div className='admain-msgbg-all'>
              <Link className='admain-msgbg1' to='/admin/message' >
                <div className='admain-msgmt'>채팅</div>
                <div className='admain-msgst'>상담중</div>
                <div className='admain-msg-cir' />
                <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg' alt='msg-uimg' />
                <div className='admin-msg-uname'>정건식 고객님</div>
                <div className='admin-msg-uday'>2023.10.30 접수</div>
              </Link>

              <Link className='admain-msgbg1' to='/admin/message' >
                <div className='admain-msgmt'>채팅</div>
                <div className='admain-msgst'>상담중</div>
                <div className='admain-msg-cir' />
                <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg' alt='msg-uimg' />
                <div className='admin-msg-uname'>정건식 고객님</div>
                <div className='admin-msg-uday'>2023.10.30 접수</div>
              </Link>

              <Link className='admain-msgbg1' to='/admin/message' >
                <div className='admain-msgmt'>채팅</div>
                <div className='admain-msgst'>상담중</div>
                <div className='admain-msg-cir' />
                <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg' alt='msg-uimg' />
                <div className='admin-msg-uname'>정건식 고객님</div>
                <div className='admin-msg-uday'>2023.10.30 접수</div>
              </Link>

              <Link className='admain-msgbg1' to='/admin/message' >
                <div className='admain-msgmt'>채팅</div>
                <div className='admain-msgst'>상담중</div>
                <div className='admain-msg-cir' />
                <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg' alt='msg-uimg' />
                <div className='admin-msg-uname'>정건식 고객님</div>
                <div className='admin-msg-uday'>2023.10.30 접수</div>
              </Link>

            </div>
          )}


          {activeSection === 'completed' && (

            <div className='admain-msgbg-all2'>

              <Link className='admain-msgbg2' to='/admin/message' >
                <div className='admain-msgmt2'>채팅</div>
                <div className='admain-msgst2'>상담완료</div>
                <div className='admain-msg-cir2' />
                <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg2' alt='msg-uimg' />
                <div className='admin-msg-uname2'>정건식 고객님</div>
                <div className='admin-msg-uday2'>2023.10.30 접수</div>
              </Link>

              <Link className='admain-msgbg2' to='/admin/message' >
                <div className='admain-msgmt2'>채팅</div>
                <div className='admain-msgst2'>상담완료</div>
                <div className='admain-msg-cir2' />
                <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg2' alt='msg-uimg' />
                <div className='admin-msg-uname2'>정건식 고객님</div>
                <div className='admin-msg-uday2'>2023.10.30 접수</div>
              </Link>


              <Link className='admain-msgbg2' to='/admin/message' >
                <div className='admain-msgmt2'>채팅</div>
                <div className='admain-msgst2'>상담완료</div>
                <div className='admain-msg-cir2' />
                <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg2' alt='msg-uimg' />
                <div className='admin-msg-uname2'>정건식 고객님</div>
                <div className='admin-msg-uday2'>2023.10.30 접수</div>
              </Link>

              <Link className='admain-msgbg2' to='/admin/message' >
                <div className='admain-msgmt2'>채팅</div>
                <div className='admain-msgst2'>상담완료</div>
                <div className='admain-msg-cir2' />
                <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg2' alt='msg-uimg' />
                <div className='admin-msg-uname2'>정건식 고객님</div>
                <div className='admin-msg-uday2'>2023.10.30 접수</div>
              </Link>

            </div>
          )}





          <div className='admain-mt2'>주문내역</div>
          <Link className='adproductPlus' to='/admin/orderlist'>+ 더보기</Link>
          <div className='admain-listtitle-all'>
            <div className='admain-list-mcn'>케이크 이름</div>
            <div className='admain-list-muname'>닉네임</div>
            <div className='admain-list-mday'>예약날짜</div>
          </div>
          <div className='admain-list-constainer'>
            {renderOrderList()}
          </div>



          <div className='admain-mt3'>판매량순위</div>
          <AdBarChart />

        </div>
      </AdBG>


    </div>
  )
}

export default AdMain