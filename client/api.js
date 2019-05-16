import gql from 'graphql-tag'
import { client } from '@things-factory/provider-base-gql'

export async function fetchBoardList(by, id) {
  var query
  switch (by) {
    case 'group':
      query = gql`{
          ${by}(id:"${id}") {
            boards {
              id name description fit width height thumbnail createdAt updatedAt
            }
          }
        }`
      break
    case 'playGroup':
      query = gql`{
          ${by}(id:"${id}") {
            boards {
              id name description fit width height thumbnail createdAt updatedAt
            }
          }
        }`
      break
    default:
      // 'recent'
      query = gql`
        {
          boards {
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
        }
      `
  }

  const response = await client.query({ query })
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
