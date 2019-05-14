import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, Index } from 'typeorm'
import { Domain, DomainBaseEntity } from '@things-factory/shell'
import { Group } from './group'

@Entity('boards')
@Index('ix_board_0', (board: Board) => [board.domain, board.name], { unique: true })
@Index('ix_board_3', (board: Board) => [board.domain, board.group])
export class Board extends DomainBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column('text', {
    unique: true
  })
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column('text', {
    nullable: true
  })
  model: string

  @Column('text', {
    default: 'ratio',
    nullable: true
  })
  fit: string

  @Column('int')
  width: number

  @Column('int')
  height: number

  @Column('text')
  thumbnail: string

  @Column('boolean', {
    default: false
  })
  published: boolean

  @ManyToOne(type => Group, group => group.boards)
  group: Group
}
