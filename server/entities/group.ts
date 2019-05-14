import { PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import { Domain, DomainBaseEntity } from '@things-factory/shell'
import { Board } from './board'

@Entity('groups')
@Index('ix_group_0', (group: Group) => [group.domain, group.name], { unique: true })
export class Group extends DomainBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column('text', {
    unique: true,
    nullable: false
  })
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @OneToMany(type => Board, board => board.group)
  boards: Board[]
}
