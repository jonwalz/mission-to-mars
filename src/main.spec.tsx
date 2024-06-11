import { vi, describe, test } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { routes } from "./routes/router";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { api, useGetMissionsQuery, useGetSingleMissionQuery } from "./api";

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

function doRender(router: ReturnType<typeof createMemoryRouter>) {
  render(
    <Provider store={mockStore}>
      <RouterProvider router={router} />
    </Provider>
  );
}

describe("Main", () => {
  test("Should render Missions page for root route", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    vi.mocked(useGetMissionsQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    doRender(router);

    await waitFor(() => screen.getByRole("missions"));
  });

  test("should render NewMission page for /new route", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/new"],
      initialIndex: 1,
    });

    vi.mocked(useGetMissionsQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    doRender(router);

    await waitFor(() => screen.getByRole("new-mission"));
  });

  test("should render EditMission page for /edit/:missionId route", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/edit/1"],
      initialIndex: 2,
    });

    vi.mocked(useGetSingleMissionQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    doRender(router);

    await waitFor(() => screen.getByRole("edit-mission"));
  });

  test("should render NotFound page for unknown route", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/unknown"],
      initialIndex: 3,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole("not-found"));
  });
});
