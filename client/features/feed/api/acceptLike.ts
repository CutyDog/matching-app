import { gql, useMutation } from "@apollo/client";
import { Like } from "@/graphql/graphql";

const ACCEPT_LIKE_MUTATION = gql`
  mutation AcceptLike($senderId: ID!) {
    acceptLike(input: { senderId: $senderId }) {
      like {
        id
      }
    }
  }
`;

export const useAcceptLike = () => {
  return useMutation<{ acceptLike: { like: Like } }>(ACCEPT_LIKE_MUTATION);
}