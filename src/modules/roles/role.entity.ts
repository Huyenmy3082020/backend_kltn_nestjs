import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { on } from 'events';
import { User } from '../users/user.entity';
import { Permission } from '../permissions/permision.entity';
import { BaseEntity } from '../../base/base.entity';

export enum RoleGroup {
  HAUDI = 'HAUDI',
  ORGANIZATION = 'ORGANIZATION',
  FACILITY = 'FACILITY',
}
@Entity('role')
export class Role extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @Column({ name: 'group', type: 'varchar' })
  group: RoleGroup;

  @ManyToMany(() => User, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'role_permission', // tên bảng trung gian
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
