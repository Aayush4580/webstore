import React, { createContext, useReducer } from "react";
import { navInitialState, navReducer } from "./reducer/NavReducer";

export const AppContext = createContext({});

export const AppProvider = (props) => {
  const [navData, setNavData] = useReducer(navReducer, navInitialState);

  return (
    <AppContext.Provider value={{ navData, setNavData }}>
      {props.children}
    </AppContext.Provider>
  );
};
