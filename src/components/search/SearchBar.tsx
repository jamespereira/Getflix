import { Movie } from "@/types";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  handleInputChange: (input: string) => void;
  search: string;
  handleFilterChange: (input: string) => void;
  movies: Movie[];
};

function SearchBar({
  handleInputChange,
  search,
  handleFilterChange,
  movies,
}: Props) {
  const filterType = [
    { displayName: "All", value: "all" },
    { displayName: "Movie", value: "movie" },
    { displayName: "Series", value: "series" },
    { displayName: "Episode", value: "episode" },
  ];

  return (
    <div
      className={`flex flex-col gap-4  transition-all duration-500 ease-in-out
         ${!movies.length && search.length < 3 ? "pt-[calc(50vh-168px)]" : ""}
      `}
    >
      <h1
        className={`${
          !movies.length && search.length < 3 ? "text-6xl" : "text-4xl"
        } uppercase`}
      >
        Search
      </h1>
      <div className="flex gap-2 md:gap-6 flex-col md:flex-row">
        <Input
          type="text"
          value={search}
          onChange={(event) => handleInputChange(event.target.value)}
          className="bg-white dark:bg-gray-950"
          placeholder="Search movies..."
        />
        <Select onValueChange={(value) => handleFilterChange(value)}>
          <SelectTrigger className="bg-white dark:bg-gray-950 w-full md:w-50">
            <SelectValue placeholder="Filter Type" />
          </SelectTrigger>
          <SelectContent>
            {filterType.map((type) => (
              <SelectItem key={type.displayName} value={type.value}>
                {type.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default SearchBar;
