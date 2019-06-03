import { gql } from 'apollo-server-koa'

export const BoardList = gql`
  type BoardList {
    items: [Board]
    total: Int
  }
`
