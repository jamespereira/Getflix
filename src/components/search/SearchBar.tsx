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
};

function SearchBar({ handleInputChange, search, handleFilterChange }: Props) {
  const filterType = [
    { displayName: "All", value: "all" },
    { displayName: "Movie", value: "movie" },
    { displayName: "Series", value: "series" },
    { displayName: "Episode", value: "episode" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl uppercase">Search</h1>
      <div className="flex gap-6">
        <Input
          type="text"
          value={search}
          onChange={(event) => handleInputChange(event.target.value)}
          className="bg-white"
          placeholder="Search movies..."
        />
        <Select onValueChange={(value) => handleFilterChange(value)}>
          <SelectTrigger className="w-[180px] bg-white">
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
