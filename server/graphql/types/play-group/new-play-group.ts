import gql from 'graphql-tag'

export const NewPlayGroup = gql`
  input NewPlayGroup {
    name: String!
    description: String
  }
`
