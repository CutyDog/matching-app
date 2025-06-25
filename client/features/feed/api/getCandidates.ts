import { gql, useQuery } from "@apollo/client";
import { UserEdge, PageInfo } from "@/graphql/graphql";

const GET_CANDIDATES_QUERY = gql`
  query GetCandidates($first: Int, $after: String, $passiveLikes: Boolean, $activeLikes: Boolean, $matchedLikes: Boolean) {
    candidates(first: $first, after: $after, passiveLikes: $passiveLikes, activeLikes: $activeLikes, matchedLikes: $matchedLikes) {
      edges {
        cursor
        node {
          id
          name
          profile {
            avatarUrl
            age
            introduction
          }
          likesMe
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const useGetCandidates = ({
  first = 10,
  after = null,
  activeLikes = false,
  passiveLikes = false,
  matchedLikes = false,
}: {
  first?: number;
  after?: string | null;
  activeLikes?: boolean;
  passiveLikes?: boolean;
  matchedLikes?: boolean;
}) => {
  return useQuery<{ candidates: { edges: UserEdge[]; pageInfo: PageInfo } }>(GET_CANDIDATES_QUERY, {
    variables: {
      first,
      after,
      activeLikes,
      passiveLikes,
      matchedLikes,
    },
  });
}