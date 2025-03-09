import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { MovieFullDetails } from "@/types";

type Props = {
  movieId: string;
};

function MovieDetails({ movieId }: Props) {
  const [movie, setMovie] = useState<MovieFullDetails | null>(null);

  async function getMovieDetails(id: string) {
    const apiURL = "https://www.omdbapi.com/?i=";
    const apiKey = "320f6ab2";
    try {
      const res = await fetch(`${apiURL}${id}&apiKey=${apiKey}`);
      if (!res.ok) {
        throw new Error(`No response`);
      }

      const data = await res.json();
      console.log("res", data);
      setMovie(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button onClick={() => getMovieDetails(movieId)} variant="outline">
          View Details
        </Button>
      </DialogTrigger>
      {movie ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{movie.Title}</DialogTitle>
            <DialogDescription>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-48 h-auto my-4"
              />
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

export default MovieDetails;
