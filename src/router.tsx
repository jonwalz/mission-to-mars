import { createBrowserRouter } from "react-router-dom";
import { Missions } from "./pages/missions";
import { NewMission } from "./pages/new";
import { EditMission } from "./pages/edit";
import { NotFound } from "./pages/notFound";

export const routes = [
  {
    path: "/",
    element: <Missions />,
  },
  {
    path: "new",
    element: <NewMission />,
  },
  {
    path: "edit/:missionId",
    element: <EditMission />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
