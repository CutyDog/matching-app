/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation updateProfile($introduction: String, $avatarUrl: String) {\n    updateProfile(input: { introduction: $introduction, avatarUrl: $avatarUrl }) {\n      profile {\n        id\n      }\n    }\n  }\n": typeof types.UpdateProfileDocument,
    "\n  query LikesCurrentAccount {\n    currentAccount {\n      activeLikes {\n        id\n        createdAt\n        receiver {\n          id\n          name\n        }\n      }\n      passiveLikes {\n        id\n        createdAt\n        sender {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.LikesCurrentAccountDocument,
    "\n  mutation signIn($email: String!, $password: String!) {\n    signIn(input: { email: $email, password: $password }) {\n      token\n    }\n  }\n": typeof types.SignInDocument,
    "\n  query TalksChatRoom($id: ID!) {\n    chatRoom(id: $id) {\n      id\n      createdAt\n      updatedAt\n      users {\n        id\n        name\n      }\n      chatMessages {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.TalksChatRoomDocument,
    "\n  subscription NewMessage($chatRoomId: ID!) {\n    newMessage(chatRoomId: $chatRoomId) {\n      chatMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.NewMessageDocument,
    "\n  mutation SendMessage($chatRoomId: ID!, $content: String!) {\n    sendChatMessage(input: { chatRoomId: $chatRoomId, content: $content }) {\n      chatMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.SendMessageDocument,
    "\n  query TalksCurrentAccount {\n    currentAccount {\n      chatRooms {\n        id\n        createdAt\n        updatedAt\n        users {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.TalksCurrentAccountDocument,
    "\n  query Candidates($first: Int, $after: String) {\n    candidates(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          id\n          name\n          profile {\n            avatarUrl\n            age\n            introduction\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": typeof types.CandidatesDocument,
    "\n  mutation SendLike($receiverId: ID!) {\n    sendLike(input: { receiverId: $receiverId }) {\n      like {\n        id\n      }\n    }\n  }\n": typeof types.SendLikeDocument,
};
const documents: Documents = {
    "\n  mutation updateProfile($introduction: String, $avatarUrl: String) {\n    updateProfile(input: { introduction: $introduction, avatarUrl: $avatarUrl }) {\n      profile {\n        id\n      }\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  query LikesCurrentAccount {\n    currentAccount {\n      activeLikes {\n        id\n        createdAt\n        receiver {\n          id\n          name\n        }\n      }\n      passiveLikes {\n        id\n        createdAt\n        sender {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.LikesCurrentAccountDocument,
    "\n  mutation signIn($email: String!, $password: String!) {\n    signIn(input: { email: $email, password: $password }) {\n      token\n    }\n  }\n": types.SignInDocument,
    "\n  query TalksChatRoom($id: ID!) {\n    chatRoom(id: $id) {\n      id\n      createdAt\n      updatedAt\n      users {\n        id\n        name\n      }\n      chatMessages {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.TalksChatRoomDocument,
    "\n  subscription NewMessage($chatRoomId: ID!) {\n    newMessage(chatRoomId: $chatRoomId) {\n      chatMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.NewMessageDocument,
    "\n  mutation SendMessage($chatRoomId: ID!, $content: String!) {\n    sendChatMessage(input: { chatRoomId: $chatRoomId, content: $content }) {\n      chatMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.SendMessageDocument,
    "\n  query TalksCurrentAccount {\n    currentAccount {\n      chatRooms {\n        id\n        createdAt\n        updatedAt\n        users {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.TalksCurrentAccountDocument,
    "\n  query Candidates($first: Int, $after: String) {\n    candidates(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          id\n          name\n          profile {\n            avatarUrl\n            age\n            introduction\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.CandidatesDocument,
    "\n  mutation SendLike($receiverId: ID!) {\n    sendLike(input: { receiverId: $receiverId }) {\n      like {\n        id\n      }\n    }\n  }\n": types.SendLikeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProfile($introduction: String, $avatarUrl: String) {\n    updateProfile(input: { introduction: $introduction, avatarUrl: $avatarUrl }) {\n      profile {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateProfile($introduction: String, $avatarUrl: String) {\n    updateProfile(input: { introduction: $introduction, avatarUrl: $avatarUrl }) {\n      profile {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LikesCurrentAccount {\n    currentAccount {\n      activeLikes {\n        id\n        createdAt\n        receiver {\n          id\n          name\n        }\n      }\n      passiveLikes {\n        id\n        createdAt\n        sender {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query LikesCurrentAccount {\n    currentAccount {\n      activeLikes {\n        id\n        createdAt\n        receiver {\n          id\n          name\n        }\n      }\n      passiveLikes {\n        id\n        createdAt\n        sender {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation signIn($email: String!, $password: String!) {\n    signIn(input: { email: $email, password: $password }) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation signIn($email: String!, $password: String!) {\n    signIn(input: { email: $email, password: $password }) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TalksChatRoom($id: ID!) {\n    chatRoom(id: $id) {\n      id\n      createdAt\n      updatedAt\n      users {\n        id\n        name\n      }\n      chatMessages {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query TalksChatRoom($id: ID!) {\n    chatRoom(id: $id) {\n      id\n      createdAt\n      updatedAt\n      users {\n        id\n        name\n      }\n      chatMessages {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription NewMessage($chatRoomId: ID!) {\n    newMessage(chatRoomId: $chatRoomId) {\n      chatMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription NewMessage($chatRoomId: ID!) {\n    newMessage(chatRoomId: $chatRoomId) {\n      chatMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendMessage($chatRoomId: ID!, $content: String!) {\n    sendChatMessage(input: { chatRoomId: $chatRoomId, content: $content }) {\n      chatMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SendMessage($chatRoomId: ID!, $content: String!) {\n    sendChatMessage(input: { chatRoomId: $chatRoomId, content: $content }) {\n      chatMessage {\n        id\n        content\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TalksCurrentAccount {\n    currentAccount {\n      chatRooms {\n        id\n        createdAt\n        updatedAt\n        users {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query TalksCurrentAccount {\n    currentAccount {\n      chatRooms {\n        id\n        createdAt\n        updatedAt\n        users {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Candidates($first: Int, $after: String) {\n    candidates(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          id\n          name\n          profile {\n            avatarUrl\n            age\n            introduction\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query Candidates($first: Int, $after: String) {\n    candidates(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          id\n          name\n          profile {\n            avatarUrl\n            age\n            introduction\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendLike($receiverId: ID!) {\n    sendLike(input: { receiverId: $receiverId }) {\n      like {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SendLike($receiverId: ID!) {\n    sendLike(input: { receiverId: $receiverId }) {\n      like {\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;