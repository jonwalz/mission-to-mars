import { Control, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ErrorMessage } from "@hookform/error-message";
import { Input } from "../ui/input";
import { FormField } from "../ui/form";
import { MissionFormValues } from "./schema";

interface EngineerFieldsProps {
  index: number;
  control: Control<MissionFormValues>;
}

export function EngineerFields({ index, control }: EngineerFieldsProps) {
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
    <>
      <div className="space-y-1">
        <label
          htmlFor={`members.${index}.experience`}
          className="block text-sm font-medium text-gray-700"
        >
          Experience
        </label>

        <Input
          {...register(`members.${index}.experience`, {
            valueAsNumber: true,
            required: "Experience is required",
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
      <div className="space-y-1 flex-grow">
        <label
          htmlFor={`members.${index}.job`}
          className="block text-sm font-medium text-gray-700"
        >
          Job
        </label>
        <FormField
          control={control}
          name={`members.${index}.job`}
          render={({ field }) => {
            return (
              <>
                <Select
                  name={field.name}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="navigation">Navigation</SelectItem>
                      <SelectItem value="solar-panels">Solar Panels</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="mechanics">Mechanics</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <ErrorMessage
                  errors={errors}
                  name={`members.${index}.experience`}
                  render={(e) => {
                    return <p className="text-xs text-red-500">{e.message}</p>;
                  }}
                />
              </>
            );
          }}
        />
      </div>
    </>
  );
}
