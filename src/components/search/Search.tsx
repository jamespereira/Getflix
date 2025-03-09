import { Input } from "../ui/input";

type Props = {
  handleChange: (input: string) => void;
  search: string;
};

function Search({ handleChange, search }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Search for your movie</h1>
      <Input
        type="text"
        value={search}
        onChange={(event) => handleChange(event.target.value)}
        className="bg-white"
        placeholder="Search movies..."
      />
    </div>
  );
}

export default Search;
