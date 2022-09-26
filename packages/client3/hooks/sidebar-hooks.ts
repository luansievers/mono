import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { SideBarMenuItemType } from "@/components/design-system/sidebar";
import { LayoutContext } from "@/components/layout";
import {
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
  const { selectedSidebarItem } = useLayoutContext();
  const activeState = router.asPath.split("/")?.[1];
  const selectedMenuItem = selectedSidebarItem || router.asPath.split("/")?.[2];

  useEffect(() => {
    if (activeState === ToggleStates.state1.key) {
      setSideBarMenuItems([]);
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

export function useLayoutContext() {
  const layoutContext = useContext(LayoutContext);
  return layoutContext;
}

export function useSelectedSidebarItem(newSelectedSidebarItem: string) {
  const { selectedSidebarItem, setLayoutItems } = useLayoutContext();
  useEffect(() => {
    if (
      setLayoutItems &&
      newSelectedSidebarItem &&
      newSelectedSidebarItem !== selectedSidebarItem
    ) {
      setLayoutItems({ selectedSidebarItem: newSelectedSidebarItem });
    }
  }, [newSelectedSidebarItem, selectedSidebarItem, setLayoutItems]);
}

export function useLayoutTitle(newTitle: string) {
  const { title, setLayoutItems } = useLayoutContext();
  useEffect(() => {
    if (setLayoutItems && newTitle && newTitle !== title) {
      setLayoutItems({ title: newTitle });
    }
  }, [title, newTitle, setLayoutItems]);
}
