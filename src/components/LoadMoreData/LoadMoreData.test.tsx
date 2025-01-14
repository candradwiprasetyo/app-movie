import { render, screen } from "@testing-library/react";
import LoadMoreData from "./";

describe("LoadMoreData component", () => {
  test("Should renders loading message correctly", () => {
    render(<LoadMoreData isLoading={true} isReloading={false} />);
    const loadingMessage = screen.getByText("Memuat data baru ...");
    expect(loadingMessage).toBeInTheDocument();
  });

  test("Should not render anything when isLoading is false", () => {
    const { container } = render(
      <LoadMoreData isLoading={false} isReloading={false} />
    );

    expect(container.firstChild).toBeNull();
  });

  test("Should not render anything when isReloading is true", () => {
    const { container } = render(
      <LoadMoreData isLoading={true} isReloading={true} />
    );

    expect(container.firstChild).toBeNull();
  });

  test("Should renders nothing when both isLoading and isReloading are false", () => {
    const { container } = render(
      <LoadMoreData isLoading={false} isReloading={false} />
    );

    expect(container.firstChild).toBeNull();
  });
});
