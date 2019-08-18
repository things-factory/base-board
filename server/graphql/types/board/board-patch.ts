import { gql } from 'apollo-server-koa'

export const BoardPatch = gql`
  input BoardPatch {
    name: String
    description: String
    model: String
    groupId: String
  }
`
