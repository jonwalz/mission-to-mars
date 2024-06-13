import { Control, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { ErrorMessage } from "@hookform/error-message";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormField } from "../ui/form";
import { MissionFormValues } from "./schema";

interface PassengerFieldsProps {
  index: number;
  control: Control<MissionFormValues>;
}

export function PassengerFields({ index, control }: PassengerFieldsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="space-y-1">
        <label
          htmlFor={`members.${index}.age`}
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <Input
          {...register(`members.${index}.age`, {
            valueAsNumber: true,
            required: "Age is required",
            value: 0,
          })}
          type="number"
          min={0}
        />
        <ErrorMessage
          errors={errors}
          name={`members.${index}.age`}
          render={(e) => {
            return <p className="text-xs text-red-500">{e.message}</p>;
          }}
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor={`members.${index}.wealth`}
          className="block text-sm font-medium text-gray-700"
        >
          Wealth
        </label>
        <FormField
          control={control}
          name={`members.${index}.wealth`}
          render={({ field }) => {
            return (
              <Select
                defaultValue={field.value}
                onValueChange={(value: "moderate" | "high" | "ultra-high") => {
                  field.onChange(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a member type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="ultra-high">Ultra-high</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }}
        />
        <ErrorMessage
          errors={errors}
          name={`members.${index}.wealth`}
          render={(e) => {
            return <p className="text-xs text-red-500">{e.message}</p>;
          }}
        />
      </div>
    </>
  );
}
