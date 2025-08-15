import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'created_by', type: 'varchar', nullable: true })
  createdBy?: string;

  @Column({ name: 'updated_by', type: 'varchar', nullable: true })
  updatedBy?: string;
}
