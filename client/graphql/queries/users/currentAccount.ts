import { gql } from "@apollo/client";

export const CURRENT_ACCOUNT = gql`
  query currentAccount {
    currentAccount {
      id
      name
      email
    }
  }
`;