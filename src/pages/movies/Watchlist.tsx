import MovieList from "@/components/movies/MovieList";
import { Movie } from "@/types";
import { useEffect, useState } from "react";

function Watchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWatchlist = localStorage.getItem("watchlist");

      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
    }
  }, []);

  return (
    <section className="flex flex-col m-w-[1280px] p-12">
      <h1 className="text-3xl">Watchlist</h1>
      <MovieList movies={watchlist} />
    </section>
  );
}

export default Watchlist;
