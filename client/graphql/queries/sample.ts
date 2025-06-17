import { gql } from '@apollo/client';

export const GET_SAMPLE_DATA = gql`
  query sample {
    sample(name: "name")
  }
`;