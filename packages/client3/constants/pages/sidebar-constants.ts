import { SideBarMenuItemType } from "@/components/design-system/sidebar";

export const BackerMenuItems: SideBarMenuItemType = [
  {
    label: "All Artist Pools",
    key: "all-artist-pools",
  },
  {
    label: "My Portfolio",
    key: "my-portfolio",
  },
  {
    label: "Transaction",
    key: "transactions",
  },
];

export const ArtistMenuItems: SideBarMenuItemType = [
  {
    label: "Artist Dashboard",
    key: "dashboard",
  },
  {
    label: "Transactions",
    key: "artist-transaction",
  },
];

export const ToggleStates = {
  state1: {
    label: "Backer",
    key: "backer",
  },
  state2: {
    label: "Artist",
    key: "artist",
  },
};
