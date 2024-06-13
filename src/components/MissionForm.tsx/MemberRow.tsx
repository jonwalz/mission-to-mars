import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Control, useWatch } from "react-hook-form";
import { MissionFormValues } from "./schema";
import { FormField } from "../ui/form";
import { useCallback } from "react";
import { PilotFields } from "./PilotFields";
import { EngineerFields } from "./EngineerFields";
import { PassengerFields } from "./PassengerFields";

interface MemberRowProps {
  index: number;
  remove: (index: number) => void;
  control: Control<MissionFormValues>;
}

export function MemberRow({ index, remove, control }: MemberRowProps) {
  const watched = useWatch({ name: `members.${index}`, control });
  const isEngineer = watched.memberType === "Engineer";
  const isPilot = watched.memberType === "Pilot";
  const isPassenger = watched.memberType === "Passenger";

  const removeMember = useCallback(() => {
    remove(index);
  }, [index, remove]);

  return (
    <div key={index} className="flex md:flex-row items-center border-b pb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-grow">
        <div className="space-y-1">
          <label
            htmlFor={`members.${index}.memberType`}
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <FormField
            control={control}
            name={`members.${index}.memberType`}
            rules={{
              min: {
                value: 1,
                message: "Type is required",
              },
            }}
            render={({ field }) => {
              return (
                <Select
                  defaultValue={field.value}
                  onValueChange={(
                    value: "Pilot" | "Engineer" | "Passenger"
                  ) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Pilot">Pilot</SelectItem>
                      <SelectItem value="Engineer">Engineer</SelectItem>
                      <SelectItem value="Passenger">Passenger</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />
        </div>

        {isPilot && <PilotFields index={index} />}
        {isEngineer && <EngineerFields control={control} index={index} />}
        {isPassenger && <PassengerFields index={index} control={control} />}

        <Button
          className="md:col-start-4 w-12 self-center justify-self-end"
          onClick={removeMember}
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
