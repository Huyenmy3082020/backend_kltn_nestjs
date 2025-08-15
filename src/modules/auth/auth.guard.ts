import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { match } from 'path-to-regexp';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../users/user.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly JWT_SECRET;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {
    this.JWT_SECRET = this.configService.get<string>('JWT_SECRET');
    if (!this.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Kiểm tra route public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    const token: string | undefined =
      request.cookies?.accessToken ||
      request.headers['authorization']?.split(' ')[1];

    if (!token) {
      console.log('❌ No token provided');
      throw new UnauthorizedException('No token provided');
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, this.JWT_SECRET);
    } catch (err) {
      console.log('❌ Invalid token', err);
      throw new UnauthorizedException('Invalid token');
    }

    console.log('✅ Token decoded:', decoded);

    const userProfile = (await this.userService.getProfile(decoded.email)).data;

    await this.checkUserPermissions(request, userProfile);

    return true;
  }

  async checkUserPermissions(
    request: Request,
    userProfile: any,
  ): Promise<void> {
    const userRolePermission = await this.userService.getUserRolePermissions(
      userProfile.id,
    );

    console.log('📜 User role permissions:', userRolePermission);

    const path = request.path;
    const method = request.method.toUpperCase();

    console.log('method', method);
    console.log('path', path);
    const roles = userRolePermission.roles.map((role) => role.id);
    console.log('User role permissions:', roles);

    const validRole = userRolePermission.roles.filter((role) => {
      const permissions = role.permissions.filter((permission) => {
        return (
          this.isAllowed(path, permission.path) && permission.method === method
        );
      });
      return permissions.length > 0;
    });

    if (validRole.length === 0) {
      console.log(
        `🚫 User with roles ${roles.join(', ')} does not have permission for path: ${path} with method: ${method}`,
      );
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    request['user'] = {
      id: userProfile.id,
      username: userProfile.username,
      email: userProfile.email,
      roles,
    };

    console.log('✅ Permission check passed, user attached to request');
  }

  isAllowed(requestPath: string, permissionPaths: string[] | string): boolean {
    if (!Array.isArray(permissionPaths)) permissionPaths = [permissionPaths];
    return permissionPaths.some((permissionPath) => {
      const matcher = match(permissionPath, { decode: decodeURIComponent });
      return matcher(requestPath) !== false;
    });
  }
}
