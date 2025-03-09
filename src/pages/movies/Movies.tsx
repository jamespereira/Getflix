import MovieList from "@/components/movies/MovieList";
import Search from "@/components/search/Search";
import { Movie } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "use-debounce";

function Movies() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [debouncedPage] = useDebounce(page, 500);
  const [hasMore, setHasMore] = useState(false);

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
      console.log("res", data);
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
    <section className="flex flex-col m-w-[1280px] p-12">
      <Search handleChange={handleChange} search={search} />

      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <MovieList movies={movies} />
      </InfiniteScroll>
    </section>
  );
}

export default Movies;
