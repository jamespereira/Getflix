import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header", () => {
  const setup = () => {
    render(
      <Router>
        <Header />
      </Router>
    );
  };
  it("should render the Getflix logo", () => {
    setup();

    const logo = screen.getByAltText("Getflix logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the Search and Watchlist links", () => {
    setup();

    const searchLink = screen.getByText("Search");
    const watchlistLink = screen.getByText("Watchlist");

    expect(searchLink).toBeInTheDocument();
    expect(watchlistLink).toBeInTheDocument();
  });

  it("should apply active class to the Search link when on the home page", () => {
    setup();

    const searchLink = screen.getByText("Search");
    fireEvent.click(searchLink);
    expect(searchLink).toHaveClass("text-white");
  });
});
