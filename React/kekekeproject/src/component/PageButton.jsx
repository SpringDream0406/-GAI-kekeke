import React from 'react'
import '../css/PageButton.css'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

const PageButton = ({ type, onClick }) => {

    /*
    사용하실 jsx 파일에 복사해서 쓰세요 (버튼)
    import 예시)  <PageButton type="prev" onClick={goToPrervPage} />

     // 이전 페이지
      
      const goToPrervPage = () => {
        setCurrentPage(prev => prev > 1 ? prev - 1 : 1);
      };
    
        
       // 다음페이지 
        const goToNextrvPage = () => {
          setCurrentPage(prev => prev < reviewpageNum.length ? prev + 1 : reviewpageNum.length);
        };
      
    
    */

    /* (페이지)

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 3; // 한 페이지에 표시할 아이템 수
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = Reviews.slice(indexOfFirstItem, indexOfLastItem);
 

const reviewpageNum = [];
for (let i = 1; i <= Math.ceil(Reviews.length / itemsPerPage); i++) {
  reviewpageNum.push(i);
}


*** return문

{reviewpageNum.map(num => (
    <button
        key={num}
        onClick={() => setCurrentPage(num)}
        className={`page-number ${currentPage === num ? 'active' : ''}`}
    >
        {num}
    </button>
))}
    */
   
    return (
        <button onClick={onClick} className={`page-button ${type}`}>
            {type === 'prev' ? <FaArrowCircleLeft /> : <FaArrowCircleRight />}
        </button>
    );
};
export default PageButton