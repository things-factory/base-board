import { gql } from 'apollo-server-koa'

export const GroupList = gql`
  type GroupList {
    items: [Group]
    total: Int
  }
`
