import { useLayoutTitle, useSelectedSidebarItem } from "@/hooks/sidebar-hooks";

import CreatePoolForm from "./create-pool-form";

function CreatePoolPage() {
  useSelectedSidebarItem("dashboard");
  useLayoutTitle("Create Pool");
  return <CreatePoolForm />;
}

export default CreatePoolPage;
