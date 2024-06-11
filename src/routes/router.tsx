import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/notFound";
import { Missions } from "@/pages/missions/page";
import { NewMission } from "@/pages/new";
import { EditMission } from "@/pages/edit";

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
