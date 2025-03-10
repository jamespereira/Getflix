import "./App.css";
import Header from "./components/header/Header";
import Search from "./pages/movies/Search";
import Watchlist from "./pages/movies/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex flex-1 w-full bg-(--bg-azure-20) justify-center mt-16">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/Watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
