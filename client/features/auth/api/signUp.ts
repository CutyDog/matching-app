import { gql, useMutation } from "@apollo/client";
import { SignUpPayload } from "@/graphql/graphql";

const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(input: { name: $name, email: $email, password: $password}) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const useSignUp = () => {
  const [signUp, { loading }] = useMutation<{ signUp: SignUpPayload }>(SIGN_UP);
  return { signUp, loading };
};