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

interface CrewMember {
  id: string;
  type: "Pilot" | "Engineer" | "Passenger";
}

export interface Pilot extends CrewMember {
  type: "Pilot";
  experience: number; // Experience in years
}

export interface Engineer extends CrewMember {
  type: "Engineer";
  experience: number; // Experience in years
  job: "Navigation" | "Solar panels" | "Maintenance" | "Mechanics";
}

export interface Passenger extends CrewMember {
  type: "Passenger";
  age: number;
  wealth: "moderate" | "high" | "ultra-high";
}
