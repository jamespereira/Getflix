import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { MovieFullDetails } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import rottenTomatoesIcon from "@/assets/rottenTomatoesIcon.webp";
import imdbIcon from "@/assets/imdbIcon.webp";
import metacriticIcon from "@/assets/metacriticIcon.webp";
import MovieRating from "./MovieRating";

type Props = {
  movieId: string;
};

function MovieDetails({ movieId }: Props) {
  const [movie, setMovie] = useState<MovieFullDetails | null>(null);

  async function getMovieDetails(id: string) {
    const apiKey = import.meta.env.VITE_OMDP_API_KEY;

    try {
      const { data } = await axiosInstance.get("", {
        params: {
          i: id,
          apiKey,
        },
      });

      if (data.Error) {
        throw new Error(`No response`);
      }
      console.log("res", data);
      if (!data.Error) {
        setMovie(data);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  function getMovieRating(movie: MovieFullDetails, source: string) {
    const rating = movie.Ratings.filter((rating) =>
      rating.Source.toLowerCase().includes(source)
    )[0].Value;

    return rating;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => getMovieDetails(movieId)}
          variant="default"
          className="w-full md:w-40 h-10"
        >
          View Details
        </Button>
      </DialogTrigger>
      {movie ? (
        <DialogContent className="dark:bg-gray-900 max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-2xl text-left">{movie.Title} </h2>
            </DialogTitle>
            <div className="flex gap-2">
              <div>{movie.Released}</div> |<div>{movie.Rated}</div> |
              <div>{movie.Runtime}</div>
            </div>

            <div className="overflow-hidden">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-48 h-auto transition transform hover:scale-110 object-cover duration-150 ease-in-out"
              />
            </div>
            <div className="py-4 flex flex-col gap-2 text-left">
              <p>
                <strong>Plot:</strong> {movie.Plot}
              </p>
              <p>
                <strong>Genre:</strong> {movie.Genre}
              </p>
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
              <p>
                <strong>Writer:</strong> {movie.Writer}
              </p>
              <p>
                <strong>Actors:</strong> {movie.Actors}
              </p>
              <p>
                <strong>Language:</strong> {movie.Language}
              </p>
              <p>
                <strong>Country:</strong> {movie.Country}
              </p>
              <p>
                <strong>Awards:</strong> {movie.Awards}
              </p>
            </div>

            <h2 className="font-semibold text-left">Ratings:</h2>
            <div className="flex justify-between h-8">
              <MovieRating
                icon={imdbIcon}
                rating={getMovieRating(movie, "internet")}
              />
              <MovieRating
                icon={rottenTomatoesIcon}
                rating={getMovieRating(movie, "rotten")}
              />
              <MovieRating
                icon={metacriticIcon}
                rating={getMovieRating(movie, "meta")}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

export default MovieDetails;
