import React, { useEffect, useState } from "react";

export default function Pagination(props) {
  const [amount, setAmount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const pageNumberInput = document.getElementById("pageNumber");

  useEffect(() => {
    const newAmount = Math.ceil(props.length / props.perPage);
    setAmount(newAmount);
    setPageNumber(1);
  }, [props.perPage, props.length]);

  useEffect(() => {
    if (pageNumberInput) {
      pageNumberInput.value = pageNumber;
    }

    const start = pageNumber * props.perPage - props.perPage;
    const end = start + props.perPage;

    props.update(start, end);
  }, [pageNumber]);

  const handlePaste = (e) => {
    e.preventDefault();
    return false;
  };

  const handleBlur = (e) => {
    if (!e.target.value || isNaN(e.target.value)) {
      e.target.value = pageNumber;
      return;
    }
    const value = Number(e.target.value);
    if (value < 1) {
      setPageNumber(1);
      e.target.value = 1;
    }

    if (value > amount) {
      setPageNumber(amount);
      e.target.value = amount;
    }
  };

  const handleInput = (e) => {
    const inputValue = e.target.value;
    if (
      /^\d*$/.test(inputValue) &&
      parseInt(inputValue) >= 1 &&
      parseInt(inputValue) <= amount
    ) {
      setPageNumber(inputValue);
    }
  };

  const next = () => {
    setPageNumber(pageNumber < amount ? pageNumber + 1 : pageNumber);
  };

  const prev = () => {
    setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber);
  };

  const resetPageNumber = () => {
    setPageNumber(1);
    pageNumberInput.value = 1;
  };

  return (
    amount > 0 && (
      <span className="pagination">
        <button
          className="button primary-button prev"
          disabled={pageNumber === 1}
          onClick={prev}
        >
          Prev
        </button>
        <span className="pag-input-cont">
          <input
            type="text"
            defaultValue="1"
            onPaste={handlePaste}
            onBlur={handleBlur}
            onInput={handleInput}
            aria-label="Page Number"
            className="page-input"
            id="pageNumber"
          />
          <span>of {amount}</span>
        </span>
        <button
          className="button primary-button next"
          disabled={pageNumber === amount}
          onClick={next}
        >
          Next
        </button>
      </span>
    )
  );
}
