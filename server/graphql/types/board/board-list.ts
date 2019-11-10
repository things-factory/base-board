import gql from 'graphql-tag'

export const BoardList = gql`
  type BoardList {
    items: [Board]
    total: Int
  }
`
