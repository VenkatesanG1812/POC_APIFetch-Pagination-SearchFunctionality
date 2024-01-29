import React, { useEffect, useState } from "react";
import { CharacterULR } from "../constant";
import axios from "axios";
export const Card = () => {
  const [initialcard, setcart] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getcarddetails();
  }, []);
  const getcarddetails = async () => {
    const cartdetails = await axios.get(CharacterULR);
    if (cartdetails.status == 200) {
      setcart(cartdetails.data.results);
      setLoading(!isLoading);
    }
  };
  console.log(initialcard);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="CartLayout">
      {initialcard.map((cart, ind) => (
        <div key={ind} className="Card">
          <h2>{cart.name}</h2>
          <img src={cart.image} alt={cart.name} />
          <h5>{cart.status}</h5>
        </div>
      ))}
    </div>
  );
};
