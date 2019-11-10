import gql from 'graphql-tag'

export const NewGroup = gql`
  input NewGroup {
    name: String!
    description: String
  }
`
