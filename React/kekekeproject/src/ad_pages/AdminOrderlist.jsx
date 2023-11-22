import React, { useState } from 'react'
import AdMT from '../ad_component/AdMT'
import Ad_Menubar from '../component/Ad_Menubar'
import Ad_BG from '../ad_component/Ad_BG'
import '../ad_css/AdminOrderlist.css';

const AdminOrderlist = () => {

    // 임시 주문 데이터
    const orders = [
        // 예시 데이터, 실제 데이터로 대체해야 합니다.
        {
            id: 1,
            cakeImage: "/assets/images/cake1.jpg",
            cakeName: '초콜릿 케이크',
            cakeSize: '1호',
            cakeFlavor: '다크 초콜릿',
            cakeText: '생일 축하해!',
            orderDate: '2023-11-22',
            pickupStatus: '픽업 대기',
            price: '35000원',
            buyerName: '정건식',
            buyerPhone: '010-1234-5678',
            specialRequest: '빨간 리본으로 포장해 주시고 어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고',
        },
          {
            id: 2,
            cakeImage: "/assets/images/cake3.jpg",
            cakeName: '티아라 케이크',
            cakeSize: '도시락',
            cakeFlavor: '바닐라',
            cakeText: '케케케 수고해또',
            orderDate: '2023-11-18',
            pickupStatus: '픽업 완료',
            price: '46000원',
            buyerName: '서유정',
            buyerPhone: '010-1234-5678',
            specialRequest: '글씨 너무 크게 하지 마시고11111111111글씨 너무 크게 하지 마시고 글씨 너무 크게 하지 마시고 글씨 너무 크게 하지 마시고'
        },
          {
            id: 3,
            cakeImage: "/assets/images/cake2.png",
            cakeName: '로또 케이크',
            cakeSize: '1호',
            cakeFlavor: '오레오',
            cakeText: '로또 번호',
            orderDate: '2023-11-22',
            pickupStatus: '픽업 대기',
            price: '35000원',
            buyerName: '정건식',
            buyerPhone: '010-1234-5678',
            specialRequest: '어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고'
          },
          {
            id: 4,
            cakeImage: "/assets/images/cake1.jpg",
            cakeName: '초콜릿 케이크',
            cakeSize: '1호',
            cakeFlavor: '다크 초콜릿',
            cakeText: '생일 축하해!',
            orderDate: '2023-11-22',
            pickupStatus: '픽업 대기',
            price: '35000원',
            buyerName: '정건식',
            buyerPhone: '010-1234-5678',
            specialRequest: '빨간 리본으로 포장해 주시고 어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고어쪼고저쩌고',
        },
    ];

    return (
        <div>
            <AdMT>주문내역</AdMT>
            <Ad_Menubar />
            <Ad_BG height={1600}>
            <div className='AOListContainer'>
                    <div className="AOListHeader">
                        <div className="AOCake">케이크</div>
                        <div className="AODetails">상세 내용</div>
                        <div className="AORequest">요청사항</div>
                        <div className="AOOrderInfo">주문 정보</div>
                        <div className="AOBuyer">구매자</div>
                    </div>
                    {orders.map(order => (
                        <div className="AOListBody" key={order.id}>
                            <div className="AOCake">
                                <img src={order.cakeImage} alt="케이크 이미지" className="CakeImage" />
                                <p>{order.cakeName}</p>
                            </div>
                            <div className="AODetails">
                                <p>사이즈: {order.cakeSize}</p>
                                <p>맛: {order.cakeFlavor}</p>
                                <p>문구: {order.cakeText}</p>
                            </div>
                            <div className="AORequest">
                                <p>{order.specialRequest}</p>
                            </div>
                            <div className="AOOrderInfo">
                                <p>{order.orderDate}</p>
                                <p>{order.pickupStatus}</p>
                                <p>가격: {order.price}</p>
                            </div>
                            <div className="AOBuyer">
                                <p>{order.buyerName}</p>
                                <p>{order.buyerPhone}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Ad_BG>
        </div>
    )
}

export default AdminOrderlist