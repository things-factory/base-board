import gql from 'graphql-tag'

export const BoardPatch = gql`
  input BoardPatch {
    name: String
    description: String
    model: String
    groupId: String
  }
`
