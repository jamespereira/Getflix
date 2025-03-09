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

type Props = {
  movies: Movie[];
};

function Results({ movies }: Props) {
  console.log("movies", movies);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6 py-6">
      {movies?.map((movie: Movie) => (
        <Card key={movie.imdbID} className="p-4 justify-between">
          <CardHeader>
            <CardTitle>
              <p>{movie.Title}</p>
            </CardTitle>
            <CardDescription>
              <p>{movie.Year}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img src={movie.Poster} />
          </CardContent>
          <CardFooter>
            {/* <MovieDetails movieId={movie.imdbID} /> */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Results;
