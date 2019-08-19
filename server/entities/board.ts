import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Group } from './group'

@Entity('boards')
@Index('ix_board_0', (board: Board) => [board.domain, board.name], { unique: true })
@Index('ix_board_3', (board: Board) => [board.domain, board.group])
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column({
    unique: true
  })
  name: string

  @Column({
    nullable: true
  })
  description: string

  @Column({
    nullable: true
  })
  model: string

  @Column()
  thumbnail: string

  @ManyToOne(type => Group, group => group.boards)
  group: Group

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
