import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const createPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      // Show all pages if there are 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Handle the display for more than 5 pages
      if (currentPage <= 3) {
        // Show first 3 pages, dots, and last page
        pageNumbers.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page, dots, and last 3 pages
        pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first page, dots, current page and neighbors, dots, last page
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pageNumbers;
  };

  const handleClick = (page) => {
    if (page !== '...') {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {createPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded-full border transition-colors duration-300 ${
            page === currentPage
              ? 'bg-[#E53634] text-white border-[#E53634]'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          } ${page === '...' ? 'cursor-default text-gray-500 border-none' : 'cursor-pointer'}`}
          onClick={() => handleClick(page)}
          disabled={page === '...'}
        >
          {page === '...' ? '...' : <span className="h-2 w-2 rounded-full inline-block">{page}</span>}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
