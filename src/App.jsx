import React, { useState } from "react";
import Home from "./Home";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    setFavorites((prev) => [...prev, item]);
  };

  return (
    <div>
      <Home addFavorite={addFavorite} /> 
    </div>
  );
};

export default App;