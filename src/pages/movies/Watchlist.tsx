import MovieList from "@/components/movies/MovieList";
import useWatchlist from "@/hooks/useWatchlist";
import { Link } from "react-router-dom";

function Watchlist() {
  const [watchlist, updateWatchlist] = useWatchlist();

  return (
    <section className="flex flex-col w-full max-w-[1280px] p-4 md:p-8 lg:p-12">
      <h1 className="text-4xl uppercase">Watchlist</h1>
      {watchlist.length ? (
        <MovieList
          movies={watchlist}
          updateWatchlist={updateWatchlist}
          watchlist={watchlist}
        />
      ) : (
        <div className="flex w-full items-center gap-4 justify-center p-6">
          <p>
            No movies found. Use <Link to="/">Search</Link> to add movies to
            your watchlist!
          </p>
        </div>
      )}
    </section>
  );
}

export default Watchlist;
