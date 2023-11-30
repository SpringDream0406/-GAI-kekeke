import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Circle, Path, Text } from 'react-konva';
import { FaPencilAlt, FaEraser, FaSquare, FaFont, FaHeart, FaCircle, FaTrash } from 'react-icons/fa';
import '../css/CustomCake.css';
import { useNavigate,Link } from 'react-router-dom';
import html2canvas from 'html2canvas';




const CustomCake = () => {



  const navigate = useNavigate();
  const [tool, setTool] = React.useState(null); // 'pen'을 null로 변경
  const [elements, setElements] = React.useState([]);
  const isDrawing = React.useRef(false);
  const [color, setColor] = React.useState('#df4b26');
  const [lineWidth, setLineWidth] = React.useState(5);
  // 텍스트 상태와 위치를 위한 상태 추가
  const [text, setText] = useState('');
  const [textElements, setTextElements] = useState([]); // 텍스트 엘리먼트 배열 추가
  const [textPosition,] = useState({ x: 50, y: 50 }); // 초기 텍스트 위치 설정
  const nextId = useRef(0);
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [selectedTextIndex, setSelectedTextIndex] = useState(-1); // 선택된 텍스트 엘리먼트의 인덱스 추가
  const stageRef = useRef(null);
const [savedImage, setSavedImage] = useState(null);
const [capturedImage, setCapturedImage] = useState(null);


const handleSave = () => {
  const uri = stageRef.current.toDataURL(); // toDataURL()을 사용하여 데이터 URL을 가져옴
  
  localStorage.setItem('savedImage', uri); // 로컬 스토리지에 저장
  setSavedImage(uri); // 이미지 데이터를 상태에 저장
  navigate('/customcake/order', { state: { image: uri } }); // 이미지 데이터와 함께 네비게이트
  window.scrollTo(0, 0); // 화면 상단으로 스크롤 이동
};


useEffect(() => {
  // 캔버스에 변화가 있을 때 실행될 로직
  if (elements.length > 0 || textElements.length > 0) {
    // 캔버스의 상태가 변화하면 이미지 캡처 함수를 호출
    captureImage();
  }
}, [elements, textElements]); // elements 혹은 textElements 상태가 바뀔 때마다 useEffect가 실행됩니다.

const captureImage = () => {
  if (stageRef.current) {
    html2canvas(stageRef.current.getStage(), { useCORS: true })
      .then((canvas) => {
        const dataURL = canvas.toDataURL('image/png');
        setCapturedImage(dataURL); // 캡처된 이미지의 데이터 URL을 상태에 저장
      })
      .catch((error) => {
        console.error('An error occurred while capturing the image:', error);
      });
  }
};




const handleTextClick = (index) => {
  // 텍스트를 클릭하면 그리기 상태를 비활성화하고 선택된 텍스트 인덱스를 설정합니다.
  setIsTextEditing(true);
  setSelectedTextIndex(index);
};

  const handleAddText = () => {
    // 새로운 텍스트 엘리먼트를 생성하고 배열에 추가
    if (text.trim() !== '') {
      setTextElements([...textElements, { text, position: { x: textPosition.x, y: textPosition.y } }]);
      setText(''); // 입력 필드 비우기
    }
  };

  const handleMouseDown = (e) => {
    if (!tool) return;
  
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    
    // 새로운 도형을 생성합니다.
    const newElement = {
      id: nextId.current.toString(),
      tool,
      type: tool,
      points: [pos.x, pos.y],
      color,
      lineWidth,
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
    };
    setElements([...elements, newElement]);
    nextId.current += 1;
  };
  
  

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastElement = elements[elements.length - 1];
    
    // 도형을 업데이트합니다.
    if (['pen', 'brush', 'eraser'].includes(tool)) {
      lastElement.points = lastElement.points.concat([point.x, point.y]);
    } else {
      lastElement.width = point.x - lastElement.x;
      lastElement.height = point.y - lastElement.y;
    }
    setElements(elements.slice(0, -1).concat(lastElement));
  };
  
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleDragEnd = (e) => {
    const id = e.target.id();
    const { x, y } = e.target.position();
    setElements(prevElements =>
      prevElements.map(elem => {
        if (elem.id === id) {
          // 현재 드래그된 도형의 위치를 업데이트합니다.
          return { ...elem, x, y };
        }
        return elem;
      })
    );
  
    // 드래그가 끝나면 그리기 상태를 비활성화합니다.
    isDrawing.current = false;
    // 선택된 도구도 해제합니다.
    setTool(null);
    // 선택된 텍스트도 해제합니다.
    setSelectedTextIndex(-1);
  };


  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handleLineWidthChange = (e) => {
    setLineWidth(Number(e.target.value)); // 두께를 숫자로 변환하여 상태를 업데이트
  };

  const selectTool = (selectedTool) => {
   // 도구를 선택하면 현재 선택된 도형/텍스트의 선택 상태를 초기화합니다.
  if (tool !== selectedTool) {
    setSelectedTextIndex(-1); // 선택된 텍스트 없음으로 설정
    // 추가적으로, 선택된 도형이 있다면 그 선택 상태도 초기화해야 합니다.
    // 예를 들어, Konva.Node를 사용하여 선택된 도형을 추적하고 있으면 해당 노드의 선택 상태를 초기화합니다.
  }
  setTool(currentTool => currentTool === selectedTool ? null : selectedTool);
  };
  const clearAll = () => {
    setElements([]);
  };

  // 텍스트 드래그 엔드 핸들러
  const handleTextDragEnd = (e, index) => {
    const { x, y } = e.target.position();
    // 텍스트 엘리먼트 배열에서 해당 인덱스의 위치를 업데이트
    setTextElements((prevTextElements) =>
      prevTextElements.map((elem, i) => (i === index ? { ...elem, position: { x, y } } : elem))
    );
    
  };
  const handleTextIconClick = () => {
    setIsTextEditing(!isTextEditing);
  };

  const handleTextDelete = () => {
    if (selectedTextIndex !== -1) {
      const newTextElements = [...textElements];
      newTextElements.splice(selectedTextIndex, 1); // 선택한 텍스트 엘리먼트 제거
      setTextElements(newTextElements);
      setSelectedTextIndex(-1); // 선택 취소
    }
  };





