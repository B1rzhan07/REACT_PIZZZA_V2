import React from "react";
import ReactPaginate from "react-paginate";
import classes from "./Paggination.module.scss";
const Paggination = ({
  currentPage,
  onChangeCurrentPage,
}) => {
  return (
    <div>
      <ReactPaginate
        className={classes.paggination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) =>
          onChangeCurrentPage(event.selected + 1)
        }
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Paggination;
