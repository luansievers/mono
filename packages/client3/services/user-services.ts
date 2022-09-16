import { User } from "@/types/user";

export const hasUid = (user?: User) => {
  return Boolean(
    user?.isUsNonAccreditedIndividual ||
      user?.isNonUsIndividual ||
      user?.isUsEntity ||
      user?.isNonUsEntity ||
      user?.isUsAccreditedIndividual
  );
};
