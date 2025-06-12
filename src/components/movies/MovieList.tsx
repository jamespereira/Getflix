import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import MovieDetails from "./MovieDetails";
import { Movie } from "@/types";
import { FaImage, FaRegStar, FaStar } from "react-icons/fa";

type Props = {
  movies: Movie[];
  updateWatchlist: (movie: Movie) => void;
  watchlist: Movie[];
};

function MovieList({ movies, updateWatchlist, watchlist }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6 py-6">
      {movies?.map((movie: Movie) => (
        <Card
          key={movie.imdbID}
          className="p-4 justify-between gap-0 dark:bg-gray-900 shadow-md"
        >
          <CardHeader className="p-2">
            <CardTitle>
              <div className="flex justify-between items-start">
                <h2 className="text-2xl">{movie.Title}</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="cursor-pointer"
                        onClick={() => updateWatchlist(movie)}
                      >
                        {watchlist.some((m) => m.imdbID === movie.imdbID) ? (
                          <FaStar color="#fc0b83" className="min-h-6 min-w-6" />
                        ) : (
                          <FaRegStar
                            color="oklch(0.708 0 0)"
                            className="min-h-6 min-w-6"
                          />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {watchlist.some((m) => m.imdbID === movie.imdbID) ? (
                        <p>Remove from Watchlist</p>
                      ) : (
                        <p>Add to Watchlist</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardTitle>
            <CardDescription>
              <p>{movie.Year}</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="overflow-hidden">
              {movie.Poster !== "N/A" ? (
                <img
                  src={movie?.Poster}
                  alt={movie.Title}
                  className="transition transform hover:scale-110 object-cover w-full h-full duration-150 ease-in-out"
                />
              ) : (
                <div className="flex justify-center items-center">
                  <FaImage className="h-8 w-8" />
                </div>
              )}
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

export default MovieList;
