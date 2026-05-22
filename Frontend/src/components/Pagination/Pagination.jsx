import "./Pagination.css";

export const Pagination = ({
  currentPage,
  totalPage,
  setCurrentPage,
}) => {

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">

      <button
        onClick={prev}
        disabled={currentPage === 1}
        className={`prev-button ${
          currentPage === 1
            ? "pagination-disabled"
            : ""
        }`}
      >
        Prev
      </button>

      <div className="page-number">
        {currentPage} / {totalPage}
      </div>

      <button
        onClick={next}
        disabled={currentPage === totalPage}
        className={`next-button ${
          currentPage === totalPage
            ? "pagination-disabled"
            : ""
        }`}
      >
        Next
      </button>

    </div>
  );
};