import gql from 'graphql-tag'

export const Board = gql`
  type Board {
    id: String
    name: String
    description: String
    model: String
    thumbnail: String
    group: Group
    playGroups: [PlayGroup]
    createdAt: String
    creator: User
    updatedAt: String
    updater: User
  }
`
