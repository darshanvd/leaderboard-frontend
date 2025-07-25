import { gql } from "../gql";

export const UPSERT_PLAYER_SUBSCRIPTION = gql(`
  subscription UpsertPlayerSubscription {
    upsertPlayer {
      playerId
      name
      score
      updatedAt
      createdAt
    }
  }
`);

export const DELETE_PLAYER_SUBSCRIPTION = gql(`
  subscription DeletePlayerSubscription {
    deletePlayer {
      playerId
      name
      score
      updatedAt
      createdAt
    }
  }
`);