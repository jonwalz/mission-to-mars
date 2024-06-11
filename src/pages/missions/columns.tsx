import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export type MissionRow = {
  id: string;
  name: string;
  members: number;
  destination: string;
  departureDate: string;
};

const columnHelper = createColumnHelper<MissionRow>();

export const columns: ColumnDef<MissionRow, string>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "members",
    header: "Members",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "departureDate",
    header: "Departure Date",
    cell: (info) => {
      const departureDate = new Date(info.row.original.departureDate);
      const currentDate = new Date();
      const isPastDeparture = departureDate < currentDate;

      return (
        <div>
          <div className="text-xs">{info.getValue()}</div>
          <div
            className={`text-xs ${
              isPastDeparture ? "text-red-500" : "text-gray-500"
            }`}
          >
            {isPastDeparture
              ? "Departed"
              : `Departs in ${Math.floor(
                  (departureDate.getTime() - currentDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                )} days`}
          </div>
        </div>
      );
    },
  },
  columnHelper.accessor((row) => row.id, {
    header: "Edit",
    cell: (info) => {
      const departureDate = new Date(info.row.original.departureDate);
      const currentDate = new Date();
      const isPastDeparture = departureDate < currentDate;

      return isPastDeparture ? null : (
        <Link to={`edit/${info.getValue()}`}>
          <Pencil color="gray" size="20" />
        </Link>
      );
    },
  }),
];
