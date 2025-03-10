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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => getMovieDetails(movieId)}
          variant="default"
          color="#1c8dff"
        >
          View Details
        </Button>
      </DialogTrigger>
      {movie ? (
        <DialogContent className="dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>{movie.Title}</DialogTitle>

            <div className="overflow-hidden">
              <div>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-48 h-auto transition transform hover:scale-110 object-cover duration-150 ease-in-out"
                />
              </div>
            </div>
            <p>
              <strong>Rated:</strong> {movie.Rated}
            </p>
            <p>
              <strong>Released:</strong> {movie.Released}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.Runtime}
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
              <strong>Plot:</strong> {movie.Plot}
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

            <div>
              <h2 className="font-semibold">Ratings:</h2>
              <ul>
                {movie.Ratings.map((rating, index) => (
                  <li key={index}>
                    <strong>{rating.Source}:</strong> {rating.Value}
                  </li>
                ))}
              </ul>
            </div>

            <p>
              <strong>Metascore:</strong> {movie.Metascore}
            </p>
            <p>
              <strong>IMDb Rating:</strong> {movie.imdbRating}
            </p>
          </DialogHeader>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

export default MovieDetails;
