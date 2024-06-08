import { createBrowserRouter } from "react-router-dom";

// Stubs
// eslint-disable-next-line react-refresh/only-export-components
const Missions = () => <div>Missions</div>;
// eslint-disable-next-line react-refresh/only-export-components
const NewMission = () => <div>New Mission</div>;
// eslint-disable-next-line react-refresh/only-export-components
const EditMission = () => <div>Edit Mission</div>;

export const router = createBrowserRouter([
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
]);
