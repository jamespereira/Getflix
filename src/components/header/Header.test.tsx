import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Header", () => {
  it("should render the Getflix logo", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const logo = screen.getByAltText("Getflix logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the Search and Watchlist links", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const searchLink = screen.getByText("Search");
    const watchlistLink = screen.getByText("Watchlist");

    expect(searchLink).toBeInTheDocument();
    expect(watchlistLink).toBeInTheDocument();
  });

  it("should apply active class to the Search link when on the home page", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const searchLink = screen.getByText("Search");
    expect(searchLink).toHaveClass("text-white");
  });
});
