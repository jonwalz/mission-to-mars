import { Mission } from "@/types/appState";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "." }),
  endpoints: (build) => ({
    getMissions: build.query<Mission[], string>({
      query: () => `/missions/allMissions.json`,
    }),
    getSingleMission: build.query<Mission, string>({
      query: (id) => `../missions/${id}.json`,
    }),
  }),
});

export const { useGetMissionsQuery, useGetSingleMissionQuery } = api;
