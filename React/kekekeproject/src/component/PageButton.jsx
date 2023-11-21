import React from 'react';

const PageButton = ({ pages, currentPage, onPageChange }) => {
  return (
    <div className="pagination-container">
      {Array.from({ length: pages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PageButton;