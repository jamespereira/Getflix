import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "../theme/ThemeSwitcher";

function Header() {
  const location = useLocation();

  return (
    <header className="w-full h-16 flex items-center justify-center bg-black fixed z-10">
      <div className="w-full w-max[1280px] flex justify-between items-center px-4 md:px-8 lg:px-12">
        <Link to="/">
          <h1 className="text-3xl text-(--primary-blue) font-semibold">
            Getflix
          </h1>
        </Link>
        <div className="flex flex-row gap-8">
          <ThemeSwitcher />
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
      </div>
    </header>
  );
}

export default Header;