// 드래그 시작 시 도형을 최상위로 이동시키는 함수
const handleDragStart = (e) => {
// 드래그 시작 시 그리기 상태를 비활성화하고 도형을 최상위로 이동합니다.
const shape = e.target;
shape.moveToTop();
shape.getLayer().batchDraw();
isDrawing.current = false;
setSelectedTextIndex(-1); // 선택된 텍스트 없음으로 설정
};



  return (
    <div className="custom-container">
      <div className="color-txt">색상 선택:</div>
      <div className="tool-selector">
        <input type="color" value={color} onChange={handleColorChange} className="color-picker" />
        <FaPencilAlt className={tool === 'pen' ? 'selected-tool' : ''} onClick={() => selectTool('pen')} size={20} />
       
        <FaEraser className={tool === 'eraser' ? 'selected-tool' : ''} onClick={() => selectTool('eraser')} size={20} />
        <input
    type="range"
    min="1"
    max="50"
    value={lineWidth}
    onChange={handleLineWidthChange}
    className="line-width-slider"
  />
        <FaFont
            className={isTextEditing ? 'selected-tool' : ''}
            onClick={handleTextIconClick}
            size={20}
          />
        <FaSquare className={tool === 'rectangle' ? 'selected-tool' : ''} onClick={() => selectTool('rectangle')} size={20} />
        <FaCircle className={tool === 'circle' ? 'selected-tool' : ''} onClick={() => selectTool('circle')} size={20} />
        <FaHeart className={tool === 'heart' ? 'selected-tool' : ''} onClick={() => selectTool('heart')} size={20} />

       
        <FaTrash className="delete-tool" onClick={clearAll} size={20} title="전체 지우기" />
        
      
      {/* 저장된 이미지를 표시하고 싶다면 다음과 같이 이미지 태그를 사용할 수 있습니다. */}
      {savedImage && <img src={savedImage} alt="Saved" />}
        <div className="tooltxt">※ 툴 선택시 더블클릭 해주세요</div>
      </div>
      {isTextEditing && (
  <div>
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="텍스트를 입력하세요"
      className="text-input"
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleAddText(); // 엔터 키 눌렀을 때 텍스트 추가
        }
      }}
    />
    
    <div className='doubletxt'>※텍스트 클릭시에 삭제가 가능합니다</div>
    <button onClick={handleAddText } className='txt-plusbtn'>텍스트 추가</button> {/* 텍스트 추가 버튼 */}
  </div>
  
)}
{selectedTextIndex !== -1 && (
        <FaTrash className="delete-text" onClick={handleTextDelete} size={16} />
      )}



      <hr className="custom-hr" />
      <Stage ref={stageRef} width={1500} height={620} onMouseDown={handleMouseDown} onMousemove={handleMouseMove} onMouseup={handleMouseUp}>
        <Layer>
          {elements.map((elem, i) => {
            if (['pen', 'brush', 'eraser'].includes(elem.tool)) {
              return <Line key={i} points={elem.points} stroke={elem.color} strokeWidth={elem.lineWidth} tension={0.5} lineCap="round" lineJoin="round" globalCompositeOperation={elem.tool === 'eraser' ? 'destination-out' : 'source-over'} />;
            } else if (elem.type === 'rectangle') {
              return (
                
                <Rect
                id={elem.id}
                  key={i}
                  x={elem.x}
                  y={elem.y}
                  width={elem.width}
                  height={elem.height}
                  fill={elem.color}
                  stroke={elem.color}
                  strokeWidth={elem.lineWidth}
                 draggable={!['pen', 'brush', 'eraser', 'rectangle', 'circle', 'heart'].includes(tool)}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
                  
                />
              );
            } else if (elem.type === 'circle') {
              return (
                <Circle
                id={elem.id}
                  key={i}
                  x={elem.x + elem.width / 2}
                  y={elem.y + elem.height / 2}
                  radius={Math.abs(elem.width / 2)}
                  fill={elem.color}
                  stroke={elem.color}
                  strokeWidth={elem.lineWidth}
                  draggable={!['pen', 'brush', 'eraser', 'rectangle', 'circle', 'heart'].includes(tool)}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
                />
              );
            } else if (elem.type === 'heart') {
              const heartPath = "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z";
              return (
                <Path
                id={elem.id}
                  key={i}
                  data={heartPath}
                  x={elem.x}
                  y={elem.y}
                  fill={elem.color}
                  scaleX={elem.width / 100}
                  scaleY={elem.height / 100}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              );
            }
            return null;
          })}
          {textElements.map((elem, i) => (
            <Text
              key={i}
              text={elem.text}
              x={elem.position.x}
              y={elem.position.y}
              fontSize={20}
              
              draggable={isTextEditing}
              onClick={handleTextClick}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
   
        </Layer>
      </Stage>
      <Link className="next-button-container" to={`/customcake/order?image=${encodeURIComponent(capturedImage)}`}>
      <button onClick={handleSave} className='custom-nextbutton'>저장하고 계속</button>
      {savedImage && <img src={savedImage} alt="Saved" />}
      </Link>
    
      
 
    </div>
  );
};

export default CustomCake;
