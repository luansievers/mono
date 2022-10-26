import { gql } from "@apollo/client";

export const backerAllArtistPools = gql`
  query AllArtistPoolsPage {
    tranchedPools(orderBy: createdAt, orderDirection: desc) {
      id
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
      # pool info from metadata
      name @rest
      category @rest
      icon @rest
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

export const MyPortfolioPools = gql`
  query MyPortfolioPools($userAccount: ID!) {
    user(id: $userAccount) {
      tranchedPoolTokens {
        id
        principalAmount
        mintedAt
        tranchedPool {
          id
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
    }
  }
`;
