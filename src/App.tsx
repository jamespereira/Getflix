import "./App.css";
import Header from "./components/header/Header";
import Search from "./pages/movies/Search";
import Watchlist from "./pages/movies/Watchlist";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex flex-1 w-full bg-(--background-azure) justify-center mt-16">
        <Routes>
          <Route path="/" element={<Navigate to="/Search" />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
