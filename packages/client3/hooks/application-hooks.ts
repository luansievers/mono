import { useContext } from "react";

import { ApplicationContext } from "@/components/layout";

export function useApplicationState() {
  const { isState1Selected } = useContext(ApplicationContext);
  return isState1Selected;
}

export function useSetApplicationState() {
  const { setApplicationState } = useContext(ApplicationContext);
  return setApplicationState;
}
