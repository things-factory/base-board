import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { Group } from './group'
import { GroupList } from './group-list'
import { GroupPatch } from './group-patch'
import { NewGroup } from './new-group'

export const Mutation = `
  createGroup (
    group: NewGroup!
  ): Group

  updateGroup (
    id: String!
    patch: GroupPatch!
  ): Group

  deleteGroup (
    id: String!
  ): Group

  joinGroup (
    id: String!
    boardIds: [String]!
  ): Group
`

export const Query = `
  groups(filters: [Filter], pagination: Pagination, sortings: [Sorting]): GroupList
  group(id: String!): Group
`

export const Types = [Filter, Pagination, Sorting, Group, NewGroup, GroupPatch, GroupList]
