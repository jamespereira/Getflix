import MovieList from "@/components/movies/MovieList";
import Search from "@/components/search/Search";
import { Movie } from "@/types";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Movies() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  async function searchMovies(input: string, page: number) {
    const apiURL = "https://www.omdbapi.com/?s=";
    const apiKey = "320f6ab2";
    try {
      const res = await fetch(
        `${apiURL}${input}&page=${page}&apiKey=${apiKey}`
      );
      if (!res.ok) {
        throw new Error(`No response`);
      }

      const data = await res.json();
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
    if (search.length > 2) {
      searchMovies(search, page);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [search, page]);

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
