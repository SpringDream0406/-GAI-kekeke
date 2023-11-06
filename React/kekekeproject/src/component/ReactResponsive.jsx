import React from 'react';
import { useMediaQuery } from 'react-responsive';

// Mobile 컴포넌트: 화면이 1439px 이하인 경우에 children을 렌더링
export const Mobile = ({ children }) => {
  // useMediaQuery 훅을 사용하여 화면 너비가 1439px 이하인 경우를 감지
  const isMobile = useMediaQuery({
    query: "(max-width: 1439px)"
  });
  
  // isMobile이 true일 경우 children을 렌더링
  return <>{isMobile && children}</>;
}

// PC 컴포넌트: 화면이 1440px 이상인 경우에 children을 렌더링
export const PC = ({ children }) => {
  // useMediaQuery 훅을 사용하여 화면 너비가 1440px 이상인 경우를 감지
  const isPc = useMediaQuery({
    query: "(min-width: 1440px)"
  });
  
  // isPc가 true일 경우 children을 렌더링
  return <>{isPc && children}</>;
}
