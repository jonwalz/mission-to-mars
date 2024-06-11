import { Layout } from "@/components/Layout";

import { useGetMissionsQuery } from "@/api";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Missions = () => {
  const { data, isError, isLoading, error } = useGetMissionsQuery("missions");

  if (isError) {
    console.log("error", error);
    return <div>Something went wrong</div>;
  }

  // TODO: Create a better loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout
      role="missions"
      title="Missions"
      button={
        <Button asChild>
          <Link to="new">New</Link>
        </Button>
      }
    >
      {data ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <div>No missions found</div>
      )}
    </Layout>
  );
};
