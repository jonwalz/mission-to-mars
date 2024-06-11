// Missions.test.jsx
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { Missions } from "./page";
import { api, useGetMissionsQuery } from "@/api";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/api", async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useGetMissionsQuery: vi.fn(),
    useGetSingleMissionQuery: vi.fn(),
  };
});

const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

function doRender() {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <Missions />
      </MemoryRouter>
    </Provider>
  );
}

describe("Missions Page", () => {
  it("renders loading state", () => {
    vi.mocked(useGetMissionsQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    doRender();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useGetMissionsQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("est error"),
      refetch: vi.fn(),
    });

    doRender();

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders no missions found", () => {
    vi.mocked(useGetMissionsQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    doRender();

    expect(screen.getByText("No missions found")).toBeInTheDocument();
  });

  it("renders missions data", () => {
    vi.mocked(useGetMissionsQuery).mockReturnValue({
      data: [
        { id: 1, name: "Mission 1" },
        { id: 2, name: "Mission 2" },
      ],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    doRender();

    expect(screen.getByText("Mission 1")).toBeInTheDocument();
    expect(screen.getByText("Mission 2")).toBeInTheDocument();
  });
});
