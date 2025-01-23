import React, { useState } from 'react';

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const createPagination = (totalPages, currentPage) => {
    let pages = [];
    let pageCutLow = currentPage - 1;
    let pageCutHigh = currentPage + 1;

    // Show the Previous button only if you are on a page other than the first
    // if (currentPage > 1) {
    //   pages.push(
    //     <li key="prev" className="page-item">
    //       <a onClick={() => onPageChange(currentPage - 1)}>Previous</a>
    //     </li>
    //   );
    // }

    // Show all the pagination elements if there are less than 6 pages total
    if (totalPages < 6) {
      for (let p = 1; p <= totalPages; p++) {
        pages.push(
          <li key={p} className={`nav-item ${currentPage === p ? 'active' : ''}`}>
            <a onClick={() => onPageChange(p)}>{p}</a>
          </li>
        );
      }
    } else {
      // Show the very first page followed by a "..." at the beginning
      if (currentPage > 2) {
        pages.push(
          <li key={1} className="nav-item">
            <a onClick={() => onPageChange(1)}>1</a>
          </li>
        );
        if (currentPage > 3) {
          pages.push(
            <li key="outOfRangeStart" className="out-of-range">
              <a onClick={() => onPageChange(currentPage - 2)}>...</a>
            </li>
          );
        }
      }

      // Determine how many pages to show after the current page index
      if (currentPage === 1) {
        pageCutHigh += 2;
      } else if (currentPage === 2) {
        pageCutHigh += 1;
      }
      // Determine how many pages to show before the current page index
      if (currentPage === totalPages) {
        pageCutLow -= 2;
      } else if (currentPage === totalPages - 1) {
        pageCutLow -= 1;
      }

      // Output the indexes for pages that fall inside the range of pageCutLow and pageCutHigh
      for (let p = Math.max(pageCutLow, 1); p <= Math.min(pageCutHigh, totalPages); p++) {
        pages.push(
          <li key={p} className={`nav-item ${currentPage === p ? 'active' : ''}`}>
            <a onClick={() => onPageChange(p)}>{p}</a>
          </li>
        );
      }

      // Show the very last page preceded by a "..." at the end
      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          pages.push(
            <li key="outOfRangeEnd" className="out-of-range">
              <a onClick={() => onPageChange(currentPage + 2)}>...</a>
            </li>
          );
        }
        pages.push(
          <li key={totalPages} className="nav-item">
            <a onClick={() => onPageChange(totalPages)}>{totalPages}</a>
          </li>
        );
      }
    }

    // Show the Next button only if you are on a page other than the last
    // if (currentPage < totalPages) {
    //   pages.push(
    //     <li key="next" className="page-item">
    //       <a onClick={() => onPageChange(currentPage + 1)}>Next</a>
    //     </li>
    //   );
    // }

    return pages;
  };

  return (
    <ul className="wd-navigation">
      {createPagination(totalPages, currentPage)}
    </ul>
    
  );
};