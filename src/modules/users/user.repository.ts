import { User } from './user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, In, QueryRunner } from 'typeorm';
import { UserStatus } from '../users/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserProfile(email: string): Promise<any | null> {
    console.log('Fetching user profile for email:', email);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .where('user.email = :email AND user.status != :status', {
        email,
        status: UserStatus.DELETED,
      })

      .getOne();

    if (!user) {
      return null;
    }

    return user;
  }

  async getUserRolePermissions(userId: string): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .where('user.id = :userId', { userId })
      .getOne();

    return user || null;
  }
}
