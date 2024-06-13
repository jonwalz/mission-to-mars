export interface Mission {
  id: string;
  name: string;
  crewCount: number;
  departureDate: string;
  destination?: string;
}

export interface MissionDetails extends Mission {
  crew: (Pilot | Engineer | Passenger)[];
}
export type Pilot = {
  id: string;
  memberType: "Pilot";
  experience: number; // Experience in years
};

export type EngineerJobs =
  | "navigation"
  | "solar-panels"
  | "maintenance"
  | "mechanics";

export type Engineer = {
  id: string;
  memberType: "Engineer";
  experience: number; // Experience in years
  job: EngineerJobs;
};

export type Passenger = {
  id: string;
  memberType: "Passenger";
  age: number;
  wealth: "moderate" | "high" | "ultra-high";
};

export type CrewMember = Pilot | Engineer | Passenger;
