import { gql } from "../gql";

export const CREATE_PLAYER = gql(`
  mutation createPlayer($playerInput: PlayerInputData!) {
    createPlayer(playerInput: $playerInput) {
        playerId
        name
        score
        updatedAt
        createdAt
    }
  }
`);

export const UPDATE_PLAYER = gql(`
  mutation updatePlayer($playerInput: PlayerInputData!) {
    updatePlayer(playerInput: $playerInput) {
        playerId
        name
        score
        updatedAt
        createdAt
    }
  }
`);

export const DELETE_PLAYER = gql(`
  mutation deletePlayer($playerId: ID!) {
    deletePlayer(playerId: $playerId) {
        playerId
        name
        score
        updatedAt
        createdAt
    }
  }
`);

export const LOGIN = gql(`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        userId
        email
        name
        isLoggedIn
    }
  }
`);

export const LOGOUT = gql(`
  mutation logout {
    logout {
        message
    }
  }
`);