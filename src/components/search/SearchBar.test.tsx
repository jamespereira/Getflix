import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import "@testing-library/jest-dom";
import { Movie } from "@/types";

const mockHandleInputChange = jest.fn();
const mockHandleFilterChange = jest.fn();

const movies: Movie[] = [
  {
    Title: "Star Wars: Episode IV - A New Hope",
    Year: "1977",
    imdbID: "tt0076759",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    Title: "Star Wars: Episode V - The Empire Strikes Back",
    Year: "1980",
    imdbID: "tt0080684",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTkxNGFlNDktZmJkNC00MDdhLTg0MTEtZjZiYWI3MGE5NWIwXkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    Title: "Star Wars: Episode VI - Return of the Jedi",
    Year: "1983",
    imdbID: "tt0086190",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNWEwOTI0MmUtMGNmNy00ODViLTlkZDQtZTg1YmQ3MDgyNTUzXkEyXkFqcGc@._V1_SX300.jpg",
  },
];

describe("Searchbar", () => {
  it("should render the SearchBar with input and filter", () => {
    render(
      <SearchBar
        handleInputChange={mockHandleInputChange}
        search=""
        handleFilterChange={mockHandleFilterChange}
        movies={movies}
      />
    );

    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
    expect(screen.getByText("Filter Type")).toBeInTheDocument();
  });

  it("should call handleInputChange when typing in the input field", () => {
    render(
      <SearchBar
        handleInputChange={mockHandleInputChange}
        search=""
        handleFilterChange={mockHandleFilterChange}
        movies={movies}
      />
    );

    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "Star Wars" } });

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    expect(mockHandleInputChange).toHaveBeenCalledWith("Star Wars");
  });

  it("should call handleFilterChange when a filter is selected", () => {
    render(
      <SearchBar
        handleInputChange={mockHandleInputChange}
        search=""
        handleFilterChange={mockHandleFilterChange}
        movies={movies}
      />
    );

    const selectTrigger = screen.getByText("Filter Type");
    fireEvent.click(selectTrigger);

    const movieOption = screen.getByText("Movie");
    fireEvent.click(movieOption);

    expect(mockHandleFilterChange).toHaveBeenCalledTimes(1);
    expect(mockHandleFilterChange).toHaveBeenCalledWith("movie");
  });

  it("should have larger title size when there are no movies", () => {
    render(
      <SearchBar
        handleInputChange={mockHandleInputChange}
        search=""
        handleFilterChange={mockHandleFilterChange}
        movies={[]}
      />
    );

    const title = screen.getByText("Search");
    expect(title).toHaveClass("text-6xl");
  });

  it("should not apply padding when there are movies", () => {
    render(
      <SearchBar
        handleInputChange={mockHandleInputChange}
        search="Star Wars"
        handleFilterChange={mockHandleFilterChange}
        movies={movies}
      />
    );

    const container = screen.getByText("Search").parentElement;
    expect(container).not.toHaveClass("pt-[calc(50vh-168px)]");
  });
});
