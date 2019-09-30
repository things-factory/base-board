import { gql } from 'apollo-server-koa'

export const BoardPatch = gql`
  input BoardPatch {
    id: String
    name: String
    description: String
    model: String
    groupId: String
    cuFlag: String
    thumbnail: String
    createdAt: String
    updatedAt: String
  }
`
