import { gql } from 'apollo-server-koa'

export const NewBoard = gql`
  input NewBoard {
    name: String!
    description: String
    model: String!
    published: Boolean
  }
`
