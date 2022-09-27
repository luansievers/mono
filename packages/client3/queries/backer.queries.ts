import { gql } from "@apollo/client";

export const backerAllArtistPools = gql`
  query AllArtistPoolsPage {
    tranchedPools(orderBy: createdAt, orderDirection: desc) {
      # artist info from metadata
      borrower @client {
        name
        logo
        orgType
        website
        linkedIn
        twitter
        bio
        highlights
      }
      id
      # pool info from metadata
      name @client
      category @client
      icon @client
      creditLine {
        maxLimit
        borrower
      }
      juniorTranches {
        id
        lockedUntil
        principalDeposited
      }
    }
  }
`;
