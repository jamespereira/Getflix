import MovieList from "@/components/movies/MovieList";
import Search from "@/components/search/Search";
import { useEffect, useState } from "react";

function Movies() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  function handleChange(input: string) {
    setSearch(input);
  }

  useEffect(() => {
    if (search !== "") {
      searchMovies(search);
    }
  }, [search]);

  async function searchMovies(input: string) {
    const apiURL = "https://www.omdbapi.com/?s=";
    const apiKey = "320f6ab2";
    try {
      const res = await fetch(`${apiURL}${input}&apiKey=${apiKey}`);
      if (!res.ok) {
        throw new Error(`No response`);
      }

      const data = await res.json();
      console.log("res", data);
      if (!data.Error) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return (
    <section className="flex flex-col m-w-[1280px] p-12">
      <Search handleChange={handleChange} search={search} />
      <MovieList movies={movies} />
    </section>
  );
}

export default Movies;
