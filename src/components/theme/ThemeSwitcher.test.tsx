import { render, screen, fireEvent } from "@testing-library/react";
import ThemeSwitcher from "./ThemeSwitcher";
import "@testing-library/jest-dom";

beforeEach(() => {
  localStorage.clear();
});

describe("ThemeSwitcher", () => {
  it("should render the correct icon", () => {
    localStorage.setItem("theme", "light");

    render(<ThemeSwitcher />);

    expect(screen.getByText("🌞")).toBeInTheDocument();
    expect(screen.queryByText("🌙")).not.toBeInTheDocument();
  });

  it("should toggle to dark theme when clicked", () => {
    localStorage.setItem("theme", "light");
    render(<ThemeSwitcher />);

    fireEvent.click(screen.getByRole("switch"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
