import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "../theme/ThemeSwitcher";
import GetflixLogo from "@/assets/GetflixLogo.svg";

function Header() {
  const location = useLocation();

  return (
    <header className="w-full h-16 flex items-center justify-center bg-black fixed z-10">
      <div className="w-full w-max[1280px] flex justify-between items-center px-4 md:px-8 lg:px-12">
        <Link to="/Search">
          <div className="flex gap-2 items-center justify-center">
            <img
              src={GetflixLogo}
              className="flex-1 min-h min-w-8 text-(--primary-blue)"
              alt="Getflix logo"
            />
            <h1 className="hidden sm:block text-3xl text-white font-semibold">
              Getflix
            </h1>
          </div>
        </Link>
        <div className="flex flex-row gap-8">
          <ThemeSwitcher />
          <nav className="flex flex-row gap-8">
            <Link to="/Search">
              <p
                className={`${
                  location.pathname === "/Search"
                    ? "text-white font-semibold"
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
                    ? "text-white font-semibold"
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
