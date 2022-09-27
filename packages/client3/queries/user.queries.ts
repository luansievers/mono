import { gql } from "@apollo/client";

export const accountQuery = gql`
  query UserWalletInformation($userAccount: ID!) {
    user(id: $userAccount) {
      id
      isUsEntity
      isNonUsEntity
      isUsAccreditedIndividual
      isUsNonAccreditedIndividual
      isNonUsIndividual
      isGoListed
    }
  }
`;
