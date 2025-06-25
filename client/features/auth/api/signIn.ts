import { gql, useMutation } from "@apollo/client";
import { SignInPayload } from "@/graphql/graphql";

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export const useSignIn = () => {
  const [signIn, { loading }] = useMutation<{ signIn: SignInPayload }>(SIGN_IN);
  return { signIn, loading };
};