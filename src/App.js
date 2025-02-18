import "./App.css";
import Router from "./Router";
import GlobalStyle from "./GlobalStyles";

function App() {
  return (
    <>
      {" "}
      <GlobalStyle /> {/* 전체 폰트 적용 */}
      <Router />;
    </>
  );
}

export default App;
