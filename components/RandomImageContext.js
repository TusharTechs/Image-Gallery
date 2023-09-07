import React, { createContext, useContext, useState } from "react";

const RandomImageContext = createContext();

export const RandomImageProvider = ({ children }) => {
  const [imageLinks, setImageLinks] = useState([]);

  const setLastDisplayedImage = (url) => {
    setImageLinks([...imageLinks, url]);
  };

  return (
    <RandomImageContext.Provider value={{ imageLinks, setLastDisplayedImage }}>
      {children}
    </RandomImageContext.Provider>
  );
};

export const useRandomImageContext = () => {
  return useContext(RandomImageContext);
};
