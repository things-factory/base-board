import gql from 'graphql-tag'

export const PlayGroupList = gql`
  type PlayGroupList {
    items: [PlayGroup]
    total: Int
  }
`
