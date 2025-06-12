import { Movie } from "@/types";
import { useState, useEffect } from "react";

function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    if (typeof window !== "undefined") {
      const storedWatchlist = localStorage.getItem("watchlist");
      return storedWatchlist ? JSON.parse(storedWatchlist) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  function updateWatchlist(movie: Movie) {
    setWatchlist((prevWatchlist) => {
      const isMovieInWatchlist = prevWatchlist.some(
        (p) => p.imdbID === movie.imdbID
      );

      if (isMovieInWatchlist) {
        return prevWatchlist.filter((p) => p.imdbID !== movie.imdbID);
      } else {
        return [...prevWatchlist, movie];
      }
    });
  }

  return [watchlist, updateWatchlist] as const;
}

export default useWatchlist;
