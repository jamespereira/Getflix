import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Movies from "./pages/movies/Movies";

function App() {
  return (
    <>
      <Header />
      <div className="flex-1 bg-(--bg-azure-20) ">
        <Movies />
      </div>
    </>
  );
}

export default App;
