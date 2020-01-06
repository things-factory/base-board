import gql from 'graphql-tag'

export const Group = gql`
  type Group {
    id: String
    name: String
    description: String
    boards: [Board]
    createdAt: String
    creator: User
    updatedAt: String
    updater: User
  }
`
