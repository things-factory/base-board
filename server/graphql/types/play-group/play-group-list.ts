import { gql } from 'apollo-server-koa'

export const PlayGroupList = gql`
  type PlayGroupList {
    items: [PlayGroup]
    total: Int
  }
`
