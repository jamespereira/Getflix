import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MovieDetails from "./MovieDetails";
import { Movie } from "@/types";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

type Props = {
  movies: Movie[];
};

function Results({ movies }: Props) {
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
        return prevWatchlist.filter((p) => p.imdbID !== movie.imdbID); // Remove movie
      } else {
        return [...prevWatchlist, movie];
      }
    });
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6 py-6">
      {movies?.map((movie: Movie) => (
        <Card key={movie.imdbID} className="p-4 justify-between gap-0">
          <CardHeader className="p-2">
            <CardTitle>
              <div className="flex justify-between">
                <h2 className="text-2xl">{movie.Title}</h2>
                <button
                  className="cursor-pointer"
                  onClick={() => updateWatchlist(movie)}
                >
                  {watchlist.some((w) => w.imdbID === movie.imdbID) ? (
                    <FaStar />
                  ) : (
                    <FaRegStar />
                  )}
                </button>
              </div>
            </CardTitle>
            <CardDescription>
              <p>{movie.Year}</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="overflow-hidden">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="transition transform hover:scale-110 object-cover w-full h-full duration-150 ease-in-out"
              />
            </div>
          </CardContent>
          <CardFooter className="p-2">
            <MovieDetails movieId={movie.imdbID} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Results;
