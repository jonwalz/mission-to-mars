import { MissionRow } from "@/pages/missions/columns";
import { Mission } from "@/types/appState";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "." }),
  endpoints: (build) => ({
    getMissions: build.query<MissionRow[], string>({
      query: () => `/missions/allMissions.json`,
      transformResponse: (response: { missions: Mission[] }): MissionRow[] => {
        return response.missions.map((mission) => ({
          id: mission.id ?? Math.random().toString(), // This is a temporary solution.
          name: mission.name ?? "(Missing)",
          members: mission.crewCount ?? 0,
          destination: mission.destination ?? "N/A",
          departureDate: mission.departureDate ?? "N/A",
        }));
      },
    }),
    getSingleMission: build.query<Mission, string>({
      query: (id) => `../missions/${id}.json`,
    }),
  }),
});

export const { useGetMissionsQuery, useGetSingleMissionQuery } = api;
