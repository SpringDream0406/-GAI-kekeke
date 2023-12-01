import React, { useState , useEffect} from 'react'
import AdMenubar from '../component/AdMenubar'
import AdBG from '../ad_component/AdBG'
import AdMT from '../ad_component/AdMT'
import AdBarChart from '../ad_component/AdBarChart'
import '../ad_css/AdMain.css'
import { Link } from 'react-router-dom';
import AdHeader from '../component/AdHeader'
import axios from 'axios'; // axios 라이브러리 추가
import API_URL from '../api_url';




const AdMain = () => {

  const [activeSection, setActiveSection] = useState('ongoing'); // 'ongoing' 또는 'completed'
  // 서브바의 현재 선택된 탭 상태
  const [sellerinfo, setSellerInfo] = useState({});
  const [sellerId, setSellerId] = useState();
  const [sellerChat, setSellerChat] = useState([]);

// 세션 스토리지에서 데이터 불러오기
useEffect(() => {
  const adminStorageData = sessionStorage.getItem('adminData');
  if (adminStorageData) {
    const adminData = JSON.parse(adminStorageData);
    setSellerInfo(adminData);
    setSellerId(adminData.seller_id)
  }
}, []);

  useEffect(() => {
    console.log('동작', sellerId);
    // 클라이언트에서 보내는 요청
    const fetchData = async () => {
      try {
        if (sellerId) {
          const response = await axios.post(`${API_URL}/chatroom/sellerchatroom`, { sellerId: sellerId });
          const responseData = response.data;
  
          console.log('받아온 값', responseData);
          setSellerChat(responseData);
        }
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
    fetchData();
  }, [sellerId]);

console.log(sellerChat);

  // 임시 주문 데이터 상태
  const [orders] = useState([
    { id: 1, cakeName: '키치케이크', userName: '서깡이', orderDate: '2023.12.01' },
    { id: 2, cakeName: '물감케이크', userName: '퍼피야', orderDate: '2023.11.30' },
    { id: 3, cakeName: '리본케이크', userName: '이태신', orderDate: '2023.11.30' },
    { id: 4, cakeName: '곰돌이케이크', userName: '산리오', orderDate: '2023.11.28' },
    { id: 5, cakeName: '곰돌이루피케이크', userName: '산리오', orderDate: '2023.11.22' },
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
          <div className={`admain-afmsg ${activeSection === 'completed' ? 'active' : ''}`} onClick={() => setActiveSection('completed')}>주문완료 1</div>

          <Link className='admsgPlus' to='/admin/message'>+ 더보기</Link>

          {activeSection === 'ongoing' && (
            <div className='admain-msgbg-all'>
              <Link className='admain-msgbg1' to='/admin/message' >
                <div className='admain-msgmt'>채팅</div>
                <div className='admain-msgst'>상담중</div>
                <div className='admain-msg-cir' />
                <img src={'img/cust/kkang1.jpeg'} className='admin-msg-uimg' alt='msg-uimg' />
                <div className='admin-msg-uname'>서깡이 고객님</div>
                <div className='admin-msg-uday'>2023.12.01 접수</div>
              </Link>

              <Link className='admain-msgbg1' to='/admin/message' >
                <div className='admain-msgmt'>채팅</div>
                <div className='admain-msgst'>상담중</div>
                <div className='admain-msg-cir' />
                <img src={'img/cust/doghaha.png'} className='admin-msg-uimg' alt='msg-uimg' />
                <div className='admin-msg-uname'>퍼피야 고객님</div>
                <div className='admin-msg-uday'>2023.11.30 접수</div>
              </Link>

              <Link className='admain-msgbg1' to='/admin/message' >
                <div className='admain-msgmt'>채팅</div>
                <div className='admain-msgst'>상담중</div>
                <div className='admain-msg-cir' />
                <img src={'img/cust/cathaha.png'} className='admin-msg-uimg' alt='msg-uimg' />
                <div className='admin-msg-uname'>이태신 고객님</div>
                <div className='admin-msg-uday'>2023.11.30 접수</div>
              </Link>

              <Link className='admain-msgbg1' to='/admin/message' >
                <div className='admain-msgmt'>채팅</div>
                <div className='admain-msgst'>상담중</div>
                <div className='admain-msg-cir' />
                <img src={'img/cust/sanrio.png'} className='admin-msg-uimg' alt='msg-uimg' />
                <div className='admin-msg-uname'>산리오 고객님</div>
                <div className='admin-msg-uday'>2023.11.28 접수</div>
              </Link>

            </div>
          )}


          {activeSection === 'completed' && (

            <div className='admain-msgbg-all2'>

              <Link className='admain-msgbg2' to='/admin/message' >
                <div className='admain-msgmt2'>채팅</div>
                <div className='admain-msgst2'>상담완료</div>
                <div className='admain-msg-cir2' />
                <img src={'img/cust/sanrio.png'} className='admin-msg-uimg2' alt='msg-uimg' />
                <div className='admin-msg-uname2'>산리오 고객님</div>
                <div className='admin-msg-uday2'>2023.11.22 접수</div>
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