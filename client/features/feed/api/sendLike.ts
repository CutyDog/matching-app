import { gql, useMutation } from "@apollo/client";
import { Like } from "@/graphql/graphql";

const SEND_LIKE_MUTATION = gql`
  mutation SendLike($receiverId: ID!) {
    sendLike(input: { receiverId: $receiverId }) {
      like {
        id
      }
    }
  }
`;

export const useSendLike = () => {
  return useMutation<{ sendLike: { like: Like } }>(SEND_LIKE_MUTATION);
}