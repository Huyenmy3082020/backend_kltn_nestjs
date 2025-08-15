import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { UserRepository } from './user.repository';

import { BaseService } from '../../shared/base.service';

import { Role, RoleGroup } from '../roles/role.entity';
import { User } from './user.entity';

const ROLE_HIERARCHY = {
  [RoleGroup.HAUDI]: 3,
  [RoleGroup.ORGANIZATION]: 2,
  [RoleGroup.FACILITY]: 1,
};

function getHighestPrivilegeRole(roles: Role[]): Role | null {
  if (!roles || roles.length === 0) {
    return null;
  }

  return roles.reduce((highest, current) => {
    const currentPriority = ROLE_HIERARCHY[current.group] || 0;
    const highestPriority = ROLE_HIERARCHY[highest.group] || 0;
    return currentPriority > highestPriority ? current : highest;
  });
}

@Injectable()
export class UserService extends BaseService {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async getProfile(email: string) {
    const user = await this.userRepository.getUserProfile(email);

    if (!user) {
      throw new BadRequestException('AUTH.USER_NOT_FOUND');
    }

    let status = user.status;

    let userGroup = RoleGroup.FACILITY;
    if (user.roles && user.roles.length > 0) {
      const roles = user.roles.map((role) => ({ group: role.group }) as Role);
      const highestRole = getHighestPrivilegeRole(roles);
      if (highestRole) {
        userGroup = highestRole.group;
      }
    }
    const userData = { ...user, status, userGroup };

    return this.success(userData, 'USER.PROFILE_RETRIEVED_SUCCESS');
  }

  async getUserRolePermissions(id: string): Promise<User> {
    const user = await this.userRepository.getUserRolePermissions(id);
    if (!user) {
      throw new BadRequestException('AUTH.USER_NOT_FOUND');
    }
    return user;
  }
}
