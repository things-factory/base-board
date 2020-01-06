import gql from 'graphql-tag'

export const NewBoard = gql`
  input NewBoard {
    name: String!
    description: String
    model: String!
    groupId: String!
  }
`
