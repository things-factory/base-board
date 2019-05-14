import { PrimaryGeneratedColumn, Column, Entity, Index, JoinTable, ManyToOne, ManyToMany } from 'typeorm'
import { Domain, DomainBaseEntity } from '@things-factory/shell'
import { Board } from './board'

@Entity('play-groups')
@Index('ix_play_group_0', (playGroup: PlayGroup) => [playGroup.domain, playGroup.name], { unique: true })
export class PlayGroup extends DomainBaseEntity {
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

  @ManyToMany(type => Board)
  @JoinTable({ name: 'play-groups-boards' })
  boards: Board[]
}
