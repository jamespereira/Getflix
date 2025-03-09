import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header className="w-full h-20 flex items-center justify-center bg-black">
      <div className="w-full w-max[1280px] flex justify-between items-center px-12">
        <Link to="/">
          <h1 className="text-3xl text-white font-semibold">Getflix</h1>
        </Link>
        <nav className="flex flex-row gap-8">
          <Link to="/">
            <p
              className={`${
                location.pathname === "/"
                  ? "text-white"
                  : "text-muted-foreground"
              } text-sm`}
            >
              Search
            </p>
          </Link>
          <Link to="/Watchlist">
            <p
              className={`${
                location.pathname === "/Watchlist"
                  ? "text-white"
                  : "text-muted-foreground"
              } text-sm`}
            >
              Watchlist
            </p>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
