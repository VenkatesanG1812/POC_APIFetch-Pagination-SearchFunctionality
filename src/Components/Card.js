import React, { useEffect, useState } from "react";
// import { CharacterULR } from "../constant";
import axios from "axios";
export const Card = () => {
  const [cartdata, setcart] = useState([]);
  const [filterArray, setfilterArray] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [filterdata, setfilter] = useState("all");
  const CharacterULR = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
  const applyFilters = () => {
    if (filterdata === "all") {
      console.log("all filter");
      setfilterArray(cartdata); // No filter, show all data
    } else {
      console.log(filterdata);
      const filtered = cartdata.filter((item) => item.status === filterdata);
      setfilterArray(filtered);
    }
  };
  useEffect(() => {
    getcarddetails();
  }, [currentPage]);
  useEffect(() => {
    applyFilters();
  }, [filterdata, cartdata]);

  const getcarddetails = async () => {
    setLoading(true);
    const cartdetails = await axios.get(CharacterULR);
    if (cartdetails.status == 200) {
      console.log(cartdetails);
      setcart(cartdetails.data.results);
      setfilterArray(cartdetails.data.results);
      setLoading(false);
    }
  };
  console.log(cartdata);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Rickandmortyapi Characters</h2>
      <div className="filter">
        <h5>Filter by Status</h5>
        <select
          value={filterdata}
          onChange={(event) => setfilter(event.target.value)}
        >
          <option value="all">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
        </select>
      </div>

      <div className="CartLayout">
        {filterArray.map((cart, ind) => (
          <div key={ind} className="Card">
            <h2>{cart.name}</h2>
            <img src={cart.image} alt={cart.name} />
            <h5>{cart.status}</h5>
          </div>
        ))}
      </div>
      <div class="pagination">
        <button
          id="butt"
          onClick={() => {
            if (currentPage != 1) setPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          id="butt"
          onClick={() => {
            if (currentPage != 42) setPage(currentPage + 1);
          }}
          disabled={currentPage === 42}
        >
          Next
        </button>
      </div>
    </>
  );
};
