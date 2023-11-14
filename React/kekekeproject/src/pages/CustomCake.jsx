import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Rect, Circle, Path, Text } from 'react-konva';
import { FaPencilAlt, FaEraser, FaPaintBrush, FaSquare, FaFont, FaHeart, FaCircle, FaTrash } from 'react-icons/fa';
import '../css/CustomCake.css';

const CustomCake = () => {
  const [tool, setTool] = React.useState('pen');
  const [elements, setElements] = React.useState([]);
  const isDrawing = React.useRef(false);
  const [color, setColor] = React.useState('#df4b26');
  const [lineWidth, setLineWidth] = React.useState(5);
  // 텍스트 상태와 위치를 위한 상태 추가
  const [text, setText] = useState('');
  const [textElements, setTextElements] = useState([]); // 텍스트 엘리먼트 배열 추가
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 }); // 초기 텍스트 위치 설정
  const nextId = useRef(0);
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [selectedTextIndex, setSelectedTextIndex] = useState(-1); // 선택된 텍스트 엘리먼트의 인덱스 추가

  const handleTextClick = (index) => {
    if (!isTextEditing) {
      setIsTextEditing(true);
    }
    setSelectedTextIndex(index); // 클릭한 텍스트 엘리먼트의 인덱스를 저장
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddText = () => {
    // 새로운 텍스트 엘리먼트를 생성하고 배열에 추가
    if (text.trim() !== '') {
      setTextElements([...textElements, { text, position: { x: textPosition.x, y: textPosition.y } }]);
      setText(''); // 입력 필드 비우기
    }
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    if (['pen', 'brush', 'eraser'].includes(tool)) {
      setElements([...elements, { tool, points: [pos.x, pos.y], color, lineWidth }]);
    } else {
      setElements([...elements, { tool, type: tool, x: pos.x, y: pos.y, color, lineWidth, width: 0, height: 0 }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastElement = elements[elements.length - 1];
    if (['pen', 'brush', 'eraser'].includes(tool)) {
      lastElement.points = lastElement.points.concat([point.x, point.y]);
    } else {
      lastElement.width = point.x - lastElement.x;
      lastElement.height = point.y - lastElement.y;
    }
    setElements(elements.slice(0, -1).concat(lastElement));
  };

  const handleDragEnd = (e, id) => {
    const { x, y } = e.target.position();
    setElements((prevElements) =>
      prevElements.map((elem) => {
        if (elem.id === id) {
          // 현재 드래그된 도형의 위치를 업데이트
          return { ...elem, x, y };
        }
        return elem;
      })
    );
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleLineWidthChange = (e) => {
    setLineWidth(e.target.value);
  };

  const selectTool = (selectedTool) => {
    setTool(selectedTool);
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
  

  return (
    <div className="custom-container">
      <div className="color-txt">색상 선택:</div>
      <div className="tool-selector">
        <input type="color" value={color} onChange={handleColorChange} className="color-picker" />
        <FaPencilAlt className={tool === 'pen' ? 'selected-tool' : ''} onClick={() => selectTool('pen')} size={20} />
        <FaPaintBrush className={tool === 'brush' ? 'selected-tool' : ''} onClick={() => selectTool('brush')} size={20} />
        <FaEraser className={tool === 'eraser' ? 'selected-tool' : ''} onClick={() => selectTool('eraser')} size={20} />
        <FaFont
            className={isTextEditing ? 'selected-tool' : ''}
            onClick={handleTextIconClick}
            size={20}
          />
        <FaSquare className={tool === 'rectangle' ? 'selected-tool' : ''} onClick={() => selectTool('rectangle')} size={20} />
        <FaCircle className={tool === 'circle' ? 'selected-tool' : ''} onClick={() => selectTool('circle')} size={20} />
        <FaHeart className={tool === 'heart' ? 'selected-tool' : ''} onClick={() => selectTool('heart')} size={20} />
    
       
        <FaTrash className="delete-tool" onClick={clearAll} size={20} title="전체 지우기" />
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
    <div className='doubletxt'>※더블클릭시에 삭제가 가능합니다</div>
    <button onClick={handleAddText } className='txt-plusbtn'>텍스트 추가</button> {/* 텍스트 추가 버튼 */}
  </div>
  
)}
{selectedTextIndex !== -1 && (
        <FaTrash className="delete-text" onClick={handleTextDelete} size={16} />
      )}



      <hr className="custom-hr" />
      <Stage width={1500} height={620} onMouseDown={handleMouseDown} onMousemove={handleMouseMove} onMouseup={handleMouseUp}>
        <Layer>
          {elements.map((elem, i) => {
            if (['pen', 'brush', 'eraser'].includes(elem.tool)) {
              return <Line key={i} points={elem.points} stroke={elem.color} strokeWidth={elem.lineWidth} tension={0.5} lineCap="round" lineJoin="round" globalCompositeOperation={elem.tool === 'eraser' ? 'destination-out' : 'source-over'} />;
            } else if (elem.type === 'rectangle') {
              return (
                <Rect
                  key={i}
                  x={elem.x}
                  y={elem.y}
                  width={elem.width}
                  height={elem.height}
                  fill={elem.color}
                  stroke={elem.color}
                  strokeWidth={elem.lineWidth}
                  draggable
                  onDragEnd={(e) => handleDragEnd(e, elem.id)}
                />
              );
            } else if (elem.type === 'circle') {
              return (
                <Circle
                  key={i}
                  x={elem.x + elem.width / 2}
                  y={elem.y + elem.height / 2}
                  radius={Math.abs(elem.width / 2)}
                  fill={elem.color}
                  stroke={elem.color}
                  strokeWidth={elem.lineWidth}
                  draggable
                  onDragEnd={(e) => handleDragEnd(e, elem.id)}
                />
              );
            } else if (elem.type === 'heart') {
              const heartPath = "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z";
              return (
                <Path
                  key={i}
                  data={heartPath}
                  x={elem.x}
                  y={elem.y}
                  fill={elem.color}
                  scaleX={elem.width / 100}
                  scaleY={elem.height / 100}
                  draggable
                  onDragEnd={(e) => handleDragEnd(e, elem.id)}
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
              onDragEnd={(e) => handleTextDragEnd(e, i)}
            />
          ))}
        </Layer>
      </Stage>
      <div className="next-button-container">
        <button className="custom-nextbutton">다음</button>
      </div>
    </div>
  );
};

export default CustomCake;
