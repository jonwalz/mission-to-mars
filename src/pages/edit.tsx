import { useGetSingleMissionQuery } from "@/api";
import { Layout } from "@/components/Layout";
import { useParams } from "react-router-dom";

export const EditMission = () => {
  const params = useParams();
  const { data, isError, error } = useGetSingleMissionQuery(
    params.missionId ?? ""
  );

  if (isError) {
    console.log("error", error);
    return <div>Something went wrong</div>;
  }

  return (
    <Layout title="Edit Mission" role="edit-mission">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
};
