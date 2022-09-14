import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  ArtistMenuItems,
  ToggleStates,
} from "@/constants/pages/sidebar-constants";

import { SideBar, SideBarMenuItemType } from "./sidebar";

type Props = {
  className?: string;
};

function MainSideBar({ className }: Props) {
  const router = useRouter();
  const [sideBarMenuItems, setSideBarMenuItems] = useState<SideBarMenuItemType>(
    []
  );
  const activeState = router.asPath.split("/")?.[1];
  const selectedMenuItem = router.asPath.split("/")?.[2];

  useEffect(() => {
    if (!activeState) {
      setSideBarMenuItems([]);
    }
    if (activeState === ToggleStates.state1.key) {
      setSideBarMenuItems([]);
    }
    if (activeState === ToggleStates.state2.key) {
      setSideBarMenuItems(ArtistMenuItems);
    }
  }, [activeState]);
  const isState1Selected = ToggleStates.state1.key === activeState;

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
      onChange={() => {
        if (isState1Selected) {
          router.push(`/${ToggleStates.state2.key}/dashboard`);
        } else {
          router.push(`/${ToggleStates.state1.key}/dashboard`);
        }
      }}
    />
  );
}

export default MainSideBar;
