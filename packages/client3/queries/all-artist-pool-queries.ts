import { gql } from "@apollo/client";

export const backerAllArtistPools = gql`
  query AllArtistPoolsPage {
    tranchedPools(orderBy: createdAt, orderDirection: desc) {
      id
      name @client
      category @client
      icon @client
      artist @client
      id
      creditLine {
        maxLimit
      }
      juniorTranches {
        id
        lockedUntil
        principalDeposited
      }
    }
  }
`;
