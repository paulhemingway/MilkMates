import React, { useEffect, useState } from "react";

export default function Pagination(props) {
  const [amount, setAmount] = useState(1)
  useEffect(() => {
    const newAmount = Math.ceil(props.length / props.perPage)
    setAmount(newAmount)
  }, [props]);
  return amount > 0 && <div className="pagination">
    <button className="pag-btn prev">Prev</button>
    <input type="number" min={1} max={amount} defaultValue={1}/>
    <span>of {amount}</span>
    <button className="pag-btn next">Next</button>
  </div>;
}
