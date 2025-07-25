import { gql } from "../gql";

export const GET_ALL_PLAYERS = gql(`
  query GetAllPlayers {
    getAllPlayers {
      playerId
      name
      score
      updatedAt
      createdAt
    }
  }
`);

export const GET_CURRENT_SESSION = gql(`
  query GetCurrentSession {
    session {
      userId
      name
      email
      isLoggedIn
    }
  }
`);