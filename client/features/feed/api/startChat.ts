import { gql, useMutation } from "@apollo/client";
import { ChatRoom } from "@/graphql/graphql";

const START_CHAT_MUTATION = gql`
  mutation StartChat($memberId: ID!) {
    startChat(input: { memberId: $memberId }) {
      chatRoom {
        id
      }
    }
  }
`;

export const useStartChat = () => {
  return useMutation<{ startChat: { chatRoom: ChatRoom } }>(START_CHAT_MUTATION);
}