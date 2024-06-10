import { Layout } from "@/components/layout";
import { useGetMissionsQuery } from "@/api";

export const Missions = () => {
  const { data, isError, error } = useGetMissionsQuery("missions");

  if (isError) {
    console.log("error", error);
    return <div>Something went wrong</div>;
  }

  return (
    <Layout role="missions">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
};
