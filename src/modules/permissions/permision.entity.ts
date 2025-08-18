import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Role } from '../roles/role.entity';
import { BaseEntity } from '../../base/base.entity';
export enum ALLOWED_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
}
@Entity('permission')
export class Permission extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @Column({ name: 'path', type: 'varchar', nullable: false })
  path: string;

  @Column({
    name: 'method',
    type: 'varchar',
    nullable: false,
    default: ALLOWED_METHODS.GET,
  })
  method: ALLOWED_METHODS;

  @Column({ name: 'screen_code', type: 'varchar', nullable: true })
  screenCode: string;

  @ManyToMany(() => Role, (role) => role.permissions, {
    onDelete: 'CASCADE',
  })
  roles: Role[];
}
