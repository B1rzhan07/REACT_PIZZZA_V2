import Header from "./Components/Header";
import "./scss/app.scss";
import React from "react";
import Home from "./Components/Pages/Home";
import Nothing from "./Components/Pages/Nothing";
import { Routes, Route } from "react-router-dom";
import Cart from "./Components/Pages/Cart";

export const SearchContext = React.createContext("");
function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider
        value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route
                path="/notfound"
                exact
                element={<Nothing />}
              />
              <Route
                path="/"
                exact
                element={<Home searchValue={searchValue} />}
              />
              <Route
                path="/cart"
                exact
                element={<Cart />}
              />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
