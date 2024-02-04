import React, { useEffect, useState } from "react";
import axios from "axios";
export const Card = () => {
  const [cartdata, setcart] = useState([]);
  const [filterArray, setfilterArray] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [name, setsearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [filterdata, setfilter] = useState("all");
  const CharacterULR = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
  const applyFilters = () => {
    if (filterdata === "all") {
      if (name == " ") {
        setfilterArray(cartdata); // No filter for status and name, show all data
      } else {
        //When name type having search value
        const filtered = cartdata.filter((item) =>
          item.name.toLowerCase().includes(name.toLowerCase())
        );
        setfilterArray(filtered);
      }
    } else {
      const filtered = cartdata.filter((item) => item.status === filterdata);
      if (name != " ") {
        const namefil = filtered.filter((item) =>
          item.name.toLowerCase().includes(name.toLowerCase())
        );
        setfilterArray(namefil);
      } else {
        setfilterArray(filtered);
      }
    }
  };
  useEffect(() => {
    getcarddetails();
  }, [currentPage]);
  useEffect(() => {
    //Debounce-Waiting 5ms for user typing the search field
    const timer = setTimeout(() => {
      applyFilters();
      // console.log("mounted");
    }, 500);
    return () => {
      //Unmount phase-where timer will cleared.
      clearInterval(timer);
      // console.log("unmounteds");
    };
  }, [filterdata, cartdata, name]);

  const getcarddetails = async () => {
    setLoading(true);
    const cartdetails = await axios.get(CharacterULR);
    if (cartdetails.status == 200) {
      setcart(cartdetails.data.results);
      setfilterArray(cartdetails.data.results);
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <h4 className="header">Rickandmortyapi Characters</h4>
      </header>
      <div className="filter">
        <h5>Filter by Status and Name</h5>
        <select
          value={filterdata}
          onChange={(event) => setfilter(event.target.value)}
        >
          <option value="all">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
        </select>
        <div>
          <input
            type="text"
            value={name}
            placeholder="search by name"
            onChange={(event) => setsearch(event.target.value)}
          />
        </div>
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
      <footer>
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
      </footer>
    </>
  );
};
