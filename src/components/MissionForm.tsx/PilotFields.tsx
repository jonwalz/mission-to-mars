import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { ErrorMessage } from "@hookform/error-message";

interface PilotFieldsProps {
  index: number;
}

export function PilotFields({ index }: PilotFieldsProps) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    await trigger(name);
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor={`members.${index}.experience`}
        className="block text-sm font-medium text-gray-700"
      >
        Experience
      </label>

      <Input
        className="grid-row-start-2"
        {...register(`members.${index}.experience`, {
          valueAsNumber: true,
          required: "Experience is required",
          min: {
            value: 10,
            message: "Experience must be at least 10 years",
          },
        })}
        type="number"
        placeholder="1"
        min={1}
        onChange={handleInputChange}
      />

      <ErrorMessage
        errors={errors}
        name={`members.${index}.experience`}
        render={(e) => {
          return <p className="text-xs text-red-500">{e.message}</p>;
        }}
      />
    </div>
  );
}
