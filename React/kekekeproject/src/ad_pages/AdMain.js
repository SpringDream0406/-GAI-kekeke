import React , { useState  }from 'react'
import Ad_Menubar from '../component/Ad_Menubar'
import Ad_BG from '../ad_component/Ad_BG'
import AdMT from '../ad_component/AdMT'
import AdBarChart from '../ad_component/AdBarChart'
import '../ad_css/Ad_Main.css'
import { Link } from 'react-router-dom';



const AdMain = () => {
  
 
  const [activeSection, setActiveSection] = useState('ongoing'); // 'ongoing' 또는 'completed'
 

  return (
    <div className='ad-main-continer'>
     

        <Ad_Menubar/>
        
        <AdMT>주문현황</AdMT>

         <div className={`admain-bfmsg ${activeSection === 'ongoing' ? 'active' : ''}`} onClick={() => setActiveSection('ongoing')}>상담중 10</div>
         <div className={`admain-afmsg ${activeSection === 'completed' ? 'active' : ''}`} onClick={() => setActiveSection('completed')}>주문완료 10</div>

{/* activeSection 상태에 따라 조건부 렌더링 */}
{activeSection === 'ongoing' && (
        <div className='admain-msgbg-all'>
           
          <Link className='admain-msgbg1' to='/admin/message' >
            <div className='admain-msgmt'>채팅</div>
            <div className='admain-msgst'>상담중</div>
            <div className='admain-msg-cir'/>
            <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg'/>
            <div className='admin-msg-uname'>정건식 고객님</div>
            <div className='admin-msg-uday'>2023.10.30 접수</div>
          </Link>

          <Link className='admain-msgbg1' to='/admin/message' >
            <div className='admain-msgmt'>채팅</div>
            <div className='admain-msgst'>상담중</div>
            <div className='admain-msg-cir'/>
            <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg'/>
            <div className='admin-msg-uname'>정건식 고객님</div>
            <div className='admin-msg-uday'>2023.10.30 접수</div>
          </Link>

          <Link className='admain-msgbg1' to='/admin/message' >
            <div className='admain-msgmt'>채팅</div>
            <div className='admain-msgst'>상담중</div>
            <div className='admain-msg-cir'/>
            <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg'/>
            <div className='admin-msg-uname'>정건식 고객님</div>
            <div className='admin-msg-uday'>2023.10.30 접수</div>
          </Link>

          <Link className='admain-msgbg1' to='/admin/message' >
            <div className='admain-msgmt'>채팅</div>
            <div className='admain-msgst'>상담중</div>
            <div className='admain-msg-cir'/>
            <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg'/>
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
            <div className='admain-msg-cir2'/>
            <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg2'/>
            <div className='admin-msg-uname2'>정건식 고객님</div>
            <div className='admin-msg-uday2'>2023.10.30 접수</div>
          </Link>

          <Link className='admain-msgbg2' to='/admin/message' >
            <div className='admain-msgmt2'>채팅</div>
            <div className='admain-msgst2'>상담완료</div>
            <div className='admain-msg-cir2'/>
            <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg2'/>
            <div className='admin-msg-uname2'>정건식 고객님</div>
            <div className='admin-msg-uday2'>2023.10.30 접수</div>
          </Link>


          <Link className='admain-msgbg2' to='/admin/message' >
            <div className='admain-msgmt2'>채팅</div>
            <div className='admain-msgst2'>상담완료</div>
            <div className='admain-msg-cir2'/>
            <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg2'/>
            <div className='admin-msg-uname2'>정건식 고객님</div>
            <div className='admin-msg-uday2'>2023.10.30 접수</div>
          </Link>

          <Link className='admain-msgbg2' to='/admin/message' >
            <div className='admain-msgmt2'>채팅</div>
            <div className='admain-msgst2'>상담완료</div>
            <div className='admain-msg-cir2'/>
            <img src={'assets/images/cake1.jpg'} className='admin-msg-uimg2'/>
            <div className='admin-msg-uname2'>정건식 고객님</div>
            <div className='admin-msg-uday2'>2023.10.30 접수</div>
          </Link>

        </div>
         )}

         <div className='admain-mt2'>주문내역</div>
         <div className='admain-listtitle-all'>
            <div className='admain-list-mcn'>케이크 이름</div>
            <div className='admain-list-muname'>닉네임</div>
            <div className='admain-list-mday'>예약날짜</div>
         </div>
         <div className='admain-list-constainer'>
              <Link className='admain-list-all'>
                  <div className='adlist-cname'>ㅇㅇ케이크</div>
                  <div className='adlist-uname'>홍길동</div>
                  <div className='adlist-listday'>2023.03.10</div>
                  <hr className='adlist-hr'/>
              </Link>
                <Link className='admain-list-all'>
                    <div className='adlist-cname'>ㅇㅇ케이크</div>
                    <div className='adlist-uname'>홍길동</div>
                    <div className='adlist-listday'>2023.03.10</div>
                    <hr className='adlist-hr'/>
                </Link>

                <Link className='admain-list-all'>
                    <div className='adlist-cname'>ㅇㅇ케이크</div>
                    <div className='adlist-uname'>홍길동</div>
                    <div className='adlist-listday'>2023.03.10</div>
                    <hr className='adlist-hr'/>

                    <Link className='admain-list-all'>
                    <div className='adlist-cname'>ㅇㅇ케이크</div>
                    <div className='adlist-uname'>홍길동</div>
                    <div className='adlist-listday'>2023.03.10</div>
                    <hr className='adlist-hr'/>
                </Link>
                <Link className='admain-list-all'>
                    <div className='adlist-cname'>ㅇㅇ케이크</div>
                    <div className='adlist-uname'>홍길동</div>
                    <div className='adlist-listday'>2023.03.10</div>
                    <hr className='adlist-hr'/>
                </Link>
                </Link>
         </div>


         
         <div className='admain-mt3'>판매량순위</div>
       <AdBarChart />
        <Ad_BG height="1330px"/>
        

    </div>
  )
}

export default AdMain