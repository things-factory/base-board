import gql from 'graphql-tag'

export const GroupList = gql`
  type GroupList {
    items: [Group]
    total: Int
  }
`
