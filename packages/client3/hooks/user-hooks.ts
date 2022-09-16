import { useContext } from "react";

import { UserContext } from "@/pages/_app.page";

export function useUser() {
  const { user } = useContext(UserContext);
  return user;
}

export function useSetUser() {
  const { setUser } = useContext(UserContext);
  return setUser;
}
