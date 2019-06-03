import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { NewPlayGroup } from './new-play-group'
import { PlayGroup } from './play-group'
import { PlayGroupList } from './play-group-list'
import { PlayGroupPatch } from './play-group-patch'

export const Mutation = `
  createPlayGroup (
    playGroup: NewPlayGroup!
  ): PlayGroup

  updatePlayGroup (
    id: String!
    patch: PlayGroupPatch!
  ): PlayGroup

  deletePlayGroup (
    id: String!
  ): PlayGroup

  joinPlayGroup (
    id: String!
    boardIds: [String]!
  ): PlayGroup
  
  leavePlayGroup (
    id: String!
    boardIds: [String]!
  ): PlayGroup
`

export const Query = `
  playGroups(filters: [Filter], pagination: Pagination, sortings: [Sorting]): PlayGroupList
  playGroup(id: String!): PlayGroup
`

export const Types = [Filter, Pagination, Sorting, PlayGroup, NewPlayGroup, PlayGroupPatch, PlayGroupList]
