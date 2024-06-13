import { Layout } from "@/components/Layout";
import { MissionForm } from "@/components/MissionForm.tsx";

export const NewMission = () => (
  <Layout title="Configure a new Mission" role="new-mission">
    <MissionForm />
  </Layout>
);
