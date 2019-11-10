import gql from 'graphql-tag'

export const PlayGroupPatch = gql`
  input PlayGroupPatch {
    name: String
    description: String
  }
`
