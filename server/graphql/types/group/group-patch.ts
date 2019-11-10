import gql from 'graphql-tag'

export const GroupPatch = gql`
  input GroupPatch {
    name: String
    description: String
  }
`
