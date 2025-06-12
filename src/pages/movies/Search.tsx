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
  const [type, setType] = useState("");
  const [debouncedType] = useDebounce(type, 500);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [watchlist, updateWatchlist] = useWatchlist();

  async function searchMovies(input: string, page: number, type: string) {
    const apiKey = import.meta.env.VITE_OMDP_API_KEY;

    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get("", {
        params: {
          s: input.trim(),
          type: type === "all" ? "" : type,
          page,
          apiKey,
        },
      });

      if (data.Error) {
        throw new Error(`No response`);
      }
      setError(false);
      setMovies((prev) => [...prev, ...data.Search]);
      if (data.Search.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(input: string) {
    setSearch(input);
    setPage(1);
    setMovies([]);
  }

  function handleFilterChange(filter: string) {
    setType(filter);
    setMovies([]);
    setSearch(debouncedSearch);
    setPage(1);
  }

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      searchMovies(debouncedSearch, debouncedPage, debouncedType);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [debouncedSearch, debouncedPage, debouncedType]);

  return (
    <section className="flex flex-col w-full max-w-[1280px] p-4 md:p-8 lg:p-12">
      <SearchBar
        handleInputChange={handleInputChange}
        search={search}
        handleFilterChange={handleFilterChange}
        movies={movies}
      />

      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader
      >
        <MovieList
          movies={movies}
          watchlist={watchlist}
          updateWatchlist={updateWatchlist}
        />
        {isLoading && !error && (
          <div className="flex w-full items-center gap-4 justify-center p-4">
            <MoonLoader size={24} />
            <h4>Loading...</h4>
          </div>
        )}
        {error && !isLoading && (
          <div className="flex w-full items-center gap-4 justify-center">
            <p>Nothing found.</p>
          </div>
        )}
      </InfiniteScroll>
    </section>
  );
}

export default Search;
