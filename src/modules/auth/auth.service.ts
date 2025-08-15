import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET;
  private readonly JWT_EXPIRES_IN: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.JWT_SECRET = this.configService.get<string>('JWT_SECRET');
    this.JWT_EXPIRES_IN =
      this.configService.get<string>('JWT_EXPIRES_IN') || '1h';
  }

  async login(email: string) {
    const user = await this.userService.getProfile(email);
    if (!user?.data) {
      throw new UnauthorizedException('Email không tồn tại');
    }

    const payload = {
      id: user.data.id,
      username: user.data.username,
      email: user.data.email,
    };

    const accessToken = jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });

    return {
      accessToken,
      user: payload,
    };
  }
}
