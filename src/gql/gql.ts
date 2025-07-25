/* eslint-disable */
import * as types from './graphql.js';
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
 */
const documents = {
    "\n  mutation createPlayer($playerInput: PlayerInputData!) {\n    createPlayer(playerInput: $playerInput) {\n        playerId\n        name\n        score\n        updatedAt\n        createdAt\n    }\n  }\n": types.CreatePlayerDocument,
    "\n  mutation updatePlayer($playerInput: PlayerInputData!) {\n    updatePlayer(playerInput: $playerInput) {\n        playerId\n        name\n        score\n        updatedAt\n        createdAt\n    }\n  }\n": types.UpdatePlayerDocument,
    "\n  mutation deletePlayer($playerId: ID!) {\n    deletePlayer(playerId: $playerId) {\n        playerId\n        name\n        score\n        updatedAt\n        createdAt\n    }\n  }\n": types.DeletePlayerDocument,
    "\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n        userId\n        email\n        name\n        isLoggedIn\n    }\n  }\n": types.LoginDocument,
    "\n  mutation logout {\n    logout {\n        message\n    }\n  }\n": types.LogoutDocument,
    "\n  query GetAllPlayers {\n    getAllPlayers {\n      playerId\n      name\n      score\n      updatedAt\n      createdAt\n    }\n  }\n": types.GetAllPlayersDocument,
    "\n  query GetCurrentSession {\n    session {\n      userId\n      name\n      email\n      isLoggedIn\n    }\n  }\n": types.GetCurrentSessionDocument,
    "\n  subscription UpsertPlayerSubscription {\n    upsertPlayer {\n      playerId\n      name\n      score\n      updatedAt\n      createdAt\n    }\n  }\n": types.UpsertPlayerSubscriptionDocument,
    "\n  subscription DeletePlayerSubscription {\n    deletePlayer {\n      playerId\n      name\n      score\n      updatedAt\n      createdAt\n    }\n  }\n": types.DeletePlayerSubscriptionDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createPlayer($playerInput: PlayerInputData!) {\n    createPlayer(playerInput: $playerInput) {\n        playerId\n        name\n        score\n        updatedAt\n        createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createPlayer($playerInput: PlayerInputData!) {\n    createPlayer(playerInput: $playerInput) {\n        playerId\n        name\n        score\n        updatedAt\n        createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updatePlayer($playerInput: PlayerInputData!) {\n    updatePlayer(playerInput: $playerInput) {\n        playerId\n        name\n        score\n        updatedAt\n        createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation updatePlayer($playerInput: PlayerInputData!) {\n    updatePlayer(playerInput: $playerInput) {\n        playerId\n        name\n        score\n        updatedAt\n        createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deletePlayer($playerId: ID!) {\n    deletePlayer(playerId: $playerId) {\n        playerId\n        name\n        score\n        updatedAt\n        createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation deletePlayer($playerId: ID!) {\n    deletePlayer(playerId: $playerId) {\n        playerId\n        name\n        score\n        updatedAt\n        createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n        userId\n        email\n        name\n        isLoggedIn\n    }\n  }\n"): (typeof documents)["\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n        userId\n        email\n        name\n        isLoggedIn\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation logout {\n    logout {\n        message\n    }\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout {\n        message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllPlayers {\n    getAllPlayers {\n      playerId\n      name\n      score\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetAllPlayers {\n    getAllPlayers {\n      playerId\n      name\n      score\n      updatedAt\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCurrentSession {\n    session {\n      userId\n      name\n      email\n      isLoggedIn\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentSession {\n    session {\n      userId\n      name\n      email\n      isLoggedIn\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription UpsertPlayerSubscription {\n    upsertPlayer {\n      playerId\n      name\n      score\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  subscription UpsertPlayerSubscription {\n    upsertPlayer {\n      playerId\n      name\n      score\n      updatedAt\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription DeletePlayerSubscription {\n    deletePlayer {\n      playerId\n      name\n      score\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  subscription DeletePlayerSubscription {\n    deletePlayer {\n      playerId\n      name\n      score\n      updatedAt\n      createdAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;