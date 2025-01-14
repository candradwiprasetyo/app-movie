import { render, screen, fireEvent } from "@testing-library/react";
import CategoryData from "./";

describe("CategoryData component", () => {
  const mockHandleCategoryChange = jest.fn();

  const defaultProps = {
    handleCategoryChange: mockHandleCategoryChange,
    category: "popular",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render all category options with correct text and styles", () => {
    render(<CategoryData {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(4);
    expect(buttons[0]).toHaveTextContent("now playing");
    expect(buttons[1]).toHaveTextContent("popular");
    expect(buttons[2]).toHaveTextContent("top rated");
    expect(buttons[3]).toHaveTextContent("upcoming");
    expect(buttons[1]).toHaveClass("bg-blue-600 text-white");
    expect(buttons[0]).toHaveClass("bg-gray-500");
  });

  test("should calls handleCategoryChange with correct category when a button is clicked", () => {
    render(<CategoryData {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(mockHandleCategoryChange).toHaveBeenCalledTimes(1);
    expect(mockHandleCategoryChange).toHaveBeenCalledWith("now_playing");
  });

  test("should applies active styles to the selected category", () => {
    const { rerender } = render(<CategoryData {...defaultProps} />);
    let activeButton = screen.getByText("popular");
    expect(activeButton).toHaveClass("bg-blue-600 text-white");
    rerender(<CategoryData {...defaultProps} category="top_rated" />);
    activeButton = screen.getByText("top rated");
    expect(activeButton).toHaveClass("bg-blue-600 text-white");
  });
});
