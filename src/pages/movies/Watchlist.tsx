import MovieList from "@/components/movies/MovieList";
import useWatchlist from "@/hooks/useWatchlist";

function Watchlist() {
  const [watchlist, updateWatchlist] = useWatchlist();

  return (
    <section className="flex flex-col w-full max-w-[1280px] p-4 md:p-8 lg:p-12">
      <h1 className="text-4xl uppercase">Watchlist</h1>
      <MovieList
        movies={watchlist}
        updateWatchlist={updateWatchlist}
        watchlist={watchlist}
      />
    </section>
  );
}

export default Watchlist;
