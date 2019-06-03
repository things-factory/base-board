import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { Board } from './board'
import { BoardList } from './board-list'
import { BoardPatch } from './board-patch'
import { NewBoard } from './new-board'

export const Mutation = `
  createBoard (
    board: NewBoard!
    groupId: String!
  ): Board

  updateBoard (
    id: String!
    patch: BoardPatch!
  ): Board

  deleteBoard (
    id: String!
  ): Board

  publishBoard (
    id: String!
    published: Boolean
  ): Board
`

export const Query = `
  boards(filters: [Filter], pagination: Pagination, sortings: [Sorting]): BoardList
  board(id: String!): Board
`

export const Types = [Filter, Pagination, Sorting, Board, NewBoard, BoardPatch, BoardList]
