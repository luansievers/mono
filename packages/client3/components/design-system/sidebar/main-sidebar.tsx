import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ToggleStates } from "@/constants/pages/sidebar-constants";
import { useSetApplicationState } from "@/hooks/application-hooks";
import { useSideBarMenuItem } from "@/hooks/sidebar-hooks";

import { SideBar } from "./sidebar";

type Props = {
  className?: string;
};

function MainSideBar({ className }: Props) {
  const router = useRouter();
  const { sideBarMenuItems, activeState, selectedMenuItem } =
    useSideBarMenuItem();
  const setApplicationState = useSetApplicationState();

  const isState1Selected = ToggleStates.state1.key === activeState;

  useEffect(() => {
    setApplicationState && setApplicationState(isState1Selected);
  }, [isState1Selected, setApplicationState]);

  return (
    <SideBar
      className={className}
      labels={sideBarMenuItems}
      states={{
        isState1Selected: isState1Selected,
        state1: ToggleStates.state1.label,
        state2: ToggleStates.state2.label,
      }}
      selectedPathName={selectedMenuItem}
      getHref={(key) => `/${activeState}/${key}`}
      onChange={() => {
        if (isState1Selected) {
          setApplicationState && setApplicationState(false);
          router.push(`/${ToggleStates.state2.key}/dashboard`);
        } else {
          setApplicationState && setApplicationState(true);
          router.push(`/${ToggleStates.state1.key}/all-artist-pools`);
        }
      }}
    />
  );
}

export default dynamic(() => Promise.resolve(MainSideBar), { ssr: false });
