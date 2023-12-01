import React, { useState, useEffect } from 'react';
import AdMT from '../ad_component/AdMT';
import AdMenubar from '../component/AdMenubar';
import AdBG from '../ad_component/AdBG';
import '../ad_css/AdminOrderlist.css';
import PageButton from '../component/PageButton';
import AdHeader from '../component/AdHeader';
import axios from 'axios'; // axios 라이브러리 추가
import API_URL from '../api_url';

const AdminOrderlist = () => {
  // sellerOrders 상태 초기화
  const [sellerOrders, setSellerOrders] = useState([]);

  // 페이지네이션을 위한 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수

  const [sellerinfo, setSellerInfo] = useState({});
  const [sellerId, setSellerID] = useState([]);

  // 세션 스토리지에서 데이터 불러오기
  useEffect(() => {
    const adminStorageData = sessionStorage.getItem('adminData');
    if (adminStorageData) {
      const adminData = JSON.parse(adminStorageData);
      setSellerInfo(adminData);
      setSellerID(adminData.seller_id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sellerId) {
          const response = await axios.post(`${API_URL}/seller/sellerorderlist`, {
            sellerId: sellerId,
          });
          const responseData = response.data;
          console.log('받아온 값 ', responseData);
          setSellerOrders(responseData.sellerorders);
        }
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
    fetchData();
  }, [sellerId]);

  // 날짜를 받아서 "YYYY-MM-DD" 형식으로 변환하는 함수
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 맞춤
    const day = String(date.getDate()).padStart(2, '0'); // 일도 2자리로 맞춤
    return `${year}-${month}-${day}`;
  }

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 따라 표시할 주문 목록을 계산하지 않고, 해당 페이지의 데이터만 표시
  const currentOrders = sellerOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동
  const reversedOrders = [...currentOrders].reverse();

  return (
    <div>
      <AdHeader />
      <PageButton
        pages={Math.ceil(sellerOrders.length / itemsPerPage)} // 페이지 수 계산
        currentPage={currentPage}
        onPageChange={onPageChange}
        marginTop={'1800px'}
      />

      <AdMT>주문내역</AdMT>
      <AdMenubar />
      <AdBG height={1600}>
        <div className="AOListContainer">
          <div className="AOListHeader">
            <div className="AOCake">케이크</div>
            <div className="AODetails">상세 내용</div>
            <div className="AORequest">요청사항</div>
            <div className="AOOrderInfo">주문 정보</div>
            <div className="AOBuyer">구매자</div>
          </div>
          {reversedOrders.map((order, index) => (
            <div className="AOListBody" key={order.PRD_ID}>
              <div className="AOCake">
                <img src={`/img/product/${order.IMG_NAME2}`} alt="케이크 이미지" className="CakeImage" />
                <p>{order.CAKE_NAME}</p>
              </div>
              <div className="AODetails">
                <p>사이즈: {order.CAKE_SIZE}</p>
                <p>맛: {order.CAKE_PRICE}</p>
                <p>문구: {order.LETTERING}</p>
              </div>
              <div className="AORequest">
                <p>{order.ADD_REQUIRE}</p>
              </div>
              <div className="AOOrderInfo">
                <p>{formatDate(order.SALE_DY)}</p>
                <p>가격: {order.CAKE_PRICE}</p>
              </div>
              <div className="AOBuyer">
                <p>{order.NICK_NAME}</p>
                <p>{order.PHONE}</p>
              </div>
            </div>
          ))}
        </div>
      </AdBG>
    </div>
  );
};

export default AdminOrderlist;
