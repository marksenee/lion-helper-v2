import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./GlobalStyles";
import AppRoutes from "./Router";
import Loading from "./components/Loading";

function App() {
  return (
    <BrowserRouter>
      <Loading />
      <GlobalStyle /> {/* 전체 폰트 적용 */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
