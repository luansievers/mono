import { useContext, useEffect, useState } from "react";

import { CONTRACT_ADDRESSES } from "@/constants";
import { useContract } from "@/lib/contracts";
import { UserContext } from "@/pages/_app.page";

export function useUser() {
  const { user } = useContext(UserContext);
  return user;
}

export function useSetUser() {
  const { setUser } = useContext(UserContext);
  return setUser;
}

export function useAdmin() {
  const [isAdmin, setAdmin] = useState<boolean>();
  const goldfinchFactory = useContract(
    "GoldfinchFactory",
    CONTRACT_ADDRESSES.GoldfinchFactory
  );
  useEffect(() => {
    if (goldfinchFactory) {
      const checkIfAdmin = async () => {
        const isAdmin = await goldfinchFactory.isAdmin();
        setAdmin(isAdmin);
      };
      checkIfAdmin();
    }
  }, [goldfinchFactory]);
  return isAdmin;
}
