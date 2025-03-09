import MovieList from "@/components/movies/MovieList";
import SearchBar from "@/components/search/SearchBar";
import { Movie } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "use-debounce";
import { MoonLoader } from "react-spinners";
import useWatchlist from "@/hooks/useWatchlist";

function Search() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [debouncedPage] = useDebounce(page, 500);
  const [hasMore, setHasMore] = useState(false);

  const [watchlist, updateWatchlist] = useWatchlist();

  async function searchMovies(input: string, page: number) {
    const apiKey = import.meta.env.VITE_OMDP_API_KEY;

    try {
      const { data } = await axiosInstance.get("", {
        params: {
          s: input,
          page,
          apiKey,
        },
      });

      if (data.Error) {
        throw new Error(`No response`);
      }
      if (!data.Error) {
        setMovies((prev) => [...prev, ...data.Search]);
        if (data.Search.length < 10) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  function handleChange(input: string) {
    setSearch(input);
    setPage(1);
    setMovies([]);
  }

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      searchMovies(debouncedSearch, debouncedPage);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [debouncedSearch, debouncedPage]);

  return (
    <section className="flex flex-col w-full max-w-[1280px] p-12">
      <SearchBar handleChange={handleChange} search={search} />

      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={
          <div className="flex w-full items-center gap-4 justify-center p-4">
            <MoonLoader size={24} />
            <h4>Loading...</h4>
          </div>
        }
      >
        <MovieList
          movies={movies}
          watchlist={watchlist}
          updateWatchlist={updateWatchlist}
        />
      </InfiniteScroll>
    </section>
  );
}

export default Search;
