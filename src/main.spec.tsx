import { describe, test, expect } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { routes } from "./router";

describe("Main", () => {
  test("should be true", () => {
    expect(true).toBe(true);
  });

  test("Should render Missions page for root route", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole("missions"));
  });

  test("should render NewMission page for /new route", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/new"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole("new-mission"));
  });

  test("should render EditMission page for /edit/:missionId route", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/edit/1"],
      initialIndex: 2,
    });

    render(<RouterProvider router={router} />);

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
