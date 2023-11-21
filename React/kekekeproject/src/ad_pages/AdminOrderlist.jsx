import React, {useState} from 'react'
import AdMT from '../ad_component/AdMT'
import Ad_Menubar from '../component/Ad_Menubar'
import Ad_BG from '../ad_component/Ad_BG'
import '../ad_css/AdminOrderlist.css';

const AdminOrderlist = () => {

  // 임시 주문 데이터
  const [orders, setOrders] = useState([
    {
        id: 1,
        cakeImage: 'assets/images/cake1.jpg',
        cakeName: '타이어케이크',
        size: '1호',
        flavor: '바닐라',
        frosting: 'X',
        orderDate: '2023.10.31',
        price: '45,000'
    },
    // ... 기타 주문들 ...
]);


    return (
        <div>
            <AdMT>주문내역</AdMT>
            <Ad_Menubar />
            <Ad_BG>
            
            </Ad_BG>
        </div>
    )
}

export default AdminOrderlist