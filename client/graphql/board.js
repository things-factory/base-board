import gql from 'graphql-tag'
import { client, gqlBuilder } from '@things-factory/shell'

export async function fetchBoardList(listParam = {}) {
  const response = await client.query({
    query: gql`
      {
        boards(${gqlBuilder.buildArgs(listParam)}) {
          items {
            id
            name
            description
            fit
            width
            height
            thumbnail
            createdAt
            updatedAt
          }
          total
        }
      }
    `
  })

  return response.data
}

export async function fetchBoard(id) {
  const response = await client.query({
    query: gql`
      query FetchBoardById($id: String!) {
        board(id: $id) {
          id
          name
          description
          model
          fit
          width
          height
          createdAt
          updatedAt
        }
      }
    `,
    variables: { id }
  })

  return response.data
}

export async function createBoard(board) {
  /*
    input NewBoard {
      name        : String!
      description : String
      model       : String!
      width       : Int
      height      : Int
      published   : Boolean
    }
    */

  var { name, description, model, fit, width, height, published, group } = board
  model = JSON.stringify(model)

  const response = await client.mutate({
    mutation: gql`
      mutation CreateBoard($board: NewBoard!, $group: String!) {
        createBoard(board: $board, groupId: $group) {
          id
          name
          description
          model
          fit
          width
          height
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      board: { name, description, model, fit, width, height, published },
      group
    }
  })

  return response.data
}

export async function updateBoard(board) {
  /*
    input BoardPatch {
      name        : String
      description : String
      model       : String
      width       : Int
      height      : Int
      published   : Boolean
    }
    */
  var { id, name, description, model, fit, width, height, published } = board
  model = JSON.stringify(model)

  const response = await client.mutate({
    mutation: gql`
      mutation UpdateBoard($id: String!, $patch: BoardPatch!) {
        updateBoard(id: $id, patch: $patch) {
          id
          name
          description
          model
          fit
          width
          height
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      id,
      patch: { name, description, model, fit, width, height, published }
    }
  })

  return response.data
}

export async function deleteBoard(id) {
  const response = await client.mutate({
    mutation: gql`
      mutation($id: String!) {
        deleteBoard(id: $id) {
          id
        }
      }
    `,
    variables: {
      id
    }
  })

  return response.data
}
