import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/notFound";
import { missionsRoute } from "./root";
import { newMissionRoute } from "./newMission";
import { editMissionRoute } from "./editMission";

export const routes = [
  missionsRoute,
  newMissionRoute,
  editMissionRoute,
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
