import { Engineer, Passenger, Pilot } from "@/types/appState";
import { z, ZodType } from "zod";

export type MemberKeys =
  | keyof Omit<Pilot, "id">
  | keyof Omit<Engineer, "id">
  | keyof Omit<Passenger, "id">;

export type MissionFormValues = {
  name: string;
  destination: string;
  departure: Date;
  members: (Omit<Pilot, "id"> | Omit<Engineer, "id"> | Omit<Passenger, "id">)[];
};

const pilotSchema = z.object({
  memberType: z.literal("Pilot"),
  experience: z.number().min(10, "Experience must be at least 10"),
  job: z.string().optional(),
});

const engineerSchema = z.object({
  memberType: z.literal("Engineer"),
  experience: z.number(),
  job: z.enum(["navigation", "solar-panels", "maintenance", "mechanics"]),
});

const passengerSchema = z.object({
  memberType: z.literal("Passenger"),
  age: z.number(),
  wealth: z.enum(["moderate", "high", "ultra-high"]),
});

const memberSchema = z.discriminatedUnion("memberType", [
  pilotSchema,
  engineerSchema,
  passengerSchema,
]);

export const schema: ZodType<MissionFormValues> = z.object({
  name: z.string().nonempty("Mission name is required"),
  destination: z.string().nonempty("Destination is required"),
  departure: z
    .date()
    .refine((date) => date instanceof Date, "Departure date is required"),
  members: z
    .array(memberSchema)
    .nonempty({ message: "Members are required" })
    .refine(
      (members) =>
        members.filter((member) => member.memberType === "Pilot").length === 1,
      {
        message: "There can only be one Pilot",
      }
    )
    .refine(
      (members) => {
        const engineerJobs = members
          .filter(
            (member): member is Engineer => member.memberType === "Engineer"
          )
          .map((engineer) => engineer.job);
        return new Set(engineerJobs).size === engineerJobs.length;
      },
      {
        message: "Each Engineer must have a different job",
      }
    ),
});
