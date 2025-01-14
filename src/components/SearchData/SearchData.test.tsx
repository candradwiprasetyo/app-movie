import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchData from "./";

const handleSearchKeywordMock = jest.fn();
const deleteSearchQueryMock = jest.fn();

jest.useFakeTimers();

describe("SearchData", () => {
  test("renders input with initial value", () => {
    render(
      <SearchData
        handleSearchKeyword={handleSearchKeywordMock}
        searchQuery="test"
        deleteSearchQuery={deleteSearchQueryMock}
      />
    );

    const inputElement = screen.getByPlaceholderText(/Cari film di sini/i);
    expect(inputElement).toHaveValue("test");
  });

  test("renders 'x' button when searchQuery is not empty", () => {
    render(
      <SearchData
        handleSearchKeyword={handleSearchKeywordMock}
        searchQuery="Filmku"
        deleteSearchQuery={deleteSearchQueryMock}
      />
    );

    const clearButton = screen.getByText("x");
    expect(clearButton).toBeInTheDocument();
  });

  test("calls deleteSearchQuery when 'x' button is clicked", () => {
    render(
      <SearchData
        handleSearchKeyword={handleSearchKeywordMock}
        searchQuery="Avengers"
        deleteSearchQuery={deleteSearchQueryMock}
      />
    );

    const clearButton = screen.getByText("x");

    fireEvent.click(clearButton);

    expect(deleteSearchQueryMock).toHaveBeenCalledTimes(1);
  });
});
