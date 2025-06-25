import { gql, useMutation } from "@apollo/client";
import { CreateProfilePayload } from "@/graphql/graphql";

const CREATE_PROFILE = gql`
  mutation CreateProfile($birthday: ISO8601Date!, $gender: ProfileGenderEnum!, $introduction: String, $avatarUrl: String) {
    createProfile(input: { birthday: $birthday, gender: $gender, introduction: $introduction, avatarUrl: $avatarUrl }) {
      profile {
        id
      }
    }
  }
`;

export const useCreateProfile = () => {
  const [createProfile, { loading }] = useMutation<{ createProfile: CreateProfilePayload }>(CREATE_PROFILE);
  return { createProfile, loading };
};