import React from "react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MissionFormValues, schema } from "./schema";
import { MemberRow } from "./MemberRow";
import { FormField } from "../ui/form";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { Label } from "../ui/label";

const MissionForm: React.FC = () => {
  const formMethods = useForm<MissionFormValues>({
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      destination: "",
      departure: new Date(),
      members: [
        {
          memberType: "Pilot",
          experience: 1,
        },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const onSubmit: SubmitHandler<MissionFormValues> = (data) => {
    console.log("Submit", data);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 col-span-4">
        <Card className="">
          <div className="mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-1 col-span-1">
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Expedition 2021"
                  {...register("name")}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={(e) => {
                    return <p className="text-xs text-red-500">{e.message}</p>;
                  }}
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700"
                >
                  Destination
                </label>
                <FormField
                  control={control}
                  name="destination"
                  render={({ field }) => {
                    return (
                      <>
                        <Select
                          name={field.name}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger id="destination">
                            <SelectValue placeholder="Select a destination" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Destinations</SelectLabel>
                              <SelectItem value="mars-alpha-110">
                                Mars Alpha-110
                              </SelectItem>
                              <SelectItem value="mars-alpha-116">
                                Mars Alpha-116
                              </SelectItem>
                              <SelectItem value="mars-alpha-220">
                                Mars Alpha-220
                              </SelectItem>
                              <SelectItem value="mars-alpha-224">
                                Mars Alpha-224
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <ErrorMessage
                          errors={errors}
                          name="destination"
                          render={(e) => {
                            return (
                              <p className="text-xs text-red-500">
                                {e.message}
                              </p>
                            );
                          }}
                        />
                      </>
                    );
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="departure"
                  className="block text-sm font-medium text-gray-700"
                >
                  Departure
                </Label>

                <FormField
                  control={control}
                  name="departure"
                  render={({ field }) => {
                    return (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="departure"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="departure"
                  render={(e) => (
                    <p className="text-xs text-red-500">{e.message}</p>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-medium mb-4">Members</h2>
              <ErrorMessage
                errors={errors}
                name="members.root"
                render={(e) => (
                  <p className="text-xs text-red-500">{e.message}</p>
                )}
              />
              {fields.map((member, index) => {
                return (
                  <MemberRow
                    key={member.id}
                    index={index}
                    remove={remove}
                    control={control}
                  />
                );
              })}

              <button
                type="button"
                onClick={() => append({ memberType: "Pilot", experience: 1 })}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                New Member
              </button>
            </div>
          </div>
        </Card>
        <div className="flex justify-end mt-6 gap-2">
          <div className="flex justify-end mt-6">
            <Button>Create</Button>
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="destructive">
              <Link to="/">Cancel</Link>
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export { MissionForm };
