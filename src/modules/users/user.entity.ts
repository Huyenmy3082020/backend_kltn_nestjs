import { BaseEntity } from '../../base/base.entity';
import {
  Check,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';

export enum UserStatus {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  LOCKED = 'LOCKED',
  DELETED = 'DELETED',
  SUSPENDED = 'SUSPENDED',
}
@Check(
  'CHK_lock_logic',
  `(lock_time IS NULL AND lock_count = 0) OR (lock_time IS NOT NULL AND lock_count > 0)`,
)
@Check(
  'CHK_user_active_status',
  `(status != 'ACTIVE') OR (status = 'ACTIVE' AND last_login IS NOT NULL)`,
)
@Check(
  'CHK_user_deleted_status',
  `(status = 'DELETED' AND deleted_at IS NOT NULL) OR (status != 'DELETED' AND deleted_at IS NULL)`,
)
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ type: 'varchar', nullable: true })
  fullname: string | null;

  @Column({ type: 'varchar', nullable: true })
  avatar: string | null;

  @Column({
    name: 'last_login',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  lastLogin: Date | null;

  @Column({
    type: 'varchar',
    default: UserStatus.CREATED,
  })
  status: UserStatus;

  @Column({
    name: 'lock_time',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  lockTime: Date | null;

  @Column({ name: 'lock_count', default: 0 })
  lockCount: number;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt: Date | null;

  @ManyToMany(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  }) // Thiết lập quan hệ nhiều-nhiều với Role
  @JoinTable({
    name: 'user_role', // Tên bảng liên kết
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  }) // Đặt ở bên chủ sở hữu
  roles: Role[];
}
