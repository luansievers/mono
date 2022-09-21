import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { SideBarMenuItemType } from "@/components/design-system/sidebar";
import {
  BackerMenuItems,
  ArtistMenuItems,
  ToggleStates,
} from "@/constants/pages/sidebar-constants";

/**
 * This hook is used to return the sidebar menuitems based on current route.
 * It also returns the active state (Currently Artist/Backer) and selected sidebar menu item
 */
export function useSideBarMenuItem() {
  const router = useRouter();
  const [sideBarMenuItems, setSideBarMenuItems] = useState<SideBarMenuItemType>(
    []
  );
  const activeState = router.asPath.split("/")?.[1];
  const selectedMenuItem = router.asPath.split("/")?.[2];

  useEffect(() => {
    if (activeState === ToggleStates.state1.key) {
      setSideBarMenuItems(BackerMenuItems);
    } else if (activeState === ToggleStates.state2.key) {
      setSideBarMenuItems(ArtistMenuItems);
    } else {
      setSideBarMenuItems([]);
    }
  }, [activeState]);
  return {
    sideBarMenuItems,
    activeState,
    selectedMenuItem,
  };
}
